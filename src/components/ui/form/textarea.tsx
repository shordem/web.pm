import { replaceWith } from "@/utils";
import { TextAreaProps } from "./form.interface";

function TextArea(props: TextAreaProps) {
  return (
    <div className={props.className}>
      <label
        htmlFor={replaceWith(props.label)}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {props.label}
      </label>
      <textarea
        id={replaceWith(props.label)}
        rows={props.rows ?? 4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
        placeholder={props.placeholder ?? `Enter ${props.label}`}
        required={props.required}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

export default TextArea;
