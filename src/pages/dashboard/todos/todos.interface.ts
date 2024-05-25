import React from "react";
import { User } from "../dashboard.interface";
import { INITIAL_TODO_DATA } from "./todos.constant";

export type TodoDataT = typeof INITIAL_TODO_DATA;

export interface CreateTodoProps {
  visibility: boolean;
  setVisibility: () => void;
}

export interface UpdateTodoProps extends CreateTodoProps {}

export interface TodoItemProps extends Omit<TodoDataT, "dueDate" | "dueTime"> {
  due_date: string | null;
  created_by: User;
}

export interface TodoProviderProps {
  children: React.ReactNode;
}

export interface TodoResponsePayload {
  id: string;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  created_by: User;
}

export interface CreateTodoRequestPayload {
  title: string;
  description: string;
  due_date: string | null;
}
export interface UpdateTodoRequestPayload extends CreateTodoRequestPayload {
  completed: boolean;
}
