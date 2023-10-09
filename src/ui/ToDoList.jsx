import { useTodo } from "../TodoContext";
import ToDoInfo from "./ToDoInfo";
import ToDoItem from "./ToDoItem";

// const TodoList = [
//   { task: "Jog around the park 3x", completed: true },
//   { task: "10 minutes meditation", completed: false },
// ];

function ToDoList() {
  const { tasks: totalTasks, completedTask, activeIndex, darkMode } = useTodo();
  const tasks = activeIndex === 0 ? totalTasks : completedTask;
  console.log(tasks);
  return (
    <ul
      className={`${
        darkMode ? "bg-[#25273c] divide-[#4d5066]" : "bg-white"
      } divide-y rounded-lg`}
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
        tasks.map((task, i) => <ToDoItem task={task} key={i} />)
      )}
      <ToDoInfo />
    </ul>
  );
}

export default ToDoList;
