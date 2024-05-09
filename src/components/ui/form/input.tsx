import { useState } from "react";

import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import { replaceWith } from "@/utilities/common";
import { Button } from "../button";
import { InputProps } from "./form.interface";

function Input(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={props.className}>
      <label
        htmlFor={replaceWith(props.label)}
        className="block mb-2 text-sm font-medium"
      >
        {props.label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : props.type ?? "text"}
          id={replaceWith(props.label)}
          name={props.name}
          className="bg-bg-accent text-sm rounded-lg focus:outline-none focus:ring-0 block w-full p-2.5 disabled:text-[#777] disabled:cursor-not-allowed"
          placeholder={props.placeholder ?? `Enter ${props.label}`}
          required={props.required}
          onChange={props.onChange}
          value={props.value}
          disabled={props.disabled}
        />

        {props.type == "password" && (
          <Button
            variant="ghost"
            colorScheme="gray"
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoIosEyeOff size={24} /> : <IoIosEye size={24} />}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Input;
