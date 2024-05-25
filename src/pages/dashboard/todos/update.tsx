import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import TextArea from "@/components/ui/form/textarea";
import Modal from "@/components/ui/modal";
import { createDueDate, validateDate } from "@/utilities/common";
import { useDashboardContext } from "../dashboard-context";
import { TodoContext } from "./todos.context";
import { useDeleteTodo, useUpdateTodo } from "./todos.hook";

function UpdateTodo() {
  const { currentOrganisationDetails } = useDashboardContext();

  const { form, setForm, updateTaskVisibility, setUpdateTaskVisibility } =
    useContext(TodoContext);
  const [error, setError] = useState("");

  const updateTodoMutation = useUpdateTodo(
    currentOrganisationDetails.id,
    form.id
  );
  const deleteTodoMutation = useDeleteTodo(currentOrganisationDetails.id);

  return (
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

          <div className="flex gap-4">
            <Button
              colorScheme="danger"
              isLoading={deleteTodoMutation.isPending}
              onClick={(e) => {
                e.preventDefault();
                deleteTodoMutation.mutateAsync(form.id).then(() => {
                  setUpdateTaskVisibility(false);
                });
              }}
            >
              Delete todo
            </Button>
            <Button
              colorScheme="warning"
              isLoading={updateTodoMutation.isPending}
              onClick={(e) => {
                e.preventDefault();
                if (!form.title) return toast.error("Title field is required");
                if (!validateDate(form.dueDate, form.dueTime))
                  return setError("You can only schedule tasks to the future");

                updateTodoMutation
                  .mutateAsync({
                    title: form.title,
                    description: form.description,
                    due_date: createDueDate(form.dueDate, form.dueTime),
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
  );
}

export default UpdateTodo;
