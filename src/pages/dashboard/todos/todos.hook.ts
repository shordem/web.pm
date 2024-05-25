import toast from "react-hot-toast";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateTodoRequestPayload,
  UpdateTodoRequestPayload,
} from "./todos.interface";
import { TodoService } from "./todos.service";

const todoService = new TodoService();

// Todo hooks
export function useGetTodos(orgId: string, folderId: string) {
  const todos = useQuery({
    queryKey: ["todos", orgId, folderId],
    queryFn: async () => await todoService.getAllTodos(orgId, folderId),
  });
  return todos;
}
export function useGetTodoDetails(orgId: string, todoId: string) {
  const todoDetails = useQuery({
    queryKey: ["todoDetails", orgId, todoId],
    queryFn: async () => await todoService.getTodoDetails(orgId, todoId),
  });
  return todoDetails;
}

export function useCreateTodo(orgId: string, folderId: string) {
  const queryClient = useQueryClient();
  const createTodo = useMutation({
    mutationFn: async (data: CreateTodoRequestPayload) =>
      await todoService.createTodo(orgId, folderId, data),
    onSuccess: () => {
      toast.success("Succesfully created todo");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return createTodo;
}

export function useDeleteTodo(orgId: string) {
  const queryClient = useQueryClient();
  const deleteTodo = useMutation({
    mutationFn: async (todoId: string) =>
      await todoService.deleteTodo(orgId, todoId),
    onSuccess: () => {
      toast.success("Succesfully deleted todo");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return deleteTodo;
}

export function useUpdateTodo(orgId: string, todoId: string) {
  const queryClient = useQueryClient();
  const updateTodo = useMutation({
    mutationFn: async (data: UpdateTodoRequestPayload) =>
      await todoService.updateTodo(orgId, todoId, data),
    onSuccess: () => {
      toast.success("Succesfully updated todo");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return updateTodo;
}
