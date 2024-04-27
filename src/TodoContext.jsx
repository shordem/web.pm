import { createContext, useContext } from "react";
// import { useAddTodo, useGetTodos } from "./featuresHook/useTodo";

export const TodoContext = createContext();

function useTodo() {
  const todo = useContext(TodoContext);
  if (todo === undefined) {
    throw new Error("Context unavailable here");
  }
  return useContext(TodoContext);
}

export { useTodo };

