import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([
    { task: "Jog around the park 3x", completed: false },
    { task: "10 minutes meditation", completed: false },
  ]);
  const [completedTask, setCompletedTask] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
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
    function showCompletedTask() {
      // setTasks((tasks) => [...tasks.filter((task) => task.completed)]);
      setActiveIndex(2);
      console.log(completedTask);
    }
    function showAll() {
      setActiveIndex(0);
      setTasks(tasks);
    }

    function clearCompleted() {
      setTasks((tasks) => tasks.filter((task) => !task.completed));
    }
    return {
      tasks,
      completedTask,
      handleAddTask,
      activeIndex,
      handleToggleCompletedTask,
      showAll,
      showCompletedTask,
      clearCompleted,
    };
  }, [tasks, completedTask, activeIndex]);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

function useTodo() {
  return useContext(TodoContext);
}

export { TodoProvider, useTodo };
