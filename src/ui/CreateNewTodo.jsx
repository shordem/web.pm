import { useRef, useState } from "react";
import { useTodo } from "../TodoContext";
import CircularDiv from "./CircularDiv";

function CreateNewTodo() {
  const ref = useRef();
  const { handleAddTask } = useTodo();
  const [newTask, setNewTask] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!newTask) return;
    handleAddTask({ task: newTask, completed: false });
    setNewTask("");
  }
  function handleClick() {
    ref.current.focus();
  }
  return (
    <form
      className="flex items-center gap-6 bg-[hsl(0,0%,98%)] py-6 px-6 rounded-lg mb-4"
      onSubmit={handleSubmit}
    >
      <CircularDiv onClick={handleClick} />
      <input
        type="text"
        className="bg-transparent focus:outline-none grow "
        placeholder="Create a new todo..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        ref={ref}
      />
    </form>
  );
}

export default CreateNewTodo;
