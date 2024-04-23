import { useState } from "react";
import { useTodo } from "../TodoContext";
import { ArrowDown, ArrowUp } from "../ui/icons/arrow";
import MembersDetails from "./MembersDetails";
import SettingsText from "./SettingsText";
import ButtonIcon from "../ui/ButtonIcon";

function Members() {
  const [showMember, setShowMember] = useState(true);
  function handleShowMember() {
    setShowMember((sh) => !sh);
  }
  return (
    <li className="py-4 px-6 ">
      {" "}
      <div className=" flex items-center justify-between ">
        <SettingsText>See all members</SettingsText>{" "}
        <ButtonIcon onClick={handleShowMember}>
          {" "}
          {showMember ? (
            <span>
              {" "}
              <ArrowDown />{" "}
            </span>
          ) : (
            <span>
              {" "}
              <ArrowUp />{" "}
            </span>
          )}
        </ButtonIcon>
      </div>
      {showMember && (
        <ul className="flex flex-col gap-2 py-4">
          <MembersDetails name="Oluwatobi Ojo" role="Admin" />
          <MembersDetails name="Olakotan Daniel" />
          <MembersDetails />
        </ul>
      )}
    </li>
  );
}

export default Members;
