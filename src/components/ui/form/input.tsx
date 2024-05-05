import { replaceWith } from "@/utilities/common";
import { InputProps } from "./form.interface";

function Input(props: InputProps) {
  return (
    <div>
      <label
        htmlFor={replaceWith(props.label)}
        className="block mb-2 text-sm font-medium"
      >
        {props.label}
      </label>
      <input
        type={props.type ?? "text"}
        id={replaceWith(props.label)}
        name={props.name}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-0 block w-full p-2.5"
        placeholder={props.placeholder ?? `Enter ${props.label}`}
        required={props.required}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

export default Input;
