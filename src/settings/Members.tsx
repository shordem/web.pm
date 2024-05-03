import { useTodo } from "../TodoContext";
import { useGetOrganizationMembers } from "../featuresHook/useOrganization";
import ShowList from "../ui/ShowList";
import MembersDetails from "./MembersDetails";

function Members() {
  const { currentOrganisationDetails } = useTodo()!;
  const { isGettingMembers, members } = useGetOrganizationMembers(
    currentOrganisationDetails.currentOrganisationId
  );
  console.log(members?.data);
  return (
    <ShowList ListTitle={"Members"}>
      {isGettingMembers ? (
        <p>Loading ...</p>
      ) : members?.data.length === 0 ? (
        <p>No members</p>
      ) : (
        members?.data.map((member) => (
          <MembersDetails
            key={member.id}
            name={member.name}
            role={member.role}
          />
        ))
      )}
    </ShowList>
  );
}

export default Members;
