import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useOutsideClick from "../hooks/outside-click";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ children, id }) {
  const { openId, close, open } = useContext(MenusContext);
  //   const [toggleCount, setToggleCount] = useState(0);

  //   useEffect(
  //     function () {
  //       console.log(toggleCount);
  //       if (toggleCount === 2) {
  //         setToggleCount(0);
  //         close();
  //       }
  //     },
  //     [toggleCount, close]
  //   );

  return cloneElement(children, {
    onClick: (e) => {
      e.stopPropagation();
      console.log("clicked");
      //   setToggleCount((c) => c + 1);
      openId === "" || openId !== id ? open(id) : close();
    },
  });
}

function List({ id, children }) {
  const { openId, close } = useContext(MenusContext);
  const { ref } = useOutsideClick(() => {
    console.log("Outside Click");
    close();
  });

  if (openId !== id) return null;

  return cloneElement(children, { ref });
}

function Button({ children, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }
  return cloneElement(children, { onClick: handleClick });
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
