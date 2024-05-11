import { useState } from "react";

import { VscDiffAdded } from "react-icons/vsc";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import TextArea from "@/components/ui/form/textarea";
import Loader from "@/components/ui/loading";
import Modal from "@/components/ui/modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "./dashboard-context";
import {
  useCreateTodo as createTodosQuery,
  useGetTodos as getTodosQuery,
  useDeleteTodo,
  useUpdateTodo,
} from "./dashboard.hook";
import { createDueDate } from "@/utilities/common";

function Todos() {
  // Context hook
  const { currentOrganisationDetails, currentFolder } = useDashboardContext();

  // Use state hooks
  const [createTaskVisibility, setCreateTaskVisibility] = useState(false);
  const [updateTaskVisibility, setUpdateTaskVisibility] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoId, setTodoId] = useState("");

  // todo hooks

  const todos = getTodosQuery(
    currentOrganisationDetails.id || "",
    currentFolder.id
  );

  const createTodo = createTodosQuery(
    currentOrganisationDetails.id || "",
    currentFolder.id
  );

  const updateTodo = useUpdateTodo(currentOrganisationDetails.id, todoId);
  const deleteTodo = useDeleteTodo(currentOrganisationDetails.id);

  // create a date in 7 days time

  if (todos.isLoading || !currentFolder.id) return <Loader />;
  return (
    <>
      <Modal
        visibility={createTaskVisibility}
        setVisibility={() => setCreateTaskVisibility(false)}
      >
        <div className="grid justify-center gap-4 p-12">
          <h4 className="text-2xl">Add new todo</h4>
          <form
            className="w-96 flex flex-col items-center gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!title || !description)
                return toast.error("All fields are required");
              createTodo
                .mutateAsync({
                  title,
                  description,
                  due_date: createDueDate(),
                })
                .then(() => {
                  setCreateTaskVisibility(false);
                });
            }}
          >
            <Input
              label="Title"
              className="w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              label="Description"
              className="w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button className="mt-4" isLoading={createTodo.isPending}>
              Add todo
            </Button>
          </form>
        </div>
      </Modal>

      <Modal
        visibility={updateTaskVisibility}
        setVisibility={() => setUpdateTaskVisibility(false)}
      >
        <div className="grid justify-center gap-4 p-12">
          <h4 className="text-2xl">Update Todo</h4>
          <form className="w-96 flex flex-col items-center gap-4">
            <Input
              label="Title"
              className="w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              label="Description"
              className="w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-4">
              <Button
                colorScheme="danger"
                isLoading={deleteTodo.isPending}
                onClick={(e) => {
                  e.preventDefault();
                  deleteTodo.mutateAsync(todoId).then(() => {
                    setUpdateTaskVisibility(false);
                  });
                }}
              >
                Delete todo
              </Button>
              <Button
                colorScheme="warning"
                isLoading={updateTodo.isPending}
                onClick={(e) => {
                  e.preventDefault();
                  updateTodo
                    .mutateAsync({
                      title,
                      description,
                      due_date: createDueDate(),
                      completed: false,
                    })
                    .then(() => {
                      setUpdateTaskVisibility(false);
                    });
                }}
              >
                Update todo
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <ul className="w-full h-full flex flex-col items-center gap-4 py-6">
        <li
          onClick={() => {
            setCreateTaskVisibility(true);
            setTitle("");
            setDescription("");
          }}
          className="w-full text-ellipsis bg-[#222] flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer"
        >
          <VscDiffAdded size={20} />
          <span className="text-gray-400">Add new task</span>
        </li>

        {todos.data?.data.length === 0 && (
          <li className="w-full text-ellipsis bg-[#222] flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer">
            <span className="text-gray-400">No tasks available</span>
          </li>
        )}

        {todos.data?.data.map((todo) => (
          <li
            onClick={() => {
              setUpdateTaskVisibility(true);
              setTitle(todo.title || "No title available");
              setDescription(todo.description || "No description available");
              setTodoId(todo.id);
            }}
            className="w-full text-ellipsis bg-[#222] flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer"
            key={todo.id}
          >
            <div className="border border-compliment w-4 h-4 rounded-full"></div>
            <span>{todo.title || "No title available"}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
