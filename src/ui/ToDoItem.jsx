import { useState } from "react";
import { useTodo } from "../TodoContext";
import CircularDiv from "./CircularDiv";

function ToDoItem({ task }) {
  const { handleToggleCompletedTask } = useTodo();
  function handleChange(e) {
    // setTasks((tasks) =>
    //   tasks.map((task) =>
    //     task === item ? { ...task, completed: !task.completed } : task
    //   )
    // );

    handleToggleCompletedTask(task);
  }
  return (
    <li className="flex gap-6 font-semibold py-6 px-6">
      {!task.completed ? (
        <CircularDiv onClick={handleChange} />
      ) : (
        <div
          className="w-6 h-6 cursor-pointer rounded-full bg-check border-2  flex items-center justify-center transition-allr"
          onClick={handleChange}
        >
          <img src="/icon-check.svg" alt="Checked" />
        </div>
      )}

      <p
        className={`${
          task.completed ? "line-through text-[#9394a5]" : "text-[#484b6a]"
        } `}
      >
        {task.task}
      </p>
    </li>
  );
}

export default ToDoItem;
