import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOTP } from "../featuresHook/useOTP";
import LoginButton from "./LoginButton";
import Heading from "./HeadingTag";

interface OTPProp {
  [prop: string]: number;
}

function VerifyOTP({ username }: { username: string }) {
  const { setFocus, watch, register, handleSubmit } = useForm<OTPProp>();
  const [wrongOTP, setWrongOTP] = useState(false);
  const { isverifyingOTP, verifyOTP } = useOTP();
  useEffect(() => {
    if (wrongOTP === true) {
      const timer = setTimeout(() => {
        setWrongOTP(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [wrongOTP]);

  if (watch("number1")) setFocus("number2");
  if (watch("number2")) setFocus("number3");
  if (watch("number3")) setFocus("number4");
  if (watch("number4")) setFocus("number5");
  if (watch("number5")) setFocus("number6");

  function onSubmit(data: OTPProp) {
    // console.log({ code: Object.values(data).join() });
    console.log(data);
    verifyOTP(
      { email: "oluwatobiojo2911", code: Object.values(data).join("") },
      {
        onError: () => setWrongOTP(true),
      }
    );
  }

  // const { errors } = formState;
  // console.log(errors);

  return (
    <div className="grid min-h-screen items-center justify-center grid-cols-[35rem]">
      <div className="bg-white p-8 rounded-lg">
        <Heading as="h4" className=" text-stone-600 text-center">
          Input your OTP
        </Heading>
        <p className="text-sm text-center">
          Hey {username}, check your mail for your verification code!
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mt-8 flex justify-between mx-auto"
        >
          <input
            type="number"
            className={`[&::-webkit-inner-spin-button]:appearance-none w-16 text-3xl font-bold bg-stone-100 border ${
              wrongOTP ? "border-red-500" : "border-gray-300"
            } rounded-md py-4 px-4 text-gray-800 leading-tight focus:outline-none focus:border-blue-500`}
            style={{ MozAppearance: "textfield" }}
            {...register("number1", {
              required: "number cannot be empty",
            })}
            max={9}
            disabled={isverifyingOTP}
            autoFocus
          />
          <input
            type="number"
            // prettier-ignore
            className={`[&::-webkit-inner-spin-button]:appearance-none w-16 text-3xl font-bold bg-stone-100 border ${wrongOTP ? "border-red-500" : "border-gray-300"
            } rounded-md py-4 px-4 text-gray-800 leading-tight focus:outline-none focus:border-blue-500 transition-all`}
            style={{ MozAppearance: "textfield" }}
            {...register("number2", { required: "number cannot be empty" })}
            max={9}
            disabled={isverifyingOTP}
          />
          <input
            type="number"
            // prettier-ignore
            className={`[&::-webkit-inner-spin-button]:appearance-none w-16 text-3xl font-bold bg-stone-100 border ${wrongOTP ? "border-red-500" : "border-gray-300"
            } rounded-md py-4 px-4 text-gray-800 leading-tight focus:outline-none focus:border-blue-500 transition-all`}
            style={{ MozAppearance: "textfield" }}
            {...register("number3", { required: "number cannot be empty" })}
            max={9}
            disabled={isverifyingOTP}
          />
          <input
            type="number"
            // prettier-ignore
            className={`[&::-webkit-inner-spin-button]:appearance-none w-16 text-3xl font-bold bg-stone-100 border ${wrongOTP ? "border-red-500" : "border-gray-300"
            } rounded-md py-4 px-4 text-gray-800 leading-tight focus:outline-none focus:border-blue-500 transition-all`}
            style={{ MozAppearance: "textfield" }}
            {...register("number4", { required: "number cannot be empty" })}
            max={9}
            disabled={isverifyingOTP}
          />
          <input
            type="number"
            // prettier-ignore
            className={`[&::-webkit-inner-spin-button]:appearance-none w-16 text-3xl font-bold bg-stone-100 border ${wrongOTP ? "border-red-500" : "border-gray-300"
            } rounded-md py-4 px-4 text-gray-800 leading-tight focus:outline-none focus:border-blue-500 transition-all`}
            style={{ MozAppearance: "textfield" }}
            {...register("number5", { required: "number cannot be empty" })}
            max={9}
            disabled={isverifyingOTP}
          />
          <input
            type="number"
            // prettier-ignore
            className={`[&::-webkit-inner-spin-button]:appearance-none w-16 text-3xl font-bold bg-stone-100 border ${wrongOTP ? "border-red-500" : "border-gray-300"
            } rounded-md py-4 px-4 text-gray-800 leading-tight focus:outline-none focus:border-blue-500 transition-all`}
            style={{ MozAppearance: "textfield" }}
            {...register("number6", { required: "number cannot be empty" })}
            max={9}
            disabled={isverifyingOTP}
          />

          <LoginButton className=" hidden">Submit OTP</LoginButton>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;
