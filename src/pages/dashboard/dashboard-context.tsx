import { createContext, useContext } from "react";
import { DashboardContextType } from "./dashboard.interface";

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
}
