import { Client } from "./api-client";
import { addTodo, deleteTodo, updateTodo } from "./todos/todo.interface";

export class TodoService {
  private apiClient = new Client();

  async getTodo() {
    const data = await this.apiClient.get("todos");
    console.log(data.data);
    return data.data;
  }
  async getTodos() {
    return await this.getTodo();
  }

  addTodo(data: addTodo) {
    return this.apiClient.post("todos", data);
  }
  updateTodo(data: updateTodo) {
    return this.apiClient.patch("todos", data);
  }
  deleteTodo(data: deleteTodo) {
    return this.apiClient.delete(`todos/${data}`);
  }
}
