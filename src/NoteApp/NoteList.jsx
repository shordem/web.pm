import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTodo } from "../TodoContext.jsx";
import { useGetTodos } from "../featuresHook/useTodo.js";
import SpinnerMini from "../ui/SpinnerMini.jsx";
import NoteInfo from "./NoteInfo.jsx";
import { useEffect } from "react";
import NoteItem from "./NoteItem.jsx";

function NoteList() {
  const { darkMode } = useTodo();

  const { isLoading, todos: totalTasks } = useGetTodos();

  const [tasks, setTasks] = useState([]);

  useEffect(
    function () {
      setTasks(totalTasks);
    },
    [totalTasks]
  );

  if (isLoading) return <SpinnerMini text={"Loading Notes..."} />;

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...tasks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  }
  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {/* <DragDropContext> */}
        <Droppable droppableId="tasks">
          {(provided, snapshot) => (
            <ul
              className={`${
                darkMode ? "bg-[#25273c] divide-[#4d5066]" : "bg-white"
              } divide-y rounded-lg`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.length === 0 ? (
                <li className="py-4 px-6">
                  {" "}
                  No note available, create a new note to get started👆"
                </li>
              ) : (
                tasks.map((task, i) => (
                  <Draggable key={task.id} draggableId={task.id} index={i}>
                    {(provided) => (
                      <NoteItem
                        provided={provided}
                        note={task}
                        key={i}
                        innerRef={provided.innerRef}
                        id={task.id}
                      />
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <NoteInfo />
    </>
  );
}

export default NoteList;
