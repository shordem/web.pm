import { useRef, useState } from "react";
import { useTodo } from "../TodoContext";
import CircularDiv from "./CircularDiv";

function CreateNewTodo() {
  const ref = useRef();
  const { handleAddTask, darkMode } = useTodo();
  const [newTask, setNewTask] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const randomId = Math.ceil(Math.random() * 10000);
    if (!newTask) return;
    handleAddTask({
      task: newTask,
      completed: false,
      id: newTask.split("-").at(0) + randomId,
    });
    setNewTask("");
  }
  function handleClick() {
    ref.current.focus();
  }
  return (
    <form
      className={`${
        darkMode ? "bg-[#25273c]" : "bg-[#fafafa]"
      } flex items-center gap-6 py-6 px-6 rounded-lg mb-4`}
      onSubmit={handleSubmit}
    >
      <CircularDiv onClick={handleClick} />
      <input
        type="text"
        className="bg-transparent focus:outline-none grow max-[375px]:text-red-500 "
        placeholder="Create a new todo..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        ref={ref}
      />
    </form>
  );
}

export default CreateNewTodo;
