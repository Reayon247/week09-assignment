import { postType } from "@/types/dataTypes";
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function Posts() {
  const query = await db.query("SELECT * FROM week9post");
  const posts = query.rows;

  posts.sort((a: { id: number }, b: { id: number }) => b.id - a.id);

  return (
    <>
      {posts.map((post: postType) => {
        return (
          <div key={post.id}>
            <Link href={`/user/${post.username}`}>{post.username}:</Link>
            <p>{post.post}</p>
            <p>{post.dislikes}</p>
            <p>{post.date}</p>
          </div>
        );
      })}
    </>
  );
}
