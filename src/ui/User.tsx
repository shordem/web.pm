import { motion } from "framer-motion";
import ButtonIcon from "./ButtonIcon";
import SettingsIcon from "./icons/settings";

function User({ setShowSettings }) {
  function handleShowSettings(e) {
    e.stopPropagation();
    setShowSettings((sh) => !sh);
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

  // if (isLoading) return <p>Loading User</p>;
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
