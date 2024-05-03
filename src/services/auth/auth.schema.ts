import { userSchema } from "../user/user.schema";

export const loginSchema = userSchema.omit([
  "first_name",
  "last_name",
  "email",
]);
export const registerSchema = userSchema;
