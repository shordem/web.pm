import { object, string } from "yup";

export const userSchema = object({
  first_name: string().default(""),
  last_name: string().default(""),
  username: string().min(6).max(64).default(""),
  email: string().email().required().default(""),
  password: string().min(6).required().default(""),
});
