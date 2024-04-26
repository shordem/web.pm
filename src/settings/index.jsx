import { useEffect, useState } from "react";
import { useTodo } from "../TodoContext";
import Heading from "../ui/HeadingTag";
import Logout from "../ui/Logout";
import Modal from "../ui/Modal";
import AddMember from "./AddMember";
import Members from "./Members";
import Organizations from "./Organizations";
import SettingsText from "./SettingsText";
import { motion } from "framer-motion";
import ButtonIcon from "../ui/ButtonIcon";
import { IoClose } from "react-icons/io5";
const settingsVariant = {
  hidden: { opacity: 0, x: "100px", transition: { type: "tween" } },
  visible: { opacity: 1, x: 0, transition: { type: "tween" } },
};
function Settings({ close }) {
  const { darkMode } = useTodo();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(function () {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

    return () =>
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);
  console.log(windowWidth);
  return (
    <Modal>
      <div className=" max-[1024px]:inset-0 max-[1024px]:absolute max-[1024px]:bg-transparent max-[1024px]:backdrop-blur-sm ">
        <ButtonIcon
          className={
            "max-[1024px]:absolute max-[1024px]:block hidden top-5 right-5 text-4xl "
          }
          onClick={close}
        >
          <IoClose />
        </ButtonIcon>
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          variants={settingsVariant}
          exit={"hidden"}
          className="mt-16 w-9/12 mx-auto max-[1024px]:absolute right-0 top-6  "
          // ref={settingsRef}
        >
          <Heading as="h4">Settings</Heading>
          <ul
            className={`${
              darkMode ? "bg-[#25273c] divide-[#4d5066]" : "bg-white"
            } divide-y rounded-lg `}
          >
            <Organizations />
            <AddMember />

            <Members />

            <li className=" flex items-center py-4 px-6 justify-between">
              {" "}
              <SettingsText>Logout</SettingsText>
              <Logout />
            </li>
            {/* <p className="py-4 px-6">Remove a member</p>
        <p className="py-4 px-6">Logout</p> */}
          </ul>
        </motion.div>
      </div>
    </Modal>
  );
}

export default Settings;
