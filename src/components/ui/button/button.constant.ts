import { ColorScheme } from "./button.interface";

export const colorSchemeSolidClasses: Record<ColorScheme, string> = {
  primary: "bg-primary",
  success: "bg-success",
  danger: "bg-danger",
  warning: "bg-warning",
  info: "bg-info",
  gray: "bg-gray-500",
  secondary: "bg-secondary",
  none: "bg-compliment",
};

export const colorSchemeOutlineClasses: Record<ColorScheme, string> = {
  primary: "text-primary border-primary",
  success: "text-success border-success",
  danger: "text-danger border-danger",
  warning: "text-warning border-warning",
  info: "text-info border-info",
  gray: "text-gray-500 border-gray-500",
  secondary: "text-secondary border-secondary",
  none: "text-compliment border-compliment",
};

export const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const baseClassName =
  "h-fit flex items-center rounded-lg default-transition cursor-pointer disabled:cursor-not-allowed";
