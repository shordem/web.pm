import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage(
    [
      { task: "Jog around the park 3x", completed: false },
      { task: "10 minutes meditation", completed: false },
    ],
    "todoSTorage"
  );
  const [completedTask, setCompletedTask] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(
    function () {
      setCompletedTask([...tasks.filter((task) => task.completed)]);
    },
    [tasks]
  );

  const value = useMemo(() => {
    function handleAddTask(task) {
      setTasks((tasks) => [...tasks, task]);
    }

    function handleToggleCompletedTask(item) {
      const updatedArray = tasks.map((task) =>
        task === item ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedArray);
    }
    function deleteTask(item) {
      const newArray = tasks.filter((task) => !(task === item));
      setTasks(newArray);
    }
    function showCompletedTask() {
      // setTasks((tasks) => [...tasks.filter((task) => task.completed)]);
      setActiveIndex(2);
    }
    function showAll() {
      setActiveIndex(0);
      setTasks(tasks);
    }

    function clearCompleted() {
      setTasks((tasks) => tasks.filter((task) => !task.completed));
    }
    function toggleMode() {
      setDarkMode((mode) => !mode);
    }
    return {
      darkMode,
      tasks,
      completedTask,
      handleAddTask,
      deleteTask,
      activeIndex,
      toggleMode,
      handleToggleCompletedTask,
      showAll,
      showCompletedTask,
      clearCompleted,
    };
  }, [tasks, completedTask, activeIndex, darkMode]);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

function useTodo() {
  return useContext(TodoContext);
}

export { TodoProvider, useTodo };
