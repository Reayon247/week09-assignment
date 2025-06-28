import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div>
      <h1>Please sign in using this form!</h1>
      <SignIn />
    </div>
  );
}
