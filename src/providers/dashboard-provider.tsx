import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loading";
import Modal from "@/components/ui/modal";
import { DashboardContext } from "@/pages/dashboard/dashboard-context";
import {
  useGetFolders as getFoldersquery,
  useGetAllMyOrganizations,
} from "@/pages/dashboard/dashboard.hook";
import {
  ErrorResponse,
  Identifier,
} from "@/pages/dashboard/dashboard.interface";
import { Storage } from "@/utilities/storage";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storage = useMemo(() => {
    return new Storage();
  }, []);
  const [currentFolder, setCurrentFolder] = useState<Identifier>({
    id: "",
    name: "",
  });
  const [currentOrganisationDetails, setCurrentOrganisationDetails] =
    useState<Identifier>({ id: "", name: "" });
  const [errorVisibility, setErrorVisibility] = useState(true);

  const allOrganizations = useGetAllMyOrganizations();

  const getFolders = useCallback(
    () => getFoldersquery(currentOrganisationDetails.id),
    [currentOrganisationDetails.id]
  )();

  const updateStorage = useCallback(
    (idKey: string, idValue: string, nameKey: string, nameValue: string) => {
      storage.setItem(idKey, idValue);
      storage.setItem(nameKey, nameValue);
    },
    [storage]
  );
  const resetCurrentFolder = () => {
    setCurrentFolder({ id: "", name: "" });
    storage.deleteItem("currentFolderId");
    storage.deleteItem("currentFolderName");
  };

  const updateBothStorageAndStateOrg = useCallback(
    (org: Identifier) => {
      setCurrentOrganisationDetails(org);
      updateStorage("currentOrgId", org.id, "currentOrgName", org.name);
    },
    [setCurrentOrganisationDetails, updateStorage]
  );
  const updateBothStorageAndStateFolder = useCallback(
    (folder: Identifier) => {
      setCurrentFolder(folder);
      updateStorage(
        "currentFolderId",
        folder.id,
        "currentFolderName",
        folder.name
      );
    },
    [setCurrentFolder, updateStorage]
  );
  function handleOrgClick(org: Identifier) {
    updateBothStorageAndStateOrg(org);
    resetCurrentFolder();
  }
  function handleFolderClick(folder: Identifier) {
    updateBothStorageAndStateFolder(folder);
  }

  useEffect(() => {
    const getCurrentFolder = storage.getItem("currentFolderId");
    const getCurrentOrgId = storage.getItem("currentOrgId");
    if (getCurrentOrgId) {
      setCurrentOrganisationDetails({
        id: getCurrentOrgId as string,
        name: storage.getItem("currentOrgName") as string,
      });
    } else {
      if (allOrganizations.isFetched) {
        updateBothStorageAndStateOrg({
          id: allOrganizations.data?.data[0]!.id!,
          name: allOrganizations.data?.data[0]!.name!,
        });
      }
    }
    if (getCurrentFolder) {
      setCurrentFolder({
        id: storage.getItem("currentFolderId") as string,
        name: storage.getItem("currentFolderName") as string,
      });
    } else {
      if (getFolders.isFetched) {
        updateBothStorageAndStateFolder({
          id: getFolders.data?.data[0]!.id!,
          name: getFolders.data?.data[0]!.name!,
        });
      }
    }
  }, [
    allOrganizations.data?.data,
    allOrganizations.isFetched,
    getFolders.data?.data,
    getFolders.isFetched,
    storage,
    updateBothStorageAndStateFolder,
    updateBothStorageAndStateOrg,
  ]);

  if (allOrganizations.isPending || getFolders.isPending)
    return (
      <div className=" h-screen">
        {" "}
        <Loader />{" "}
      </div>
    );

  if (
    (getFolders.error as unknown as ErrorResponse)?.response?.data.detail ===
    "404: User is not a member of the organization"
  ) {
    return (
      <Modal
        visibility={errorVisibility}
        setVisibility={() => setErrorVisibility(false)}
      >
        <div className="grid justify-center gap-4 p-12">
          <h4 className="text-2xl">Ooops!</h4>
          <p className="text-center text-info">
            You are no longer a member {currentOrganisationDetails.name}, please
            contact the organization admin.
          </p>
          <div className="grid justify-end">
            <Button
              onClick={() => {
                setErrorVisibility(false);
                updateBothStorageAndStateOrg({
                  id: allOrganizations.data?.data[0]!.id!,
                  name: allOrganizations.data?.data[0]!.name!,
                });
                resetCurrentFolder();
              }}
            >
              Return Home
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <DashboardContext.Provider
      value={{
        currentFolder,
        setCurrentFolder: handleFolderClick,
        currentOrganisationDetails,
        setCurrentOrganisationDetails: handleOrgClick,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
