import { HiChevronUpDown } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { SiAwsorganizations } from "react-icons/si";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import Modal from "@/components/ui/modal";
import useOutsideClick from "@/hooks/outside-click";
import { useRouter } from "@/router/router.hook";
import classNames from "classnames";
import { useState } from "react";
import { useAuth } from "../auth/auth.hook";
import { useDashboardContext } from "./dashboard-context";
import {
  useCreateOrganization,
  useGetAllMyOrganizations,
} from "./dashboard.hook";
import { getAllMyOrganizationsResponsePayload } from "./dashboard.interface";

function DashboardHeader() {
  //Router hook
  const auth = useAuth();
  const router = useRouter();

  // Context hook
  const {
    currentOrganisationDetails,
    setCurrentFolder,
    setCurrentOrganisationDetails,
  } = useDashboardContext();

  // Use state hook
  const [addVisibility, setAddVisibility] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [showOrganizations, setShowOrganizations] = useState(false);

  const allOrganizations = useGetAllMyOrganizations();
  const createOrganization = useCreateOrganization();

  // common hook

  const { ref } = useOutsideClick(() => {
    setShowOrganizations(false);
  });

  function handleOrganizationClick(org: getAllMyOrganizationsResponsePayload) {
    setCurrentOrganisationDetails(org);
    setCurrentFolder({ id: "", name: "" });
  }
  return (
    <>
      <Modal
        visibility={addVisibility}
        setVisibility={() => setAddVisibility(false)}
      >
        <div className="grid justify-center gap-4 p-12">
          <h4 className="text-2xl">Add new Organization</h4>
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
              createOrganization
                .mutateAsync({ name: organizationName })
                .then(() => {
                  setAddVisibility(false);
                });
            }}
          >
            <Input
              label="Organization Name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
            />
            <Button className="mt-4">Create Organization</Button>
          </form>
        </div>
      </Modal>
      <header className="w-full px-10 py-4 flex justify-between item-center relative">
        <h3 className="text-2xl flex items-center">
          <span>{currentOrganisationDetails?.name || "Personal"}</span>
          <Button
            variant="ghost"
            onClick={() => setShowOrganizations(!showOrganizations)}
          >
            {" "}
            <HiChevronUpDown />{" "}
          </Button>
        </h3>
        {showOrganizations && (
          <div
            className="absolute z-10 top-12  bg-bg-accent shadow-md px-2 py-4 rounded-md w-fit"
            ref={ref as React.RefObject<HTMLDivElement>}
          >
            <ul className="text-md flex flex-col gap-4">
              {allOrganizations.isLoading && <li>Loading...</li>}
              {allOrganizations.data?.data.map((org) => (
                <li
                  key={org.id}
                  className={classNames(
                    " text-warning p-2 hover:bg-gray-800  ",
                    {
                      "text-warning": currentOrganisationDetails.id === org.id,
                    }
                  )}
                  onClick={handleOrganizationClick.bind(null, org)}
                >
                  <Button
                    variant="ghost"
                    colorScheme="none"
                    iconPos="left"
                    className=" w-full rounded-lg items-center"
                    icon={<SiAwsorganizations />}
                  >
                    {" "}
                    {org.name}{" "}
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              isLoading={createOrganization.isPending}
              className="mt-4"
              onClick={() => setAddVisibility(true)}
            >
              Create New Organization
            </Button>
          </div>
        )}

        <div className="flex items-center gap-6">
          <Link
            to="/dashboard/settings"
            className={classNames("text-lg", {
              "text-primary": router.pathname === "/dashboard/settings",
            })}
          >
            Settings
          </Link>
          <Button
            variant="ghost"
            colorScheme="danger"
            onClick={() => auth.logout()}
          >
            <IoIosLogOut size={20} />
          </Button>
        </div>
      </header>
    </>
  );
}

export default DashboardHeader;
