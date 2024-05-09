export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginResponsePayload {
  access_token: string;
}

export interface RegistrationRequestPayload {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface RegistrationResponsePayload {
  message: string;
}

export interface VerifyEmailRequestPayload {
  email: string;
  code: string;
}
export interface VerifyEmailResponsePayload {
  message: string;
}

export interface VerifyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}
