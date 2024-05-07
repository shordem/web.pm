import classNames from "classnames";
import { useState } from "react";

import { FiFolderPlus } from "react-icons/fi";
import { MdDelete, MdEdit, MdFolder, MdOutlineFolder } from "react-icons/md";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import Modal from "@/components/ui/modal";

function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<null | number>(null);
  const [selected, setSelected] = useState("All");
  const [folderName, setFolderName] = useState("");
  const [id, setId] = useState(0);
  const [visibility, setVisibility] = useState(false);
  const [editVisibility, setEditVisibility] = useState(false);
  const [deleteVisibility, setDeleteVisibility] = useState(false);

  return (
    <>
      {/* update folder modal */}
      <Modal
        visibility={editVisibility}
        setVisibility={() => setEditVisibility(false)}
      >
        <div className="grid justify-center gap-4 p-12">
          <h4 className="text-2xl">Update Folder</h4>
          <form className="flex flex-col items-center">
            <Input
              label="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <Button colorScheme="warning" className="mt-4">
              Update Folder
            </Button>
          </form>
        </div>
      </Modal>

      {/* delete folder modal */}
      <Modal
        visibility={deleteVisibility}
        setVisibility={() => setDeleteVisibility(false)}
        hideCloseButton
      >
        <div className="grid justify-center text-center gap-4 p-12">
          <h5 className="text-lg font-semibold">
            Are you sure you want to delete{" "}
            <span className="font-bold">{folderName}</span>&nbsp; folder?
          </h5>
          <p className="text-sm text-danger">
            Note: All Todos and Notes will be moved to the default folder
          </p>
          <div className="flex justify-center gap-6">
            <Button
              colorScheme="info"
              className="mt-4"
              onClick={() => setDeleteVisibility(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="danger" className="mt-4">
              Delete Folder
            </Button>
          </div>
        </div>
      </Modal>

      {/* create folder modal */}
      <Modal visibility={visibility} setVisibility={() => setVisibility(false)}>
        <div className="grid justify-center gap-4 p-12">
          <h4 className="text-2xl">Add New Folder</h4>
          <form className="flex flex-col items-center">
            <Input label="Folder Name" />
            <Button className="mt-4">Create Folder</Button>
          </form>
        </div>
      </Modal>

      {/* folder list */}
      <aside className="w-1/5 px-4 mt-16">
        <ul className="grid gap-4">
          {[
            { name: "All", isDefault: true },
            { name: "Project", isDefault: false },
            { name: "Work", isDefault: false },
            { name: "Personal", isDefault: false },
          ].map((item, i) => (
            // folder list item
            <li
              key={i}
              className="relative flex items-center"
              onMouseEnter={() => setHoveredItem(i)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {hoveredItem === i && (
                <div className="absolute -right-14 flex items-center justify-end gap-2 w-full h-full">
                  <Button
                    variant="ghost"
                    colorScheme="warning"
                    onClick={() => {
                      setEditVisibility(true);
                      setFolderName(item.name);
                    }}
                  >
                    <MdEdit size={20} />
                  </Button>
                  {!item.isDefault && (
                    <Button
                      variant="ghost"
                      colorScheme="danger"
                      onClick={() => {
                        setDeleteVisibility(true);
                        setFolderName(item.name);
                        setId(i);
                      }}
                    >
                      <MdDelete size={20} />
                    </Button>
                  )}
                </div>
              )}
              <Button
                colorScheme="none"
                variant={selected == item.name ? "solid" : "outline"}
                icon={
                  selected == item.name ? (
                    <MdFolder size={20} />
                  ) : (
                    <MdOutlineFolder size={20} />
                  )
                }
                iconPos="right"
                className={classNames("w-full justify-between z-[1]", {
                  "!text-primary": item.isDefault,
                })}
                onClick={() => setSelected(item.name)}
              >
                {item.name}
              </Button>
            </li>
          ))}

          {/* new folder button */}
          <li className="relative flex items-center">
            <Button
              colorScheme="none"
              variant="outline"
              icon={<FiFolderPlus size={20} />}
              iconPos="right"
              className="w-full justify-between"
              onClick={() => setVisibility(true)}
            >
              New Folder
            </Button>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
