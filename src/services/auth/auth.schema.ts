import { userSchema } from "../user/user.schema";

export const loginSchema = userSchema.omit([
  "firstName",
  "lastName",
  "username",
]);
export const registerSchema = userSchema;
