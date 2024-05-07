import { HiChevronUpDown } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "../auth/auth.hook";

function DashboardHeader() {
  const auth = useAuth();
  return (
    <header className="w-full px-10 py-4 flex justify-between item-center">
      <h3 className="text-2xl flex items-center">
        <span>Personal</span>
        <HiChevronUpDown />
      </h3>

      <div className="flex items-center gap-6">
        <Link to="/settings">Settings</Link>
        <Button
          variant="outline"
          colorScheme="danger"
          onClick={() => auth.logout()}
        >
          <IoIosLogOut size={20} />
        </Button>
      </div>
    </header>
  );
}

export default DashboardHeader;
