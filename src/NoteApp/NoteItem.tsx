import { useState } from "react";
import { useTodo } from "../TodoContext.jsx";
import { useDeleteTodo } from "../featuresHook/useTodo.js";
import SpinnerMini from "../ui/SpinnerMini.jsx";

function NoteItem({ note, provided, innerRef, id }) {
  const [activeHover, setActiveHover] = useState(false);

  const { darkMode } = useTodo();
  const { isDeleting, deleteTodo } = useDeleteTodo();

  function handleDeleteNote(e) {
    e.preventDefault();
    if (e.target.alt === "close-button") return deleteTodo(note.id);
  }
  function handleHover() {
    setActiveHover(true);
  }
  function hanleLeave() {
    setActiveHover(false);
  }

  if (isDeleting) return <SpinnerMini text="Deleting note" />;

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
      id={note.id}
    >
      {
        <p
          className={`${`${
            !darkMode ? "text-[#484b6a]" : "text-[#e4e5f1]"
          } `}  overflow-auto `}
        >
          {note.title}
        </p>
      }
      {activeHover && (
        <img
          src="icon-cross.svg"
          alt="close-button"
          className="ml-auto transition-all duration-300 h-4 max-[875px]:hidden cursor-pointer"
          onClick={handleDeleteNote}
        />
      )}
      <img
        src="icon-cross.svg"
        alt="close-button"
        className="ml-auto transition-all duration-300 h-4 min-[875px]:hidden cursor-pointer"
        onClick={handleDeleteNote}
      />
    </li>
  );
}

export default NoteItem;
