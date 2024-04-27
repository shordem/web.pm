import { useDeleteTodo, useGetTodos } from "../featuresHook/useTodo.js";
import ActiveTab from "../ui/ActiveTab.jsx";
import SpinnerMini from "../ui/SpinnerMini.jsx";

function NoteInfo() {
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
        {taskLEft === 0
          ? "No note "
          : taskLEft === 1
          ? "1 note "
          : `${taskLEft} notes `}
      </p>

      <button
        className="text-[#9394a5] hover:text-inherit transition-all duration-300"
        onClick={() => {
          const response = window.confirm("Are you sure you want all notes");
          if (response) clearCompleted();
        }}
      >
        Clear All Notes
      </button>
    </div>
  );
}

export default NoteInfo;
