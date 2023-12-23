import { useGetTodos } from "../featuresHook/useTodo";
import ToDoList from "./ToDoList";

function ToDo() {
  const { isLoading, todos, errorTodo } = useGetTodos();
  if (isLoading) return <p>Loading</p>;
  // console.log(todo.getTodos());
  console.log(todos);
  return (
    <div>
      <ToDoList />{" "}
    </div>
  );
}

export default ToDo;
