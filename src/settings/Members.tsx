import { useTodo } from "../TodoContext";
import {
  useGetOrganizationDetails,
  useGetOrganizationMembers,
} from "../featuresHook/useOrganization";
import useUser from "../featuresHook/useUser";
import ShowList from "../ui/ShowList";
import MembersDetails from "./MembersDetails";

function Members() {
  const { currentOrganisationDetails } = useTodo()!;
  const { isGettingMembers, members } = useGetOrganizationMembers(
    currentOrganisationDetails.currentOrganisationId
  );
  const {
    organization: { owner_id },
  } = useGetOrganizationDetails(
    currentOrganisationDetails.currentOrganisationId
  )! as { organization: { owner_id: string } };
  const { user } = useUser();
  const { id: userId } = user!;
  const isOwner = userId === owner_id;
  console.log(members?.data);
  return (
    <ShowList ListTitle={"Members"}>
      {isGettingMembers ? (
        <p>Loading ...</p>
      ) : members?.data.length === 0 ? (
        <p>No members</p>
      ) : (
        members?.data.map((member) => (
          <MembersDetails key={member.id} member={member} />
        ))
      )}
    </ShowList>
  );
}

export default Members;
