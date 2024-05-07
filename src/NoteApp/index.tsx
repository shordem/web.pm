import CreateNewNote from "./create-new-note";
import NoteList from "./note-list";
import { motion } from "framer-motion";

const noteAppVariant = {
  hidden: { opacity: 0, x: "100px" },
  visible: { opacity: 1, x: 0 },
};

function NoteApp() {
  return (
    <motion.div
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={noteAppVariant}
    >
      <CreateNewNote />
      <NoteList />
    </motion.div>
  );
}

export default NoteApp;
