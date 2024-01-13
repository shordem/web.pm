import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodoType, updateTodoType } from "../services/todos/todo.interface";
import toast from "react-hot-toast";
import {
  getTodo,
  addTodo as addTodoApi,
  updateTodo as updateTodoApi,
  deleteTodo as deleteTodoApi,
} from "../services/apiTodo";

export function useGetTodos() {
  const {
    isLoading,
    data: todos,
    error: errorTodo,
  } = useQuery({
    queryKey: ["todos"],
    // queryFn: todo.getTodos,
    queryFn: getTodo,
  });

  return { isLoading, todos, errorTodo };
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  const { isPending: isAdding, mutate: addTodo } = useMutation({
    mutationFn: (title: addTodoType) => addTodoApi(title),
    onSuccess: (data) => {
      toast.success("Succesfully added task");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  return { isAdding, addTodo };
}
export function useUpdateTodo() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateTodo } = useMutation({
    mutationFn: ({ id, completed }: updateTodoType) =>
      updateTodoApi({ id, completed }),
    onSuccess: (data) => {
      toast.success("Succesfully updated task");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateTodo };
}
export function useDeleteTodo() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteTodo } = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: (data) => {
      toast.success("Succesfully deleted task");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteTodo };
}
