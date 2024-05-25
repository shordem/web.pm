import classNames from "classnames";
import { MouseEvent, useContext } from "react";

import { SpinnerIcon } from "@/components/icons";
import { checkDue, formatDistanceFromNow } from "@/utilities/common";
import { useDashboardContext } from "../dashboard-context";
import { TodoContext } from "./todos.context";
import { useGetTodos, useUpdateTodo } from "./todos.hook";
import { TodoDataT, TodoItemProps } from "./todos.interface";

function TodoItem(props: TodoItemProps) {
  const { form, setForm, setUpdateTaskVisibility } = useContext(TodoContext);
  const { currentOrganisationDetails, currentFolder } = useDashboardContext();

  const todos = useGetTodos(
    currentOrganisationDetails.id || "",
    currentFolder.id
  );

  const updateTodoMutation = useUpdateTodo(
    currentOrganisationDetails.id,
    form.id
  );

  function handleTodoClick(e: MouseEvent<HTMLLIElement>, todo: TodoDataT) {
    setForm({ ...form, id: todo.id });
    if ((e.target as HTMLElement).tagName === "DIV") return;

    setUpdateTaskVisibility(true);

    setForm({
      ...form,
      title: props.title,
      description: props.description,
      dueDate: props.due_date?.split("T")[0] ?? "",
      dueTime: props.due_date?.split("T")[0] ?? "",
    });
  }

  function handleCompleted() {
    setForm({ ...form, id: props.id });
    updateTodoMutation.mutateAsync({
      title: props.title,
      description: props.description,
      due_date: props.due_date,
      completed: !props.completed,
    });
  }

  return (
    <li
      onClick={(e) => handleTodoClick(e, form)}
      className="w-full text-ellipsis bg-[#222] flex justify-between items-center gap-3 px-4 py-2 rounded-lg cursor-pointer"
      key={props.id}
    >
      <div className="flex items-center gap-4">
        {props.id === form.id &&
        (updateTodoMutation.isPending || !todos.isSuccess) ? (
          <SpinnerIcon />
        ) : (
          <div
            className={classNames(
              "border border-compliment w-4 h-4 rounded-full",
              { "bg-primary": props.completed }
            )}
            onClick={handleCompleted}
          >
            {props.completed && <abbr title="completed"></abbr>}
          </div>
        )}
        <span
          className={classNames({
            "line-through": props.completed,
            "text-red-400": props.due_date ? checkDue(props.due_date) : false,
          })}
        >
          {props.title || "No title available"}
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <span>
          {props.due_date
            ? props.completed
              ? ""
              : checkDue(props.due_date)
              ? `task was due ${formatDistanceFromNow(props.due_date)}`
              : formatDistanceFromNow(props.due_date).concat(" left")
            : ""}
        </span>
        <img
          src={`https://ui-avatars.com/api/?name=${props.created_by.first_name}+${props.created_by.last_name}}&background=random&rounded=true`}
          alt="user"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </li>
  );
}

export default TodoItem;
