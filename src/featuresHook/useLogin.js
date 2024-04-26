import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthService } from "../services/auth";
import { Storage } from "../utilities/storage";
import { ACCESS_TOKEN_KEY } from "../constants/auth";

const auth = new AuthService();
const storage = new Storage();

export default function useLogin() {
  const navigate = useNavigate();
  const { isLoading: isLoggingIn, mutate: login } = useMutation({
    mutationFn: async ({ username, password }) =>
      await auth.login({ username, password }),
    onSuccess: (data) => {
      toast.success("Successfully Logged In");
      storage.setItem(ACCESS_TOKEN_KEY, data.data.token);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { isLoggingIn, login };
}
