import { useTodo } from "../TodoContext";
import { useGetOrganizationDetails } from "../featuresHook/useOrganization";
import useUser from "../featuresHook/useUser";
import { getMembersPayload } from "../services/organization/organization.interface";
import ButtonIcon from "../ui/ButtonIcon";
import DeleteIcon from "../components/icons/delete";

function MembersDetails({ member }: { member: getMembersPayload }) {
  const { first_name, last_name, role } = member;
  return (
    <li className="flex items-center justify-between">
      {" "}
      <div className="flex items-center gap-4">
        <p>{[last_name, first_name].join(" ")}</p>{" "}
        <span className="text-sm px-2 rounded-full bg-slate-200">{role}</span>
      </div>
      {role !== "owner" && isOwner && (
        <ButtonIcon>
          {" "}
          <DeleteIcon />{" "}
        </ButtonIcon>
      )}
    </li>
  );
}

export default MembersDetails;
