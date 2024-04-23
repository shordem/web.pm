import { IoIosSwitch } from "react-icons/io";
import Menus from "../ui/Menu";
import DeleteIcon from "../ui/icons/delete";
import EditIcon from "../ui/icons/edit";
import MoreIcon from "../ui/icons/more";
import ButtonIcon from "../ui/ButtonIcon";
import { useState } from "react";

function OrganizationName({ name }) {
  const [editText, setEditText] = useState(false);
  const [text, setText] = useState(name);
  function handleOnChange(e) {
    setText(e.target.value);
  }
  return (
    <li className="flex items-center justify-between relative">
      {" "}
      {editText ? (
        <input
          type="text"
          value={text}
          onChange={handleOnChange}
          onBlur={() => setEditText(false)}
          autoFocus={editText}
        />
      ) : (
        <p>{name}</p>
      )}{" "}
      <div className="relative">
        <Menus>
          <Menus.Toggle id={name}>
            <ButtonIcon>
              <MoreIcon />
            </ButtonIcon>
          </Menus.Toggle>
          <Menus.List id={name}>
            <div className="flex flex-col w-fit bg-stone-100 justify-between absolute top-2 right-6 rounded-md shadow-md z-10">
              <Menus.Button>
                <button className=" cursor-pointer flex p-1 gap-4 items-center justify-between hover:bg-gray-400">
                  {" "}
                  <span className="mt-1"> Switch </span> <IoIosSwitch />{" "}
                </button>
              </Menus.Button>
              <Menus.Button onClick={() => setEditText(true)}>
                <button
                  className={
                    " cursor-pointer flex p-1 gap-4 items-center justify-between hover:bg-gray-400"
                  }
                >
                  {" "}
                  <span className="mt-1"> Edit </span> <EditIcon />{" "}
                </button>
              </Menus.Button>
              <Menus.Button>
                <button
                  className={
                    " cursor-pointer flex p-1 gap-4 items-center justify-between hover:bg-gray-400"
                  }
                >
                  {" "}
                  <span className="mt-1"> Delete </span>
                  <DeleteIcon />{" "}
                </button>
              </Menus.Button>
            </div>
          </Menus.List>
        </Menus>
      </div>
    </li>
  );
}

export default OrganizationName;
