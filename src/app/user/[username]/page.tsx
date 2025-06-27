import { db } from "@/utils/dbConnection";
import { postType } from "@/types/dataTypes";

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
    <>
      <h1>{profileData.username}&apos;s profile!</h1>
      <h2>Profile Bio:</h2>
      <p>{profileData.bio}</p>
      <h2>User posts</h2>
      <div>
        {posts.map((post: postType) => {
          return (
            <div key={post.id}>
              <h2>{post.username}:</h2>
              <p>{post.post}</p>
              <p>{post.dislikes}</p>
              <p>{post.date}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
