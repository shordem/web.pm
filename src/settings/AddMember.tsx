import { useState } from "react";
import { useTodo } from "../TodoContext";
import { useAddMember } from "../featuresHook/useOrganization";
import ButtonIcon from "../ui/ButtonIcon";
import Heading from "../ui/HeadingTag";
import Modal from "../ui/Modal";
import AddIcon from "../ui/icons/add";

function AddMember() {
  const { darkMode, currentOrganisationDetails } = useTodo()!;
  const [userEmail, setUserEmail] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);
  const { isAddingMember, addMember } = useAddMember();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addMember(
      {
        orgId: currentOrganisationDetails.currentOrganisationId,
        email: userEmail,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  }
  return (
    <li className=" flex items-center py-4 px-6 justify-between">
      {" "}
      <p className={!darkMode ? "text-[#484b6a]" : "text-[#e4e5f1]"}>
        Add a member to this project
      </p>{" "}
      <Modal.Open opens={"addMember"}>
        <ButtonIcon>
          {" "}
          <AddIcon />
        </ButtonIcon>
      </Modal.Open>
      {open && (
        <Modal.Window name={"addMember"}>
          <form onSubmit={handleSubmit} className="w-80 flex flex-col gap-1">
            <h3 className="text-md font-semibold text-stone-800">
              Add Member Email
            </h3>

            <input
              type="mail"
              id="email"
              className="py-2 px-4 rounded-lg border-grey-100 focus:outline-none "
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              disabled={isAddingMember}
              required
            />

            {/* <select
            className="focus:outline-none w-full p-2 mt-6"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value={"user"}>SET AS USER</option>
            <option value={"admin"}>SET AS ADMIN</option>
          </select> */}
          </form>
        </Modal.Window>
      )}
    </li>
  );
}

export default AddMember;
