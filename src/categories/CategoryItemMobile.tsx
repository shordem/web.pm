import { useTodo } from "../TodoContext";

function CategoryItemMobile({ children }: { children: React.ReactNode }) {
  const { darkMode } = useTodo()!;
  return (
    <span
      className={`${
        darkMode ? "bg-[#25273c] text-[#fafafa]" : "bg-[#fafafa] text-[#25273c]"
      } p-4 rounded-md mr-4   `}
    >
      {children}
    </span>
  );
}

export default CategoryItemMobile;
