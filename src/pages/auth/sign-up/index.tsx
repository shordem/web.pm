import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <section className="w-96 bg-gray-200 px-10 py-8 gap-4 flex flex-col items-center rounded-md">
      <h2 className="text-3xl font-semibold">Register</h2>

      <form className="grid items-center gap-4 w-full">
        <Input label="Firstname" name="firstname" />
        <Input label="Lastname" name="lastname" />
        <Input label="Username" name="username" />
        <Input label="Email" name="email" />
        <Input label="Password" name="password" type="password" />
        <Button className="flex justify-center">Register</Button>
      </form>

      <section>
        <p>
          <span>
            Already have an account{" "}
            <Link to="/login" className="text-purple-600">
              Sign in
            </Link>
          </span>
        </p>
      </section>
    </section>
  );
}

export default SignupPage;
