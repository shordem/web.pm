import { useState } from "react";
import { useTodo } from "../TodoContext.jsx";
import CircularDiv from "./CircularDiv";
import { useDeleteTodo, useUpdateTodo } from "../featuresHook/useTodo";
import SpinnerMini from "./SpinnerMini.jsx";

function ToDoItem({ task, provided, innerRef, id }) {
  const [activeHover, setActiveHover] = useState(false);

  const { darkMode } = useTodo();
  const { isDeleting, deleteTodo } = useDeleteTodo();
  const { isUpdating, updateTodo } = useUpdateTodo();

  function handleToggleComplete(e) {
    e.preventDefault();
    updateTodo({ id, completed: !task.completed });
  }
  function handleDeleteTodo(e) {
    e.preventDefault();
    if (e.target.alt === "close-button") return deleteTodo(task.id);
  }
  function handleHover() {
    setActiveHover(true);
  }
  function hanleLeave() {
    setActiveHover(false);
  }

  if (isUpdating) return <SpinnerMini text="Updating task" />;
  if (isDeleting) return <SpinnerMini text="Deleting task" />;

  return (
    <li
      className={`${
        darkMode ? "bg-[#25273c]" : ""
      } grid grid-cols-[auto,1fr,auto]  items-center gap-6 py-6 px-6 cursor-pointer transition-all duration-300`}
      onMouseEnter={handleHover}
      onMouseLeave={hanleLeave}
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      id={task.id}
    >
      {!task.completed ? (
        <CircularDiv onClick={handleToggleComplete} />
      ) : (
        <CircularDiv className={"bg-check"} onClick={handleToggleComplete}>
          <img src="/icon-check.svg" alt="Checked" />
        </CircularDiv>
      )}

      {
        <p
          className={`${
            task.completed
              ? `line-through  ${
                  !darkMode ? "text-[#9394a5]" : "text-[#cacde8]"
                }`
              : `${!darkMode ? "text-[#484b6a]" : "text-[#e4e5f1]"} `
          }  overflow-auto `}
        >
          {task.title}
        </p>
      }
      {activeHover && (
        <img
          src="icon-cross.svg"
          alt="close-button"
          className="ml-auto transition-all duration-300 h-4 max-[875px]:hidden cursor-pointer"
          onClick={handleDeleteTodo}
        />
      )}
      <img
        src="icon-cross.svg"
        alt="close-button"
        className="ml-auto transition-all duration-300 h-4 min-[875px]:hidden cursor-pointer"
        onClick={handleDeleteTodo}
      />
    </li>
  );
}

export default ToDoItem;
