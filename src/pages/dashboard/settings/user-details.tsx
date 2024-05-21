import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import { useUser } from "../dashboard.hook";
import Loader from "@/components/ui/loading";
import { Storage } from "@/utilities/storage";
import { useEffect, useState } from "react";

function UserDetails() {
  // const [clicked, setClicked] = useState(false);
  const storage = new Storage();
  const user = useUser();

  const userDetails = user.data?.data!;

  // Use state to manage dontShowAlert
  const [dontShowAlert, setDontShowAlert] = useState(
    storage.getItem("controlAlert")
  );

  // Update dontShowAlert when the value in storage changes
  useEffect(() => {
    setDontShowAlert(storage.getItem("controlAlert"));
  }, []);

  function handleChange() {
    if (dontShowAlert === "true") {
      storage.setItem("controlAlert", "false");
      setDontShowAlert("false"); // Update state
    }
    if (!dontShowAlert || dontShowAlert === "false") {
      storage.setItem("controlAlert", "true");
      setDontShowAlert("true"); // Update state
    }
  }
  return (
    <div className="w-full">
      <div>
        <h4 className="text-xl font-bold mb-4">User Details</h4>
        <>
          {user.isLoading ? (
            <Loader />
          ) : (
            <form className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={userDetails.first_name}
                disabled
              />
              <Input label="Last Name" value={userDetails.last_name} disabled />
              <div className="col-span-2">
                <Input label="Email" value={userDetails.email} disabled />
              </div>

              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />

              <div className="col-span-2">
                <Button colorScheme="info">Save</Button>
              </div>
            </form>
          )}
        </>
      </div>

      <div className="mt-4">
        <h4 className="text-xl font-bold mb-4">App settings</h4>
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="show-alert"
            className="w-4 h-4 cursor-pointer"
            onChange={handleChange}
            checked={dontShowAlert === "true" ? true : false}
          />
          <label htmlFor="show-alert" className="ml-2 pt-1">
            Show alert when you click outside the modal
          </label>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
