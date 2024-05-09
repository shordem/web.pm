import { useGetAllMyOrganizations } from "@/featuresHook/useOrganization";
import useLocalStorage from "@/hooks/useLocalStorage";
import { DashboardContext } from "@/pages/dashboard/dashboard-context";
import { useGetFolders } from "@/pages/dashboard/dashboard.hook";
import { currentOrgType } from "@/pages/dashboard/dashboard.interface";
import { useEffect } from "react";

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const allOrganizations = useGetAllMyOrganizations();
  const allFolders = useGetFolders(allOrganizations.data?.data[0]!.id!);

  // set current folder under current organisation
  const [currentOrganisationDetails, setCurrentOrganisationDetails] =
    useLocalStorage<currentOrgType>(
      { ...allOrganizations.data?.data[0]!, folder: allFolders.data?.data[0]! },
      "currentOrg"
    );
  useEffect(() => {
    setCurrentOrganisationDetails({
      ...allOrganizations.data?.data[0]!,
      folder: allFolders.data?.data[0]!,
    });
  }, [allOrganizations.data, allFolders.data, setCurrentOrganisationDetails]);
  if (allOrganizations.isPending || allFolders.isPending)
    return <div>Loading...</div>;
  return (
    <DashboardContext.Provider
      value={{
        currentOrganisationDetails,
        setCurrentOrganisationDetails,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
