import Loader from "@/components/ui/loading";
import { DashboardContext } from "@/pages/dashboard/dashboard-context";
import {
  useGetFolders as getFoldersquery,
  useGetAllMyOrganizations,
} from "@/pages/dashboard/dashboard.hook";
import { Identifier } from "@/pages/dashboard/dashboard.interface";
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
