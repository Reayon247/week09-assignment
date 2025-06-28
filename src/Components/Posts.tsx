import { postType } from "@/types/dataTypes";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import styles from "@/styles/Posts.module.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default async function Posts() {
  const query = await db.query("SELECT * FROM week9post");
  const posts = query.rows;

  posts.sort((a: { id: number }, b: { id: number }) => b.id - a.id);

  return (
    <div className={styles.container}>
      {posts.map((post: postType) => {
        return (
          <div key={post.id} className={styles.postcon}>
            <div className={styles.nameanddrop}>
              <Link href={`/user/${post.username}`}>{post.username}:</Link>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className={styles.trigger}>
                  Settings
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className={styles.Content}>
                    <DropdownMenu.Item className={styles.Item}>
                      Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className={styles.Item}>
                      Delete
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
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
