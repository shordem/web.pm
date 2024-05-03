import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ButtonIcon from "../ui/ButtonIcon";
import { ArrowUp } from "../ui/icons/arrow";
import SettingsText from "../settings/SettingsText";

const ulVariant = {
  hidden: { opacity: 0, x: "50px", transition: { type: "tween" } },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "tween", when: "beforeChildren" },
  },
};

function ShowList({
  ListTitle,
  children,
}: {
  ListTitle: string;
  children: any;
}) {
  const [showList, setShowList] = useState(false);

  function handleShowList() {
    setShowList((sh) => !sh);
  }

  // variants={{
  //   open: { rotate: 180 },
  //   closed: { rotate: 0 }
  // }}
  // transition={{ duration: 0.2 }}
  // style={{ originY: 0.55 }}

  return (
    <motion.li
      initial={false}
      animate={showList ? "open" : "closed"}
      className="py-4 px-6 "
      //   layout
      //   transition={{
      //     opacity: { ease: "linear" },
      //     layout: { duration: 0.3 },
      //   }}
    >
      {" "}
      <motion.div
        transition={{ duration: 0.2, type: "tween" }}
        className=" flex items-center justify-between "
      >
        <SettingsText>{ListTitle}</SettingsText>{" "}
        <ButtonIcon onClick={handleShowList}>
          {" "}
          {
            <motion.div
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.2 }}
              style={{ originY: 0.55 }}
            >
              {" "}
              <ArrowUp />{" "}
            </motion.div>
          }
        </ButtonIcon>
      </motion.div>
      <AnimatePresence>
        {showList && (
          <motion.ul
            initial={"hidden"}
            animate={"visible"}
            variants={ulVariant}
            exit={"hidden"}
            className="flex flex-col gap-2 pt-4"
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default ShowList;
