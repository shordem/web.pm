import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTodo } from "../TodoContext";
import ToDoInfo from "./ToDoInfo";
import ToDoItem from "./ToDoItem";
import { useEffect, useState } from "react";
import { getTodo } from "../services/apiTodo";

// const TodoList = [
//   { task: "Jog around the park 3x", completed: true },
//   { task: "10 minutes meditation", completed: false },
// ];

function ToDoList() {
  const {
    tasks: totalTasks,
    completedTask,
    activeTasks,
    activeIndex,
    darkMode,
    setTasks,
  } = useTodo();
  let tasks;
  if (activeIndex === 0) tasks = totalTasks;
  if (activeIndex === 1) tasks = activeTasks;
  if (activeIndex === 2) tasks = completedTask;

  // const tasks = activeIndex === 0 ? totalTasks : completedTask;

  getTodo();

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
