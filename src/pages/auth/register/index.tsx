import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import { useRegister } from "../auth.hook";
import VerifyEmailModal from "../verify-email-modal";

function RegisterPage() {
  const register = useRegister();

  const [visibility, setVisibility] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  return (
    <>
      <VerifyEmailModal
        isOpen={visibility}
        onClose={() => setVisibility(false)}
        email={formData.email}
      />
      <section className="w-[40rem] bg-gray-200 px-10 py-8 gap-4 flex flex-col items-center rounded-md">
        <h2 className="text-3xl font-semibold">Sign In</h2>

        <form
          className="grid grid-cols-2 items-center gap-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            register.mutateAsync(formData).then(() => setVisibility(true));
          }}
        >
          <Input
            label="First Name"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          <Input
            label="Last Name"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
          <div className="col-span-2">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <Input
            label="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <div className="col-span-2 w-full flex justify-center">
            <Button isLoading={register.isLoading} className="px-20">
              Register
            </Button>
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
    </>
  );
}

export default RegisterPage;
