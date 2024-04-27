import ShowList from "../ui/ShowList";
import MembersDetails from "./MembersDetails";

function Members() {
  return (
    <ShowList ListTitle={"Members"}>
      <MembersDetails name="Oluwatobi Ojo" role="Admin" />
      <MembersDetails name="Olakotan Daniel" />
      <MembersDetails />
    </ShowList>
  );
}

export default Members;
