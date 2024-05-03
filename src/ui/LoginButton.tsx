import { twMerge } from "tailwind-merge";

interface LoginButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
function LoginButton({
  children,
  onClick,
  className,
  disabled,
}: LoginButtonProps) {
  const baseClassname = twMerge(
    "bg-purple-300 p-2 rounded-lg inline-block hover:bg-purple-400 transition-all duration-300",
    className
  );
  return (
    <button onClick={onClick} className={baseClassname}>
      {children}
    </button>
  );
}

export default LoginButton;
