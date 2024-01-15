import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../services/auth";
import { getUser } from "../services/apiAuth";

const auth = new AuthService();

export default function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await auth.user();

      return res.data;
    },
  });

  return { isLoading, user };
}
