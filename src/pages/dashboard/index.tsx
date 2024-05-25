import { useState } from "react";

import { Button } from "@/components/ui/button";
import Notes from "./notes";
import Sidebar from "./sidebar";
import Todos from "./todos";

const DashboardPage = () => {
  const [tab, setTab] = useState("todos");

  return (
    <div className="w-full flex sm:flex-row flex-col items-start sm:px-20">
      <Sidebar />

      <section className="w-full sm:px-24 flex flex-col items-center justify-center">
        <div className="px-3 py-2 flex gap-2">
          <Button
            colorScheme="none"
            variant={tab === "todos" ? "solid" : "outline"}
            onClick={() => setTab("todos")}
          >
            Todos
          </Button>
          <Button
            colorScheme="none"
            variant={tab === "notes" ? "solid" : "outline"}
            onClick={() => setTab("notes")}
          >
            Notes
          </Button>
        </div>

        <div className="w-full h-[28rem] rounded-lg mt-5 px-6 overflow-y-scroll">
          {tab === "todos" ? <Todos /> : <Notes />}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
