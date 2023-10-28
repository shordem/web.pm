import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [tasks, setTasks] = useState(
    [
      {
        task: "Jog around the park 3x",
        completed: false,
        id: "Jog123",
        time: "evening",
      },
      {
        task: "10 minutes meditation",
        completed: false,
        id: "1028399",
        time: "night",
      },
    ],
    "todoSTorage"
  );
  const [completedTask, setCompletedTask] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(
    function () {
      setCompletedTask([...tasks.filter((task) => task.completed)]);
      setActiveTasks([...tasks.filter((task) => !task.completed)]);
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
    function showActiveTask() {
      setActiveIndex(1);
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
      setTasks,
      completedTask,
      activeTasks,
      handleAddTask,
      deleteTask,
      activeIndex,
      toggleMode,
      handleToggleCompletedTask,
      showAll,
      showCompletedTask,
      showActiveTask,
      clearCompleted,
    };
  }, [tasks, completedTask, activeIndex, activeTasks, darkMode]);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

function useTodo() {
  return useContext(TodoContext);
}

export { TodoProvider, useTodo };
