import { useTodo } from "../TodoContext";
import Heading from "../ui/HeadingTag";
import Logout from "../ui/Logout";
import Modal from "../ui/Modal";
import AddMember from "./AddMember";
import Members from "./Members";
import Organizations from "./Organizations";
import SettingsText from "./SettingsText";

function Settings() {
  const { darkMode } = useTodo();

  return (
    <Modal>
      <div className="mt-16 w-9/12 mx-auto ">
        <Heading as="h4">Settings</Heading>
        <ul
          className={`${
            darkMode ? "bg-[#25273c] divide-[#4d5066]" : "bg-white"
          } divide-y rounded-lg `}
        >
          <Organizations />
          <AddMember />

          <Members />

          <li className=" flex items-center py-4 px-6 justify-between">
            {" "}
            <SettingsText>Logout</SettingsText>
            <Logout />
          </li>
          {/* <p className="py-4 px-6">Remove a member</p>
        <p className="py-4 px-6">Logout</p> */}
        </ul>
      </div>
    </Modal>
  );
}

export default Settings;
