import { Client } from "@/services/http-client";
import {
  LoginRequestPayload,
  LoginResponsePayload,
  RegistrationRequestPayload,
  RegistrationResponsePayload,
<<<<<<< HEAD:src/services/auth/index.ts
  User,
=======
  VerifyEmailRequestPayload,
  VerifyEmailResponsePayload,
>>>>>>> d097d808884255f0cbf8b3b8ee8f004b45ef5a39:src/pages/auth/auth.service.ts
} from "./auth.interface";

export class AuthService {
  private readonly apiClient: Client;

  constructor() {
    this.apiClient = new Client();
  }

  login(data: LoginRequestPayload) {
    return this.apiClient.post<LoginRequestPayload, LoginResponsePayload>(
      "auth/login",
      data
    );
  }

  register(data: RegistrationRequestPayload) {
    return this.apiClient.post<
      RegistrationRequestPayload,
      RegistrationResponsePayload
    >("auth/register", data);
  }

<<<<<<< HEAD:src/services/auth/index.ts
  user() {
    return this.apiClient.get<User>("user");
=======
  verifyEmail(data: VerifyEmailRequestPayload) {
    return this.apiClient.post<
      VerifyEmailRequestPayload,
      VerifyEmailResponsePayload
    >("auth/verify-email", data);
>>>>>>> d097d808884255f0cbf8b3b8ee8f004b45ef5a39:src/pages/auth/auth.service.ts
  }
}
