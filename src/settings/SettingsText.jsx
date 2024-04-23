import { useTodo } from "../TodoContext";

function SettingsText({ children }) {
  const { darkMode } = useTodo();
  return (
    <p className={!darkMode ? "text-[#484b6a]" : "text-[#e4e5f1]"}>
      {children}
    </p>
  );
}

export default SettingsText;
