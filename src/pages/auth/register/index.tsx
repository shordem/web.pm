import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <section className="w-[40rem] bg-gray-200 px-10 py-8 gap-4 flex flex-col items-center rounded-md">
      <h2 className="text-3xl font-semibold">Sign In</h2>

      <form className="grid grid-cols-2 items-center gap-4 w-full">
        <Input label="First Name" />
        <Input label="Last Name" />
        <div className="col-span-2">
          <Input label="Email" type="email" />
        </div>
        <Input label="Username" />
        <Input label="Password" name="password" type="password" />
        <div className="col-span-2 w-full flex justify-center">
          <Button className="px-20">Register</Button>
        </div>
      </form>

      <section>
        <p>
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600">
              login
            </Link>
          </span>
        </p>
      </section>
    </section>
  );
}

export default RegisterPage;
