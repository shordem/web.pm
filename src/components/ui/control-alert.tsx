import { Storage } from "@/utilities/storage";
import { useState } from "react";
import { Button } from "./button";

function ControlAlert() {
  const storage = new Storage();
  const [isOpen, setIsOpen] = useState(true);

  const isAlert = storage.getItem("controlAlert");

  return (
    !isAlert &&
    isOpen && (
      <div className="absolute bottom-3 left-4 bg-bg-accent p-4 rounded-lg z-20">
        <p className="text-white">
          Stop Alert Message and automatically close when you click outside the
          modal
        </p>
        <div className="flex justify-end mt-4">
          <Button
            colorScheme="gray"
            onClick={() => {
              storage.setItem("controlAlert", "false");
              setIsOpen(false);
            }}
          >
            No
          </Button>
          <Button
            colorScheme="warning"
            className="ml-2"
            onClick={() => {
              storage.setItem("controlAlert", "true");
              setIsOpen(false);
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    )
  );
}

export default ControlAlert;
