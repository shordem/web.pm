import { replaceWith } from "@/utilities/common";
import { TextAreaProps } from "./form.interface";

function TextArea(props: TextAreaProps) {
  return (
    <div className={props.className}>
      <label
        htmlFor={replaceWith(props.label)}
        className="block mb-2 text-sm font-medium"
      >
        {props.label}
      </label>
      <textarea
        id={replaceWith(props.label)}
        rows={props.rows ?? 6}
        className="block p-2.5 w-full text-sm bg-transparent border-y border-bg-accent focus:outline-none resize-none"
        placeholder={props.placeholder ?? `Enter ${props.label}`}
        required={props.required}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

export default TextArea;
