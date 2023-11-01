import { useMutation } from "@tanstack/react-query";
import { signup as signupapi } from "../services/apiAuth";

export default function useSignUp() {
  const { isLoading: isSigningUp, mutate: signup } = useMutation({
    queryFn: ({ fullname, email, username, password }) =>
      signupapi({ fullname, email, username, password }),
  });
  return { isSigningUp, signup };
}
