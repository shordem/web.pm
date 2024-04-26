import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AuthService } from "../services/auth";
import { useNavigate } from "react-router-dom";

const auth = new AuthService();

export default function useSignUp() {
  const navigate = useNavigate();
  const { isPending: isSigningUp, mutate: signup } = useMutation({
    mutationFn: async ({ fullname, email, username, password }) =>
      await auth.register({ fullname, email, username, password }),
    onSuccess: (data) => {
      toast.success("Successfully Signed up");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return { isSigningUp, signup };
}
