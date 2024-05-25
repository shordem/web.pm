import { useContext } from "react";

import { VscDiffAdded } from "react-icons/vsc";

import { TodoContext } from "./todos.context";

function AddTodoButtonItem() {
  const { reset, setCreateTaskVisibility } = useContext(TodoContext);

  return (
    <li
      onClick={() => {
        setCreateTaskVisibility(true);
        reset();
      }}
      className="w-full text-ellipsis bg-[#222] flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer"
    >
      <VscDiffAdded size={20} />
      <span className="text-gray-400">Add new task</span>
    </li>
  );
}

export default AddTodoButtonItem;
