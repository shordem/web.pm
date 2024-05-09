import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import {
  useAddMember,
  useGetOrganizationMembers,
  useRemoveMember,
} from "../dashboard.hook";
import { useDashboardContext } from "../dashboard-context";
import { FormEvent, useState } from "react";
import Modal from "@/components/ui/modal";

function OrganizationSettings() {
  const { currentOrganisationDetails } = useDashboardContext();

  const members = useGetOrganizationMembers(currentOrganisationDetails.id);
  const addMember = useAddMember(currentOrganisationDetails.id);
  const removeMember = useRemoveMember();

  const [newUserEmail, setNewUserEmail] = useState("");

  const [deleteVisibility, setDeleteVisibility] = useState(false);
  const [removeMemberDetails, setRemoveMemberDetails] = useState({
    memberName: "",
    memberId: "",
  });
  return (
    <>
      <Modal
        visibility={deleteVisibility}
        setVisibility={() => setDeleteVisibility(false)}
        hideCloseButton
      >
        <div className="grid justify-center text-center gap-4 p-12">
          <h5 className="text-lg font-semibold">
            Are you sure you want to remove{" "}
            <span className="font-bold">{removeMemberDetails.memberName}</span>
            &nbsp;
          </h5>
          <p className="text-sm text-danger">
            Note: He will not be part of this project unless added again
          </p>
          <div className="flex justify-center gap-6">
            <Button
              colorScheme="info"
              className="mt-4"
              onClick={() => setDeleteVisibility(false)}
            >
              Cancel
            </Button>
            <Button
              colorScheme="danger"
              className="mt-4"
              isLoading={removeMember.isPending}
              onClick={() => {
                removeMember
                  .mutateAsync({
                    orgId: currentOrganisationDetails.id,
                    memberId: removeMemberDetails.memberId,
                  })
                  .then(() => {
                    setDeleteVisibility(false);
                  });
              }}
            >
              Remove {removeMemberDetails.memberName}
            </Button>
          </div>
        </div>
      </Modal>
      <div className="w-full">
        <form className="flex gap-6 py-4 items-end">
          <Input label="Organization Name" />
          <Button colorScheme="info">Save</Button>
        </form>

        <div className="w-full">
          <h4>Organization Members</h4>

          <form
            className="flex gap-6 py-4 w-full items-end"
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              addMember.mutate({ email: newUserEmail });
              setNewUserEmail("");
            }}
          >
            <Input
              label="User Email"
              className="w-4/6"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
            <Button className="w-fit" isLoading={addMember.isPending}>
              Add Member
            </Button>
          </form>

          <ul className="my-6 space-y-4">
            {members.isLoading && <p>Getting members...</p>}
            {members.data?.data.map((member) => (
              <li className="flex justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={`https://ui-avatars.com/api/?name=${member.first_name}+${member.last_name}}&background=random&rounded=true`}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span>{`${member.first_name} ${member.last_name}`}</span>
                    <span className=" text-sm text-gray-600">
                      {member.email}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  colorScheme="danger"
                  onClick={() => {
                    setDeleteVisibility(true);
                    setRemoveMemberDetails({
                      memberName: `${member.first_name} ${member.last_name}`,
                      memberId: member.id,
                    });
                  }}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default OrganizationSettings;
