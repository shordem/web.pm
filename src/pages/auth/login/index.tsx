import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import { useLogin } from "../auth.hook";
import VerifyEmailModal from "../verify-email-modal";

function LoginPage() {
  const login = useLogin();

  const [visibility, setVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <VerifyEmailModal
        isOpen={visibility}
        onClose={() => setVisibility(false)}
        email={email}
      />

      <section className="w-96 bg-gray-200 px-10 py-8 gap-4 flex flex-col items-center rounded-md">
        <h2 className="text-3xl font-semibold">Sign In</h2>

        <form
          className="grid items-center gap-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            login.mutateAsync({ email, password }).catch((err) => {
              if (err.response.data.detail == "401: Email not verified") {
                setVisibility(true);
              }
            });
          }}
        >
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button isLoading={login.isLoading} className="flex justify-center">
            Login
          </Button>
        </form>

        <section className="text-center">
          <p>
            Don&#39;t have an account?&nbsp;
            <Link to="/register" className="text-purple-600">
              register
            </Link>
          </p>

          <p className="mt-4">
            Forgot your password?&nbsp;
            <Link to="/register" className="text-purple-600">
              reset password
            </Link>
          </p>
        </section>
      </section>
    </>
  );
}

export default LoginPage;
