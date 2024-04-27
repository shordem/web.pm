import React, { useEffect, useMemo, useState } from 'react';
import { TodoContext } from '../TodoContext';
import useLocalStorage from '../hooks/useLocalStorage';

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


export default TodoProvider