import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { ACCESS_TOKEN_KEY } from "@/constants/auth";
import { Storage } from "@/utilities/storage";
import { AxiosError } from "axios";
import {
  LoginRequestPayload,
  RegistrationRequestPayload,
  VerifyEmailRequestPayload,
} from "./auth.interface";
import { AuthService } from "./auth.service";

export function useAuthRedirect() {
  const navigate = useNavigate();
  const storage = new Storage();
  const isAuthenticated = storage.checkItem(ACCESS_TOKEN_KEY);

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated]
  );
}

export function useLogin() {
  const authService = new AuthService();
  const storage = new Storage();
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: async (data: LoginRequestPayload) =>
      await authService.login(data),
    onSuccess: (res) => {
      storage.setItem(ACCESS_TOKEN_KEY, res.data.access_token);
      navigate("/dashboard");
      toast.success("Login successful");
    },
    onError: (err: AxiosError<any>) => {
      toast.error(err.response?.data.detail ?? err.response?.data.message);
    },
  });

  return {
    mutateAsync: login.mutateAsync,
    isLoading: login.isPending,
  };
}

export function useRegister() {
  const authService = new AuthService();

  const register = useMutation({
    mutationFn: async (data: RegistrationRequestPayload) =>
      await authService.register(data),
    onSuccess: () => {
      toast.success("Registration successful");
    },
    onError: (err: AxiosError<any>) => {
      toast.error(err.response?.data.detail ?? err.response?.data.message);
    },
  });

  return {
    mutateAsync: register.mutateAsync,
    isLoading: register.isPending,
  };
}

export function useVerifyEmail() {
  const authService = new AuthService();
  const navigate = useNavigate();

  const verifyEmail = useMutation({
    mutationFn: async (data: VerifyEmailRequestPayload) =>
      await authService.verifyEmail(data),
    onSuccess: () => {
      toast.success("Email verified successfully");
      navigate("/login");
    },
    onError: (err: AxiosError<any>) => {
      toast.error(err.response?.data.detail ?? err.response?.data.message);
    },
  });

  return {
    mutate: verifyEmail.mutate,
    isLoading: verifyEmail.isPending,
  };
}
