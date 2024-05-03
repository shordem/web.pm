import { FaFolder } from "react-icons/fa";
import { useTodo } from "../TodoContext";
import { CategoryType } from "./category.interface";

function CategoryItem({ category }: { category: CategoryType }) {
  const { darkMode } = useTodo()!;
  return (
    <li
      className={`flex items-center gap-6 py-6 px-6 cursor-pointer transition-all duration-300 ${
        !darkMode ? "text-[#484b6a]" : "text-[#e4e5f1]"
      }`}
    >
      {" "}
      <span className=" -mt-1">
        {" "}
        <FaFolder />{" "}
      </span>{" "}
      <span> {category.name} </span>
    </li>
  );
}

export default CategoryItem;
