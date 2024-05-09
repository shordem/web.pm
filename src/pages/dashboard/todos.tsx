import { useState } from "react";

import { VscDiffAdded } from "react-icons/vsc";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import TextArea from "@/components/ui/form/textarea";
import Modal from "@/components/ui/modal";
import { useDashboardContext } from "./dashboard-context";
import { useCreateTodo, useGetTodos } from "./dashboard.hook";

function Todos() {
  // Context hook
  const { currentOrganisationDetails } = useDashboardContext();

  // Use state hook
  const [createTaskVisibility, setCreateTaskVisibility] = useState(false);
  const [updateTaskVisibility, setUpdateTaskVisibility] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // todo hooks
  const todos = useGetTodos(
    currentOrganisationDetails.id,
    currentOrganisationDetails.folder?.id || ""
  );
  console.log(todos.data?.data);

  const createTodo = useCreateTodo(
    currentOrganisationDetails.id,
    currentOrganisationDetails.folder?.id || ""
  );

  // create a date in 7 days time
  function createDueDate() {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    let formattedDate = date.toISOString();
    formattedDate = formattedDate.replace("T", " ");
    formattedDate = formattedDate.replace("Z", "");

    return formattedDate;
  }

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
              <Button colorScheme="danger">Delete todo</Button>
              <Button colorScheme="warning">Update todo</Button>
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

        {[...new Array(6)].map(() => (
          <li
            onClick={() => {
              setUpdateTaskVisibility(true);
              setTitle(
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
              );
              setDescription(
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
              );
            }}
            className="w-full text-ellipsis bg-[#222] flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer"
          >
            <div className="border border-compliment w-4 h-4 rounded-full"></div>
            <span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
