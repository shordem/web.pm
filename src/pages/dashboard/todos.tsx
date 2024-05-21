import { MouseEvent, useState } from "react";

import { VscDiffAdded } from "react-icons/vsc";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import TextArea from "@/components/ui/form/textarea";
import Loader from "@/components/ui/loading";
import Modal from "@/components/ui/modal";
import {
  checkDue,
  createDueDate,
  formatDistanceFromNow,
  validateDate,
} from "@/utilities/common";
import classNames from "classnames";
import toast from "react-hot-toast";
import { useDashboardContext } from "./dashboard-context";
import {
  useCreateTodo as createTodosQuery,
  useGetTodos as getTodosQuery,
  useDeleteTodo,
  useUpdateTodo,
} from "./dashboard.hook";
import { TodoResponsePayload } from "./dashboard.interface";

function Todos() {
  // Context hook
  const { currentOrganisationDetails, currentFolder } = useDashboardContext();

  // Use state hooks
  const [createTaskVisibility, setCreateTaskVisibility] = useState(false);
  const [updateTaskVisibility, setUpdateTaskVisibility] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [todoId, setTodoId] = useState("");
  const [error, setError] = useState("");

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

  function handleReset() {
    setTitle("");
    setDescription("");
    setDueDate("");
    setDueTime("");
    setError("");
  }

  // handle COmpleted
  function handleTodoClick(
    e: MouseEvent<HTMLLIElement>,
    todo: TodoResponsePayload
  ) {
    setTodoId(todo.id);
    if ((e.target as HTMLElement).tagName === "DIV") return;

    setUpdateTaskVisibility(true);
    setTitle(todo.title || "No title available");
    setDescription(todo.description || "No description available");
    setDueDate(todo.due_date.split("T")[0]);
    setDueTime(todo.due_date.split("T")[1]);
  }

  function handleCompleted(todo: TodoResponsePayload) {
    setTodoId(todo.id);
    updateTodo.mutateAsync({
      title: todo.title,
      description: todo.description,
      due_date: todo.due_date,
      completed: !todo.completed,
    });
  }

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
              if (!title) return toast.error("Input todo title ");
              if (!validateDate(dueDate, dueTime))
                return setError("You can only schedule tasks to the future");

              createTodo
                .mutateAsync({
                  title,
                  description,
                  due_date: createDueDate(dueDate, dueTime),
                })
                .then(() => {
                  setCreateTaskVisibility(false);
                  handleReset();
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
            <div className="flex w-full gap-2 justify-between">
              <Input
                label="Due date"
                className="w-full"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                errorMsg={error}
              />

              <Input
                label="Due time"
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-2/5"
              />
            </div>

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
            <div className="flex w-full gap-2 justify-between">
              <Input
                label="Due date"
                className="w-full"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                errorMsg={error}
              />

              <Input
                label="Due time"
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-2/5"
              />
            </div>

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
                  if (!title) return toast.error("Title field is required");
                  if (!validateDate(dueDate, dueTime))
                    return setError(
                      "You can only schedule tasks to the future"
                    );

                  updateTodo
                    .mutateAsync({
                      title,
                      description,
                      due_date: createDueDate(dueDate, dueTime),
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
            onClick={(e) => handleTodoClick(e, todo)}
            className="w-full text-ellipsis bg-[#222] flex justify-between items-center gap-3 px-4 py-2 rounded-lg cursor-pointer"
            key={todo.id}
          >
            <div className="flex items-center gap-4">
              <div
                className={classNames(
                  "border border-compliment w-4 h-4 rounded-full",
                  { "bg-primary": todo.completed }
                )}
                onClick={() => handleCompleted(todo)}
              >
                {todo.completed && <abbr title="completed"></abbr>}{" "}
              </div>
              <span
                className={classNames({
                  "line-through": todo.completed,
                  "text-red-400": checkDue(todo.due_date),
                })}
              >
                {todo.title || "No title available"}
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <span>
                {checkDue(todo.due_date)
                  ? `task was due ${formatDistanceFromNow(todo.due_date)}`
                  : formatDistanceFromNow(todo.due_date).concat(" left")}
              </span>
              <img
                src={`https://ui-avatars.com/api/?name=${todo.created_by.first_name}+${todo.created_by.last_name}}&background=random&rounded=true`}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
