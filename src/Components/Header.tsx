import Link from "next/link";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import styles from "@/styles/Header.module.css";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";

export default async function Header() {
  const { userId } = await auth();

  let userData;
  if (userId) {
    const query = await db.query("SELECT * FROM week9user WHERE userid = $1", [
      userId,
    ]);
    userData = query.rows[0];
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>I Hate Your Opinion</h1>
      <nav className={styles.nav}>
        <Link href={"/"} className={styles.link}>
          Posts
        </Link>

        <SignedIn>
          {/* these components will render when the user is signed-in */}
          <Link
            href={userData ? `/user/${userData.username}` : "/"}
            className={styles.link}
          >
            Profile
          </Link>
          <UserButton />
        </SignedIn>
        <SignedOut>
          {/* these components will render when the user is signed-out */}
          <SignInButton>
            <button className={styles.link}>Sign In</button>
          </SignInButton>
          <SignUpButton>
            <button className={styles.link}>Sign up</button>
          </SignUpButton>
        </SignedOut>
      </nav>
    </header>
  );
}
