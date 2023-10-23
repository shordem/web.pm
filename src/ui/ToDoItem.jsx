import { useState } from "react";
import { useTodo } from "../TodoContext";
import CircularDiv from "./CircularDiv";

function ToDoItem({ task, provided, innerRef }) {
  const [activeHover, setActiveHover] = useState(false);
  const { handleToggleCompletedTask, darkMode, deleteTask } = useTodo();
  function handleChange(e) {
    e.preventDefault();
    if (e.target.alt === "close-button") return deleteTask(task);
    handleToggleCompletedTask(task);
  }
  function handleHover() {
    setActiveHover(true);
  }
  function hanleLeave() {
    setActiveHover(false);
  }

  return (
    <li
      className="flex items-center gap-6 py-6 px-6 cursor-pointer transition-all duration-300"
      onClick={handleChange}
      onMouseEnter={handleHover}
      onMouseLeave={hanleLeave}
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      id={task.id}
    >
      {!task.completed ? (
        <CircularDiv />
      ) : (
        <div className="w-6 h-6 cursor-pointer rounded-full bg-check border-2  flex items-center justify-center transition-allr">
          <img src="/icon-check.svg" alt="Checked" />
        </div>
      )}

      {darkMode ? (
        <p
          className={`${
            task.completed ? "line-through text-[#cacde8]" : " text-[#e4e5f1]"
          } `}
        >
          {task.task}
        </p>
      ) : (
        <p
          className={`${
            task.completed ? "line-through text-[#9394a5]" : "text-[#484b6a]"
          } `}
        >
          {task.task}
        </p>
      )}
      {activeHover && (
        <img
          src="icon-cross.svg"
          alt="close-button"
          className="ml-auto transition-all duration-300 h-4 max-[375px]:hidden"
        />
      )}
      <img
        src="icon-cross.svg"
        alt="close-button"
        className="ml-auto transition-all duration-300 h-4 min-[375px]:hidden"
      />
    </li>
  );
}

export default ToDoItem;
