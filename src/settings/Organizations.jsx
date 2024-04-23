import { useState } from "react";
import { ArrowDown, ArrowUp } from "../ui/icons/arrow";
import OrganizationName from "./OrganizationName";
import SettingsText from "./SettingsText";
import ButtonIcon from "../ui/ButtonIcon";

function Organizations() {
  const [showOrganization, setShowOrganization] = useState(false);

  function handleShowOrganization() {
    setShowOrganization((sh) => !sh);
  }

  return (
    <li className="py-4 px-6 ">
      {" "}
      <div className=" flex items-center justify-between ">
        <SettingsText>Organization</SettingsText>{" "}
        <ButtonIcon onClick={handleShowOrganization}>
          {" "}
          {showOrganization ? (
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
      {showOrganization && (
        <ul className="flex flex-col gap-2 py-4">
          <OrganizationName name={"Organization 1"} />
          <OrganizationName name={"Organization 2"} />
          <OrganizationName name={"Organization 3"} />
        </ul>
      )}
    </li>
  );
}

export default Organizations;
