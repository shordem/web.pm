import { useTodo } from "../TodoContext.jsx";

function Header() {
  const { toggleMode, darkMode } = useTodo();
  return (
    <header className="flex items-center justify-between mb-6">
      <h2 className="text-[54px] text-[#fafafa] tracking-widest ">TODO</h2>
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
