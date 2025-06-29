"use client";

import { deletePost } from "@/utils/delete";
import styles from "@/styles/delete.module.css";

type deleteProps = {
  postId: number;
};

export default function DeleteButton({ postId }: deleteProps) {
  return (
    <>
      <button
        onClick={() => {
          deletePost(postId);
        }}
        className={styles.delete}
      >
        Delete
      </button>
    </>
  );
}
