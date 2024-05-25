import { Client } from "@/services/http-client";
import {
  CreateTodoRequestPayload,
  TodoResponsePayload,
  UpdateTodoRequestPayload,
} from "./todos.interface";

export class TodoService {
  private apiClient = new Client();

  getAllTodos(orgId: string, folderId: string) {
    return this.apiClient.get<TodoResponsePayload[]>(
      `todos/${orgId}/${folderId}`
    );
  }
  getTodoDetails(orgId: string, todoId: string) {
    return this.apiClient.get<TodoResponsePayload>(
      `todos/${orgId}/${todoId}/view`
    );
  }
  createTodo(orgId: string, folderId: string, data: CreateTodoRequestPayload) {
    return this.apiClient.post(`todos/${orgId}/${folderId}`, data);
  }
  deleteTodo(orgId: string, todoId: string) {
    return this.apiClient.delete(`todos/${orgId}/${todoId}`);
  }
  updateTodo(orgId: string, todoId: string, data: UpdateTodoRequestPayload) {
    return this.apiClient.patch(`todos/${orgId}/${todoId}`, data);
  }
}
