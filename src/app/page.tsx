import { SignedIn } from "@clerk/nextjs";
import PostForm from "@/Components/PostForm";
import Posts from "@/Components/Posts";
import styles from "@/styles/Posts.module.css";

export default async function Home() {
  return (
    <main>
      <h1 className={styles.title}>Home</h1>
      <SignedIn>
        <PostForm />
      </SignedIn>
      <Posts />
    </main>
  );
}
