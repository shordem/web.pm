import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import useSignUp from "../featuresHook/useSignUp";
import FormRow from "./FormRow";
import LoginButton from "./LoginButton";

function SignupForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const { errors } = formState;
  const { isSigningUp, signup } = useSignUp();

  function onSubmit({ fullname, email, username, password }) {
    signup(
      { fullname, email, username, password },
      {
        onSuccess: () => reset(),
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="shadow-md p-8 flex flex-col gap-4 bg-gray-100 rounded-md  max-[600px]:p-4"
    >
      <h3 className="text-center">Create your Account</h3>
      <FormRow label="Fullname" error={errors?.fullname?.message}>
        <input
          type="text"
          id="fullname"
          className="py-2 px-4 rounded-sm border-grey-100"
          disabled={isSigningUp}
          {...register("fullname", { required: "Input your fullname" })}
        />
      </FormRow>
      <FormRow label="Username" error={errors?.username?.message}>
        <input
          type="text"
          id="username"
          className="py-2 px-4 rounded-sm border-grey-100"
          disabled={isSigningUp}
          {...register("username", { required: "Input your username" })}
        />
      </FormRow>
      <FormRow label="Email address" error={errors?.email?.message}>
        <input
          type="email"
          id="email"
          className="py-2 px-4 rounded-sm border-grey-100"
          disabled={isSigningUp}
          {...register("email", {
            required: "Input a valid email address",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email addresss",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <input
          type="password"
          id="password"
          disabled={isSigningUp}
          className="py-2 px-4 rounded-sm border-grey-100"
          {...register("password", {
            required: "Input a valid password",
            minLength: {
              value: 8,
              message: "Password Length must be at least 8 characterss",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <input
          type="password"
          id="passwordConfirm"
          className="py-2 px-4 rounded-sm border-grey-100"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "Input required",
            validate: (value) =>
              value === getValues().password || "Passowrds need to match",
          })}
        />
      </FormRow>
      <LoginButton>Sign Up Now!</LoginButton>
      <p className="border-t-2 border-gray-600 pt-4">
        Already have an account{" "}
      </p>
      <LoginButton
        onClick={(e) => {
          e.preventDefault();
          navigate("/login");
        }}
      >
        Sign In
      </LoginButton>
    </form>
  );
}

export default SignupForm;
