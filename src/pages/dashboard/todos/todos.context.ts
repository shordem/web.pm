import { createContext } from "react";
import { INITIAL_TODO_DATA } from "./todos.constant";
import { TodoDataT } from "./todos.interface";

export const TodoContext = createContext({
  form: INITIAL_TODO_DATA,
  setForm: (INITIAL_TODO_DATA: TodoDataT) => {},
  reset: () => {},
  updateTaskVisibility: false,
  setUpdateTaskVisibility: (task: boolean) => {},
  createTaskVisibility: false,
  setCreateTaskVisibility: (task: boolean) => {},
});
