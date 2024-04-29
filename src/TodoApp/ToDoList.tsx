import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTodo } from "../TodoContext.jsx";
import ToDoInfo from "./ToDoInfo.jsx";
import ToDoItem from "./ToDoItem.jsx";
import { useEffect, useState } from "react";
import SpinnerMini from "../ui/SpinnerMini.jsx";
import { useGetTodos } from "../featuresHook/useTodo.js";

function ToDoList() {
  const { activeIndex, darkMode } = useTodo();

  const { isLoading, todos: totalTasks } = useGetTodos();

  const [tasks, setTasks] = useState([]);

  useEffect(
    function () {
      if (!totalTasks) return;
      if (activeIndex === 0) setTasks(totalTasks.reverse());
      if (activeIndex === 1)
        setTasks(totalTasks.filter((el) => !el.completed).reverse());
      if (activeIndex === 2)
        setTasks(totalTasks.filter((el) => el.completed).reverse());
    },
    [activeIndex, totalTasks]
  );

  if (isLoading) return <SpinnerMini text={"Loading todos..."} />;

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
                  No Task{" "}
                  {activeIndex === 0
                    ? "available, create a new todo to get started👆"
                    : "completed"}
                </li>
              ) : (
                tasks.map((task, i) => (
                  <Draggable key={task.id} draggableId={task.id} index={i}>
                    {(provided) => (
                      <ToDoItem
                        provided={provided}
                        task={task}
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
      <ToDoInfo />
    </>
  );
}

export default ToDoList;
