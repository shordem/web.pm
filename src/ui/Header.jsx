import { useTodo } from "../TodoContext.jsx";
import HeadingTag from "./HeadingTag.jsx";

function Header() {
  const { toggleMode, darkMode } = useTodo();
  return (
    <header className="flex items-center justify-between mb-6">
      <HeadingTag> TODO</HeadingTag>
      <img
        src={`/icon-${!darkMode ? "moon" : "sun"}.svg`}
        alt="Mode-icon"
        className="h-8 cursor-pointer"
        onClick={toggleMode}
      />
    </header>
  );
}

export default Header;
