import { IoIosSwitch } from "react-icons/io";
import Menus from "../ui/Menu";
import DeleteIcon from "../components/icons/delete";
import EditIcon from "../components/icons/edit";
import MoreIcon from "../components/icons/more";
import ButtonIcon from "../ui/ButtonIcon";
import { useState } from "react";
import { motion } from "framer-motion";
import { OrganizationDetails } from "../services/organization/organization.interface";
import { useTodo } from "../TodoContext";

function OrganizationName({
  organization,
}: {
  organization: OrganizationDetails;
}) {
  const { setCurrentOrganisationDetails } = useTodo()!;
  const [editText, setEditText] = useState(false);
  const [text, setText] = useState(organization.name);
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }
  function toggleCurrentOrganization() {
    setCurrentOrganisationDetails({
      currentOrganisationId: organization.id,
      currentOrganizationName: organization.name,
    });
    console.log("clicked");
  }
  return (
    <motion.li className="flex items-center justify-between relative">
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
        <p>{organization.name}</p>
      )}{" "}
      <div className="relative">
        <Menus>
          <Menus.Toggle id={organization.name}>
            <ButtonIcon>
              <MoreIcon />
            </ButtonIcon>
          </Menus.Toggle>
          <Menus.List id={organization.name}>
            <div className="flex flex-col w-fit bg-purple-50 justify-between absolute top-2 right-6 rounded-md shadow-md z-10 overflow-hidden">
              <Menus.Button onClick={toggleCurrentOrganization}>
                <button className=" cursor-pointer flex p-1 gap-4 items-center justify-between hover:bg-purple-100">
                  {" "}
                  <span className="mt-1"> Switch </span> <IoIosSwitch />{" "}
                </button>
              </Menus.Button>
              <Menus.Button onClick={() => setEditText(true)}>
                <button
                  className={
                    " cursor-pointer flex p-1 gap-4 items-center justify-between hover:bg-purple-100"
                  }
                >
                  {" "}
                  <span className="mt-1"> Edit </span> <EditIcon />{" "}
                </button>
              </Menus.Button>
              <Menus.Button>
                <button
                  className={
                    " cursor-pointer flex p-1 gap-4 items-center justify-between hover:bg-purple-100"
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
    </motion.li>
  );
}

export default OrganizationName;
