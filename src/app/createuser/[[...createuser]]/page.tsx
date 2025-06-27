//TODO I want my user to have a Username, a Bio
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createUser({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const errorMessage =
    searchParams?.error === "usernametaken"
      ? "This Username is taken or you already have an account linked with your clerk account"
      : null;

  const { userId } = await auth();
  const user = await currentUser();

  if (!user) return <div>Not signed in</div>;

  const profilePic = user.imageUrl;

  async function handleSubmit(formData: FormData) {
    "use server";

    const username = formData.get("username");
    const bio = formData.get("bio");

    try {
      await db.query(
        `INSERT INTO week9user (userid, username, bio, profile_pic) VALUES ($1, $2, $3, $4)`,
        [userId, username, bio, profilePic]
      );

      revalidatePath(`/user/${username}`);
      redirect(`/user/${username}`);
    } catch {
      //Here im just hoping there is no database error and its just the username taken hahaha
      //It looked quite complicated setting up a error catch with typescript
      redirect("/createuser?error=usernametaken");
    }
  }

  return (
    <>
      <h1>This is your profile creation page for this specific site</h1>
      <form action={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" required />
        {/* This renders the error message if it has the error from the search params */}
        {errorMessage && <p>{errorMessage}</p>}
        <label htmlFor="bio">Short Bio</label>
        <input type="text" name="bio" />
        <button type="submit">Create Account</button>
      </form>
    </>
  );
}
