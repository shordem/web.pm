import ButtonIcon from "../ui/ButtonIcon";
import DeleteIcon from "../ui/icons/delete";

function MembersDetails({ name = "John Doe", role = "user" }) {
  return (
    <li className="flex items-center justify-between">
      {" "}
      <div className="flex items-center gap-4">
        <p>{name}</p>{" "}
        <span className="text-sm px-2 rounded-full bg-slate-200">{role}</span>
      </div>
      <ButtonIcon>
        {" "}
        <DeleteIcon />{" "}
      </ButtonIcon>
    </li>
  );
}

export default MembersDetails;
