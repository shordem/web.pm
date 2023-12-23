import { InferType } from "yup";

import { loginSchema, registerSchema } from "./auth.schema";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequestPayload extends InferType<typeof loginSchema> {}

export interface LoginResponsePayload {
  tokens: Tokens;
}

export interface RegistrationRequestPayload
  extends InferType<typeof registerSchema> {}

export interface RegistrationResponsePayload {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  tokens: Tokens;
}
