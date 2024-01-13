import { useGetTodos } from "../featuresHook/useTodo";
import ToDoList from "./ToDoList";

function ToDo() {
  const { isLoading } = useGetTodos();
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <ToDoList />{" "}
    </div>
  );
}

export default ToDo;
