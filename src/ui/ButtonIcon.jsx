import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
function ButtonIcon({ children, className, onClick }) {
  const baseClassName = twMerge("p-2  rounded-full", className);
  return (
    <motion.button
      whileHover={{
        backgroundColor: "#f3e8ff",
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
      className={baseClassName}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

export default ButtonIcon;
