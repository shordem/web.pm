import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../constants/auth";
import { AuthService } from "../services/auth";
import { LoginRequestPayload } from "../services/auth/auth.interface";
import { Storage } from "../utilities/storage";

const auth = new AuthService();
const storage = new Storage();

export default function useLogin() {
  const navigate = useNavigate();
  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: async ({ username, password }: LoginRequestPayload) =>
      await auth.login({ username, password }),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Successfully Logged In");
      storage.setItem(ACCESS_TOKEN_KEY, data.data.access_token);
      navigate("/", { replace: true });
    },
    onError: (err: AxiosError) => {
      toast.error(err.response?.data?.detail || "An error occurred");
    },
  });

  return { isLoggingIn, login };
}
