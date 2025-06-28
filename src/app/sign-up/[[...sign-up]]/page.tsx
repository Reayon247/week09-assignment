import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div>
      <h1>Please sign up using this form!</h1>
      <SignUp />
    </div>
  );
}
