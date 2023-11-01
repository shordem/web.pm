// import { Children } from "react";

function LoginButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-purple-300 p-2 rounded-lg inline-block hover:bg-purple-400 transition-all duration-300"
    >
      {children}
    </button>
  );
}

export default LoginButton;
