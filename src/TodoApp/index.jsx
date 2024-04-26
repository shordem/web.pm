import CreateNewTodo from "./CreateNewTodo";
import ToDoList from "./ToDoList";
import { motion } from "framer-motion";

const todoAppVariant = {
  hidden: { opacity: 0, x: "-100px" },
  visible: { opacity: 1, x: 0 },
};

function TodoApp() {
  return (
    <motion.div
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={todoAppVariant}
    >
      {" "}
      <CreateNewTodo />
      <ToDoList />
    </motion.div>
  );
}

export default TodoApp;
