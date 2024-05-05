import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <section className="w-96 bg-gray-200 px-10 py-8 gap-4 flex flex-col items-center rounded-md">
      <h2 className="text-3xl font-semibold">Sign In</h2>

      <form className="grid items-center gap-4 w-full">
        <Input label="Username" name="username" />
        <Input label="Password" name="password" type="password" />
        <Button className="flex justify-center">Login</Button>
      </form>

      <section>
        <p>
          <span>
            Don&#39;t have an account?{" "}
            <Link to="/register" className="text-purple-600">
              register
            </Link>
          </span>
        </p>
      </section>
    </section>
  );
}

export default LoginPage;
