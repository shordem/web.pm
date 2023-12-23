import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../services/auth";
import { getUser } from "../services/apiAuth";

const auth = new AuthService();

// export default function useUser() {
//   const { isLoading, data: user } = useQuery({
//     queryKey: ["user"],
//     queryFn: auth.user,
//   });
export default function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  // console.log(user);
  return { isLoading, user };
}
