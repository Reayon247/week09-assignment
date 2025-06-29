import { postType } from "@/types/dataTypes";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import styles from "@/styles/Posts.module.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DeleteButton from "./DeleteButton";
import { auth } from "@clerk/nextjs/server";

export default async function Posts() {
  const query = await db.query("SELECT * FROM week9post");
  const posts = query.rows;

  posts.sort((a: { id: number }, b: { id: number }) => b.id - a.id);

  //selecting user

  const { userId } = await auth();

  const userQuery = await db.query(
    "SELECT username FROM week9user WHERE userid = $1",
    [userId]
  );

  const currentUsername = userQuery.rows[0];

  return (
    <div className={styles.container}>
      {posts.map((post: postType) => {
        return (
          <div key={post.id} className={styles.postcon}>
            <div className={styles.nameanddrop}>
              <Link href={`/user/${post.username}`}>{post.username}:</Link>
              {currentUsername.username === post.username && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className={styles.trigger}>
                    Settings
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className={styles.Content}>
                      <DropdownMenu.Item className={styles.Item} asChild>
                        <Link href={`/edit/${post.id}`}>Edit</Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className={styles.Item} asChild>
                        <DeleteButton postId={post.id} />
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              )}
            </div>
            <p>{post.post}</p>
            <p>Dislikes: {post.dislikes}</p>
            <p>{post.date}</p>
          </div>
        );
      })}
    </div>
  );
}
