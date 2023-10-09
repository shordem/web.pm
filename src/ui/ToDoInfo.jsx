import { useTodo } from "../TodoContext";

function ToDoInfo() {
  const { clearCompleted, showCompletedTask, showAll, tasks, activeIndex } =
    useTodo();
  const taskLEft = tasks.filter((task) => !task.completed).length;
  return (
    <div className="flex justify-between py-4 px-6">
      <p className="">
        {" "}
        {}
        {taskLEft === 0
          ? "No item left"
          : taskLEft === 1
          ? "1 item left"
          : `${taskLEft} items left`}
      </p>
      <div className="space-x-2">
        <button
          className={activeIndex === 0 ? "text-[#3a7bfd]" : ""}
          onClick={showAll}
        >
          All
        </button>
        <button>Active</button>
        <button
          className={activeIndex === 2 ? "text-[#3a7bfd]" : ""}
          onClick={showCompletedTask}
        >
          Completed
        </button>
      </div>
      <button className="" onClick={clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

export default ToDoInfo;
