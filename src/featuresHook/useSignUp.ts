import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AuthService } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { RegistrationRequestPayload } from "../services/auth/auth.interface";
import { AxiosError } from "axios";

const auth = new AuthService();

export default function useSignUp() {
  const navigate = useNavigate();
  const { isPending: isSigningUp, mutate: signup } = useMutation({
    mutationFn: async (data: RegistrationRequestPayload) =>
      await auth.register(data),
    onSuccess: (data) => {
      toast.success("Successfully Signed up");
      navigate("/", { replace: true });
    },
    onError: (err: AxiosError) => {
      toast.error(err.response?.data?.detail || "An error occurred");
    },
  });
  return { isSigningUp, signup };
}
