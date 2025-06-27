import { SignedIn } from "@clerk/nextjs";
import PostForm from "@/Components/PostForm";
import Posts from "@/Components/Posts";

export default async function Home() {
  return (
    <>
      <h1>Home</h1>
      <SignedIn>
        <PostForm />
      </SignedIn>
      <Posts />
    </>
  );
}
