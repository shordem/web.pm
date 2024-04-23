import { twMerge } from "tailwind-merge";
function ButtonIcon({ children, className, onClick }) {
  const baseClassName = twMerge(
    " hover:bg-purple-200 transition-all p-2 hover:scale-110 rounded-full active:scale-90",
    className
  );
  return (
    <button className={baseClassName} onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonIcon;
