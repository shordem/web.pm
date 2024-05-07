import { motion } from "framer-motion";
import ButtonIcon from "./ButtonIcon";
<<<<<<< HEAD
import SettingsIcon from "../components/icons/settings";
import { motion } from "framer-motion";

function User({ setShowSettings }: { setShowSettings: Function }) {
  const { isLoading, user } = useUser();

=======
import SettingsIcon from "./icons/settings";

function User({ setShowSettings }) {
>>>>>>> d097d808884255f0cbf8b3b8ee8f004b45ef5a39
  function handleShowSettings(e) {
    e.stopPropagation();
    setShowSettings((sh: boolean) => !sh);
  }

  const hours = new Date().getHours();
  let timeString = `${
    hours <= 11
      ? "Good Morning"
      : hours <= 15
      ? "Good Afternoon"
      : hours <= 20
      ? "Good Evening"
      : "Good Night"
  }`;

<<<<<<< HEAD
  if (isLoading) return <p>Loading User</p>;
  const { username } = user!;
=======
  // if (isLoading) return <p>Loading User</p>;
>>>>>>> d097d808884255f0cbf8b3b8ee8f004b45ef5a39
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween", delay: 1 }}
      className="flex gap-3 text-white ml-auto text-base lg:text-2xl md:text-1xl w-fit"
    >
      <p>
        {timeString}, {"User"}
      </p>
      <ButtonIcon onClick={handleShowSettings}>
        {" "}
        <SettingsIcon />{" "}
      </ButtonIcon>
    </motion.div>
  );
}

export default User;
