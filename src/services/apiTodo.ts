import { Client } from "./http-client";
import {
  addTodoType,
  deleteTodoType,
  updateTodoType,
} from "./todos/todo.interface";

const apiClient = new Client();
export async function getTodo() {
  const data = await apiClient.get("todos");
  return data.data;
}

export async function addTodo(todo: addTodoType) {
  const data = await apiClient.post("todos", todo);
  return data;
}

export async function updateTodo(todo: updateTodoType) {
  const data = await apiClient.put(`todos/${todo.id}`, {
    completed: todo.completed,
  });
  return data;
}
export async function deleteTodo(id: deleteTodoType) {
  const data = await apiClient.delete(`todos/${id}`);
  return data;
}
// addTodo(data: addTodo) {
//     return this.apiClient.post("todos", data);
//   }
//   updateTodo(data: updateTodo) {
//     return this.apiClient.patch("todos", data);
//   }
//   deleteTodo(data: deleteTodo) {
//     return this.apiClient.delete(`todos/${data}`);
//   }
