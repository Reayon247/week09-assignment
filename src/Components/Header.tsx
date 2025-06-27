import Link from "next/link";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";

export default async function Header() {
  const { userId } = await auth();

  const query = await db.query(" SELECT * FROM week9user WHERE userid = $1", [
    userId,
  ]);
  const userData = query.rows[0];

  return (
    <>
      <h1>I Hate Your Opinion</h1>
      <Link href={"/"}>Posts</Link>

      <SignedIn>
        {/* these components will render when the user is signed-in */}
        {/* <Link href={`/user/${userData.username}`}>Profile</Link> */}
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
