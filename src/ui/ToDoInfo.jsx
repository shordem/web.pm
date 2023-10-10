import { useTodo } from "../TodoContext";
import ActiveTab from "./ActiveTab";

function ToDoInfo() {
  const { clearCompleted, showCompletedTask, showAll, tasks, activeIndex } =
    useTodo();
  const taskLEft = tasks.filter((task) => !task.completed).length;
  return (
    <div className="flex justify-between py-4 px-6">
      <p className="text-[#9394a5] hover:text-inherit transition-all duration-300">
        {" "}
        {}
        {taskLEft === 0
          ? "No item left"
          : taskLEft === 1
          ? "1 item left"
          : `${taskLEft} items left`}
      </p>
      <ActiveTab className={"space-x-2 max-[375px]:hidden text-[#9394a5]"} />
      <button
        className="text-[#9394a5] hover:text-inherit transition-all duration-300"
        onClick={clearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
}

export default ToDoInfo;
