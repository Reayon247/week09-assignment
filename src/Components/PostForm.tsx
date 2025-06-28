import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import styles from "@/styles/PostForm.module.css";

export default async function PostForm() {
  const { userId } = await auth();

  const query = await db.query("SELECT * FROM week9user WHERE userid = $1", [
    userId,
  ]);
  const userData = query.rows[0];

  async function handleSubmit(formData: FormData) {
    "use server";

    function dateTime(): string {
      const now = new Date();

      //The padstart adds the 0's until it reaches the length required keeping the date consistent
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      // I'm getting them all so I can then display them in order like this
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    const username: string = userData.username;
    const post = formData.get("post");
    const dislikes: number = 0;
    const date = dateTime();

    await db.query(
      `INSERT INTO week9post (username, post, dislikes, date) VALUES ($1, $2, $3, $4)`,
      [username, post, dislikes, date]
    );
    revalidatePath("/");
  }

  return (
    <div className={styles.form}>
      <form action={handleSubmit} className={styles.formcon}>
        <label className={styles.label} htmlFor="post">
          Enter your opinion
        </label>
        <input className={styles.input} type="text" name="post" required />
        <button className={styles.submit} type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
