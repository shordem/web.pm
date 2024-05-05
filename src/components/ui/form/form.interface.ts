import { HTMLInputTypeAttribute } from "react";

type HTMLFormElements =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export interface FormField {
  title: string;
  placeholder?: string;
  value: string | number;
  onchange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  type?: HTMLInputTypeAttribute;
  loading?: boolean;
  isTextArea?: boolean;
}

export interface SelectOptionProps {
  label: string;
  value: string;
}

export interface BaseProps {
  label: string;
  className?: string;
  container?: string;
  value?: string | number;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLFormElements>) => void;
  required?: boolean;
}

export interface InputProps extends BaseProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  loading?: boolean;
}

export interface TextAreaProps extends BaseProps {
  rows?: number;
  placeholder?: string;
}

export interface SelectProps extends BaseProps {
  options: SelectOptionProps[];
}

export interface RadioProps extends BaseProps {
  type: "radio";
  checked?: boolean;
}

export interface MultiSelectProps
  extends Omit<BaseProps, "value" | "onChange"> {
  options: SelectOptionProps[];
  value: SelectOptionProps[];
  onChange: (value: SelectOptionProps[]) => void;
}
