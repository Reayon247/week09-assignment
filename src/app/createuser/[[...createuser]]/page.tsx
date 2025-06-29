//TODO I want my user to have a Username, a Bio
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import styles from "@/styles/PostForm.module.css";

export default async function createUser({
  searchParams,
}: {
  searchParams: Promise<{ [error: string]: string | string[] | undefined }>;
}) {
  const errorMessage =
    (await searchParams).error === "usernametaken"
      ? "This Username is taken or you already have an account linked with your Clerk account"
      : null;

  const { userId } = await auth();
  const user = await currentUser();

  if (!user) return <div>Not signed in</div>;

  const profilePic = user.imageUrl;

  async function handleSubmit(formData: FormData) {
    "use server";

    const username = formData.get("username") as string;
    const bio = formData.get("bio") as string;

    try {
      await db.query(
        `INSERT INTO week9user (userid, username, bio, profile_pic) VALUES ($1, $2, $3, $4)`,
        [userId, username, bio, profilePic]
      );
    } catch {
      //Here im just hoping there is no database error and its just the username taken hahaha
      //It looked quite complicated setting up a error catch with typescript
      redirect("/createuser?error=usernametaken");
    }

    revalidatePath(`/user/${username}`);
    redirect(`/user/${username}`);
  }

  return (
    <main>
      <h1 className={styles.title}>
        This is your profile creation page for this specific site
      </h1>
      <div className={styles.form}>
        <form action={handleSubmit} className={styles.formcon}>
          <label htmlFor="username" className={styles.label}>
            Username:
          </label>
          <input
            className={styles.input}
            type="text"
            name="username"
            required
          />
          {/* This renders the error message if it has the error from the search params */}
          {errorMessage && <p>{errorMessage}</p>}
          <label htmlFor="bio" className={styles.label}>
            Short Bio
          </label>
          <input className={styles.input} type="text" name="bio" />
          <button className={styles.submit} type="submit">
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}
