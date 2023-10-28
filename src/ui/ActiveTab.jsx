import { useTodo } from "../TodoContext";

function ActiveTab({ className }) {
  const { showCompletedTask, showActiveTask, showAll, activeIndex } = useTodo();
  return (
    <div className={className}>
      <button
        className={
          activeIndex === 0
            ? "text-[#3a7bfd]"
            : "text-[#9394a5] hover:text-[#484b6a] transition-all duration-300"
        }
        onClick={showAll}
      >
        All
      </button>
      <button
        onClick={showActiveTask}
        className={
          activeIndex === 1
            ? "text-[#3a7bfd]"
            : "text-[#9394a5] hover:text-[#484b6a] transition-all duration-300"
        }
      >
        Active
      </button>
      <button
        className={
          activeIndex === 2
            ? "text-[#3a7bfd]"
            : "text-[#9394a5] hover:text-[#484b6a] transition-all duration-300"
        }
        onClick={showCompletedTask}
      >
        Completed
      </button>
    </div>
  );
}

export default ActiveTab;
