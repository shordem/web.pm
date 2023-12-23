import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { login as loginapi } from "../services/apiAuth";
import FormRow from "../ui/FormRow";
import LoginButton from "../ui/LoginButton";
import useLogin from "../featuresHook/useLogin";
import SpinnerMini from "./SpinnerMini";
// import { data } from "autoprefixer";

function LoginForm() {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  const [loginDetails, setLoginDetails] = useState({});
  const navigate = useNavigate();
  const { handleSubmit, register, formState, reset } = useForm();
  const { errors } = formState;
  const { isLoggingIn, login } = useLogin();

  // useEffect(
  //   function () {
  //     async function Login() {
  //       const data = await loginapi(loginDetails);
  //       console.log(data);
  //     }
  //     Login();
  //   },
  //   [loginDetails]
  // );
  function onSubmit({ username, password }) {
    // if (!username || !password) return;
    // console.log(username, password);
    setLoginDetails({ username, password });
    login(
      { username, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }
  function onError(error) {
    console.log(error);
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="shadow-md p-8 flex flex-col gap-4 bg-gray-100 rounded-md"
    >
      <div>
        <h3 className="text-center font-bold">Login Into Your Account</h3>
      </div>
      <FormRow error={errors?.username?.message} label={"Username"}>
        {" "}
        <input
          type="text"
          id="username"
          className="py-2 px-4 rounded-sm border-grey-100"
          //   onChange={(e) => setUsername(e.target.value)}
          //   value={username}
          disabled={isLoggingIn}
          {...register("username", { required: "Input your username" })}
        />
      </FormRow>
      <FormRow error={errors?.password?.message} label={"Password"}>
        <input
          type="password"
          className="py-2 px-4 rounded-sm border-grey-100"
          //   value={password}
          //   onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
          {...register("password", { required: "Input your password" })}
        />
      </FormRow>

      <LoginButton>{isLoggingIn ? <SpinnerMini /> : "Sign In"}</LoginButton>
      <p className="border-t-2 border-gray-600 pt-4">Don't have an Account? </p>
      <LoginButton
        onClick={(e) => {
          e.preventDefault();
          navigate("/signup");
        }}
      >
        Sign Up
      </LoginButton>
    </form>
  );
}

export default LoginForm;
