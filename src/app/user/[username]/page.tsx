import { db } from "@/utils/dbConnection";
import { postType } from "@/types/dataTypes";
import styles from "@/styles/Posts.module.css";

export default async function userPage({
  params,
}: {
  params: Promise<{ [username: string]: string | string[] | undefined }>;
}) {
  const { username } = await params;

  const profileQuery = await db.query(
    "SELECT * FROM week9user WHERE username = $1",
    [username]
  );

  const profileData = profileQuery.rows[0];

  if (!profileData) {
    return <h1>User does not exist, please head back to posts! :)</h1>;
  }

  const postQuery = await db.query(
    "SELECT * FROM week9post WHERE username = $1",
    [username]
  );

  const posts = postQuery.rows;

  return (
    <main>
      <h1 className={styles.title}>{profileData.username}&apos;s profile!</h1>
      <h2 className={styles.biotitle}>Profile Bio:</h2>
      <p className={styles.bio}>{profileData.bio}</p>
      <h2 className={styles.title}>User posts</h2>
      <div className={styles.container}>
        {posts.map((post: postType) => {
          return (
            <div key={post.id} className={styles.postcon}>
              <h2>{post.username}:</h2>
              <p>{post.post}</p>
              <p>{post.dislikes}</p>
              <p>{post.date}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
