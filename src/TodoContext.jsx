import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
// import { useAddTodo, useGetTodos } from "./featuresHook/useTodo";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const [darkMode, setDarkMode] = useLocalStorage(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "dark-mode"
  );

  useEffect(
    function () {
      if (darkMode) {
        document.body.classList.add(
          "max-[375px]:bg-mobile-dark",
          "bg-main-dark"
        );
        document.body.classList.remove(
          "max-[375px]:bg-mobile-light",
          "bg-main-light"
        );
      } else {
        document.body.classList.remove(
          "max-[375px]:bg-mobile-dark",
          "bg-main-dark"
        );
        document.body.classList.add(
          "max-[375px]:bg-mobile-light",
          "bg-main-light"
        );
      }
    },
    [darkMode]
  );

  const value = useMemo(() => {
    function showCompletedTask() {
      // setTasks((tasks) => [...tasks.filter((task) => task.completed)]);
      setActiveIndex(2);
    }
    function showActiveTask() {
      setActiveIndex(1);
    }
    function showAll() {
      setActiveIndex(0);
    }

    function toggleMode() {
      setDarkMode((mode) => !mode);
    }
    return {
      darkMode,
      activeIndex,
      toggleMode,
      showAll,
      showCompletedTask,
      showActiveTask,
    };
  }, [activeIndex, darkMode, setDarkMode]);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

function useTodo() {
  const todo = useContext(TodoContext);
  if (todo === undefined) {
    throw new Error("Context unavailable here");
  }
  return useContext(TodoContext);
}

export { TodoProvider, useTodo };
