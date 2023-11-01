import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../services/apiTodo";

export default function useDelete() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
