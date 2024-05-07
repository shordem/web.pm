// import { Client } from "../services/api-client";
import { Client } from "../api-client";
import {
  LoginRequestPayload,
  LoginResponsePayload,
  OTPRequestPayload,
  OTPResponsePayload,
  RegistrationRequestPayload,
  RegistrationResponsePayload,
  User,
} from "./auth.interface";

export class AuthService {
  private apiClient = new Client();

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
  async verifyOTP(data: OTPRequestPayload) {
    return await this.apiClient.post<OTPRequestPayload, OTPResponsePayload>(
      "auth/verify-email/",
      data
    );
  }

  user() {
    return this.apiClient.get<User>("user");
  }
}
