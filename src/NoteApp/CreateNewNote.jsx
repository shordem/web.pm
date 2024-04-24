import { useRef, useState } from "react";
import { useTodo } from "../TodoContext.jsx";
import CircularDiv from "../ui/CircularDiv.jsx";
import SpinnerMini from "../ui/SpinnerMini.jsx";
import { useAddTodo } from "../featuresHook/useTodo.js";

function CreateNewNote() {
  const ref = useRef();
  const { darkMode } = useTodo();
  const { isAdding, addTodo } = useAddTodo();
  const [newTask, setNewTask] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!newTask) return;

    addTodo({
      title: newTask,
    });

    setNewTask("");
  }
  function handleClick() {
    ref.current.focus();
  }
  if (isAdding) return <SpinnerMini text="Adding task" />;
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
        className="bg-transparent focus:outline-none grow  "
        placeholder="Create a new note"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        ref={ref}
      />
    </form>
  );
}

export default CreateNewNote;
