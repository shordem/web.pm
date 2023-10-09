import { useTodo } from "../TodoContext";

function ToDoInfo() {
  const { clearCompleted, showCompletedTask, showAll, tasks } = useTodo();
  const taskLEft = tasks.filter((task) => !task.completed).length;
  return (
    <div className="flex justify-between py-4 px-6">
      <p className="text-stone-500">
        {" "}
        {}
        {taskLEft === 0
          ? "No item left"
          : taskLEft === 1
          ? "1 item left"
          : `${taskLEft} items left`}
      </p>
      <div className="space-x-2">
        <button className="text-[#3a7bfd]" onClick={showAll}>
          All
        </button>
        <button>Active</button>
        <button onClick={showCompletedTask}>Completed</button>
      </div>
      <button className="text-stone-400" onClick={clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

export default ToDoInfo;
