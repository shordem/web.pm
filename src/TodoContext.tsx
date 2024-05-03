import { createContext, useContext } from "react";
// import { useAddTodo, useGetTodos } from "./featuresHook/useTodo";

interface TodoContextType {
  darkMode: boolean;
  activeIndex: number;
  toggleMode: () => void;
  showAll: () => void;
  showCompletedTask: () => void;
  showActiveTask: () => void;
  currentOrganisationDetails: {
    currentOrganisationId: string;
    currentOrganizationName: string;
  };
  setCurrentOrganisationDetails: (details: {
    currentOrganisationId: string;
    currentOrganizationName: string;
  }) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

function useTodo() {
  const todo = useContext(TodoContext);
  if (todo === undefined) {
    throw new Error("Context unavailable here");
  }
  return useContext(TodoContext);
}

export { useTodo };
