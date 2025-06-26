import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <h1>This is the sign-in page. Please, give me your data again!</h1>
      <SignIn />
    </>
  );
}
