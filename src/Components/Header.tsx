import Link from "next/link";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

import { currentUser } from "@clerk/nextjs/server";

export default async function Header() {
  const user = await currentUser();

  // the question mark is so I dont get an error if the user is Null, it doesnt matter if its null cause the profile button wont be visible if they are not signed in
  const username = user?.username;

  return (
    <>
      <h1>I Hate Your Opinion</h1>
      <Link href={"/"}>Posts</Link>

      <SignedIn>
        {/* these components will render when the user is signed-in */}
        <Link href={`/user/${username}`}>Profile</Link>
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* these components will render when the user is signed-out */}
        <SignInButton />
        <SignUpButton />
      </SignedOut>
    </>
  );
}
