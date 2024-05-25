import { useState } from "react";

import { INITIAL_TODO_DATA } from "./todos.constant";
import { TodoContext } from "./todos.context";
import { TodoProviderProps } from "./todos.interface";

function TodoProvider(props: TodoProviderProps) {
  const [form, setForm] = useState(INITIAL_TODO_DATA);
  const [updateTaskVisibility, setUpdateTaskVisibility] = useState(false);
  const [createTaskVisibility, setCreateTaskVisibility] = useState(false);

  function reset() {
    setForm(INITIAL_TODO_DATA);
  }

  return (
    <TodoContext.Provider
      value={{
        form,
        setForm,
        reset,
        updateTaskVisibility,
        setUpdateTaskVisibility,
        createTaskVisibility,
        setCreateTaskVisibility,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
