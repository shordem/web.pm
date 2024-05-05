import { twMerge } from "tailwind-merge";

import { replaceWith } from "@/utils";
import { SelectProps } from "./form.interface";

function Select(props: SelectProps) {
  return (
    <div className={twMerge("relative", props.className)}>
      <label htmlFor={replaceWith(props.label)}>{props.label}</label>

      <select
        name={replaceWith(props.label)}
        id={replaceWith(props.label)}
        value={props.value}
        onChange={props.onChange}
        className={twMerge(
          "block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm",
          props.container
        )}
      >
        <option defaultValue={props.options[0].value}>
          {props.options[0].label}
        </option>
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
