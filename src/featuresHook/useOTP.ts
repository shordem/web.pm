import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth";
import { OTPRequestPayload } from "../services/auth/auth.interface";

export function useOTP() {
  const auth = new AuthService();
  const navigate = useNavigate();

  const { isPending: isverifyingOTP, mutate: verifyOTP } = useMutation({
    mutationFn: (loginData: OTPRequestPayload) => auth.verifyOTP(loginData),
    onSuccess: (res) => {
      toast.success(res.data.message);

      navigate("/sign-in", { replace: true });
      console.log(res.data);
    },
    onError: (err: AxiosError<Error>) => {
      toast.error(err.response?.data.message || (err.message as string));
      console.log(err);
    },
  });
  return { isverifyingOTP, verifyOTP };
}
