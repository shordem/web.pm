import Loader from "@/components/ui/loading";
import { useDashboardContext } from "../dashboard-context";
import AddTodoButtonItem from "./add-button-item";
import CreateTodo from "./create";
import TodoItem from "./item";
import { useGetTodos as getTodosQuery } from "./todos.hook";
import TodoProvider from "./todos.provider";
import UpdateTodo from "./update";

function Todos() {
  // Context hook
  const { currentOrganisationDetails, currentFolder } = useDashboardContext();

  const todos = getTodosQuery(
    currentOrganisationDetails.id || "",
    currentFolder.id
  );

  if (todos.isLoading || !currentFolder.id) return <Loader />;
  return (
    <TodoProvider>
      <CreateTodo />

      <UpdateTodo />

      <ul className="w-full h-full flex flex-col items-center gap-4 py-6">
        <AddTodoButtonItem />

        {todos.data?.data.length === 0 && (
          <li className="w-full text-ellipsis bg-[#222] flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer">
            <span className="text-gray-400">No tasks available</span>
          </li>
        )}

        {todos.data?.data.map((todo) => (
          <TodoItem {...todo} />
        ))}
      </ul>
    </TodoProvider>
  );
}

export default Todos;
