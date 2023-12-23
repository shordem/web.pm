import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface loginInput {
  username: string;
  password: string;
}

export class Auth {
  private navigate = useNavigate();
  private queryClient = useQueryClient();
  private auth = new AuthService();

}
useLogin() {
  const { isLoading: isLoggingIn, mutate: login } = useMutation({
    mutationFn: ({ username, password }: loginInput) =>
      this.auth.login({ username, password }),
    onSuccess: (data) => {
      toast.success("Successfully Logged In");
      this.queryClient.setQueryData(["user"], data.data);
      console.log(data);
      console.log(data.data);
    },
  });
}
