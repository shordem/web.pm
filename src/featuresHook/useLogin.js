import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { login as loginapi } from "../services/apiAuth";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isLoggingIn, mutate: login } = useMutation({
    mutationFn: ({ username, password }) => loginapi({ username, password }),
    onSuccess: (data) => {
      toast.success("SuccessfullyLoggedIn");
      queryClient.setQueryData(["user"], data);
      navigate("/", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoggingIn, login };
}
