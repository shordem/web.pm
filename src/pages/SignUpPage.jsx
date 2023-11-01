import LoginForm from "../ui/LoginForm";
import SignupForm from "../ui/SignupForm";

function SignUpPage() {
  return (
    <div className="grid min-h-screen items-center justify-center grid-cols-[30rem]">
      <SignupForm />
    </div>
  );
}

export default SignUpPage;
