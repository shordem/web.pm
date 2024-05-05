import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { AuthService } from "../services/auth";
import { RegistrationRequestPayload } from "../services/auth/auth.interface";

const auth = new AuthService();

export default function useSignUp() {
  const { isPending: isSigningUp, mutate: signup } = useMutation({
    mutationFn: async (data: RegistrationRequestPayload) =>
      await auth.register(data),
    onSuccess: (data) => {
      toast.success("Successfully Signed up, Please verify your email");
    },
    onError: (err: AxiosError) => {
      toast.error(err.response?.data?.detail || "An error occurred");
    },
  });
  return { isSigningUp, signup };
}
