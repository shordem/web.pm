import { useDeleteTodo, useGetTodos } from "../featuresHook/useTodo.js";
import ActiveTab from "./ActiveTab";
import SpinnerMini from "./SpinnerMini.jsx";

function ToDoInfo() {
  const { isLoading, todos: tasks } = useGetTodos();
  const { isDeleting, deleteTodo } = useDeleteTodo();
  function clearCompleted() {
    const completedTaskId = tasks
      .filter((task) => task.completed)
      .map((el) => el.id);
    completedTaskId.forEach((id) => deleteTodo(id));
  }
  const taskLEft = tasks.filter((task) => !task.completed).length;
  if (isDeleting) return <SpinnerMini text={"Clearing Completed Tasks"} />;
  return (
    <div className="flex justify-between py-4 px-6">
      <p className="text-[#9394a5] hover:text-inherit transition-all duration-300">
        {" "}
        {isLoading && "loading"}
        {taskLEft === 0
          ? "No item left"
          : taskLEft === 1
          ? "1 item left"
          : `${taskLEft} items left`}
      </p>
      <ActiveTab className={"space-x-2 max-[375px]:hidden text-[#9394a5]"} />
      <button
        className="text-[#9394a5] hover:text-inherit transition-all duration-300"
        onClick={() => {
          const response = window.confirm(
            "Are you sure you want clear completed"
          );
          if (response) clearCompleted();
        }}
      >
        Clear Completed
      </button>
    </div>
  );
}

export default ToDoInfo;
