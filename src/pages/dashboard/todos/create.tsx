import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import TextArea from "@/components/ui/form/textarea";
import Modal from "@/components/ui/modal";
import { createDueDate, validateDate } from "@/utilities/common";
import { useDashboardContext } from "../dashboard-context";
import { INITIAL_TODO_DATA } from "./todos.constant";
import { TodoContext } from "./todos.context";
import { useCreateTodo as createTodoMutation } from "./todos.hook";
import { CreateTodoProps } from "./todos.interface";

function CreateTodo(props: CreateTodoProps) {
  const { form, setForm, createTaskVisibility, setCreateTaskVisibility } =
    useContext(TodoContext);
  const [error, setError] = useState("");

  const { currentOrganisationDetails, currentFolder } = useDashboardContext();

  const createTodo = createTodoMutation(
    currentOrganisationDetails.id || "",
    currentFolder.id
  );

  return (
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
            if (!form.title) return toast.error("Input todo title ");
            if (
              form.dueDate !== "" &&
              form.dueTime !== "" &&
              !validateDate(form.dueDate, form.dueTime)
            )
              return setError("You can only schedule tasks to the future");

            createTodo
              .mutateAsync({
                title: form.title,
                description: form.description,
                due_date:
                  form.dueDate === ""
                    ? null
                    : createDueDate(form.dueDate, form.dueTime),
              })
              .then(() => {
                props.setVisibility();
                setForm(INITIAL_TODO_DATA);
              });
          }}
        >
          <Input
            label="Title"
            className="w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextArea
            label="Description"
            className="w-full"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="flex w-full gap-2 justify-between">
            <Input
              label="Due date"
              className="w-full"
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              errorMsg={error}
            />

            <Input
              label="Due time"
              type="time"
              value={form.dueTime}
              onChange={(e) => setForm({ ...form, dueTime: e.target.value })}
              className="w-2/5"
            />
          </div>

          <Button className="mt-4" isLoading={createTodo.isPending}>
            Add todo
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default CreateTodo;
