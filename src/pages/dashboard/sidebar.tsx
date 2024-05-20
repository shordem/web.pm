import classNames from "classnames";
import { FormEvent, useEffect, useState } from "react";

import { FiFolderPlus } from "react-icons/fi";
import { MdDelete, MdEdit, MdFolder, MdOutlineFolder } from "react-icons/md";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import Loader from "@/components/ui/loading";
import Modal from "@/components/ui/modal";
import { useDashboardContext } from "./dashboard-context";
import {
  useCreateFolder,
  useDeleteFolder,
  useGetFolders,
  useUpdateFolder,
} from "./dashboard.hook";

function Sidebar() {
  const { currentFolder, setCurrentFolder, currentOrganisationDetails } =
    useDashboardContext();

  // Folder hooks
  const folders = useGetFolders(currentOrganisationDetails.id);
  const createFolder = useCreateFolder(currentOrganisationDetails.id);
  const updateFolder = useUpdateFolder(currentOrganisationDetails.id);
  const deleteFolder = useDeleteFolder(currentOrganisationDetails.id);

  useEffect(() => {
    if (currentFolder.id === "") {
      setCurrentFolder({
        id: folders.data?.data[0]!.id!,
        name: folders.data?.data[0]!.name!,
      });
    }
  }, [currentFolder, folders.data?.data, setCurrentFolder]);

  // Use state hook
  const [hoveredItem, setHoveredItem] = useState<null | number>(null);
  const [folderName, setFolderName] = useState("");
  const [id, setId] = useState("");
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
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
              updateFolder
                .mutateAsync({
                  name: folderName,
                  folderId: id,
                })
                .then(() => {
                  setEditVisibility(false);
                });
            }}
          >
            <Input
              label="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <Button
              isLoading={updateFolder.isPending}
              colorScheme="warning"
              className="mt-4"
            >
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
            <Button
              colorScheme="danger"
              className="mt-4"
              isLoading={deleteFolder.isPending}
              onClick={() => {
                deleteFolder.mutateAsync(id).then(() => {
                  setDeleteVisibility(false);
                });
              }}
            >
              Delete Folder
            </Button>
          </div>
        </div>
      </Modal>

      {/* create folder modal */}
      <Modal visibility={visibility} setVisibility={() => setVisibility(false)}>
        <div className="grid justify-center gap-4 p-12">
          <h4 className="text-2xl">Add New Folder</h4>
          <form
            className="flex flex-col items-center"
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              const target = e.target as HTMLFormElement;
              const folderName = (target[0] as HTMLInputElement).value;
              console.log(folderName);
              createFolder.mutateAsync({ name: folderName }).then(() => {
                setVisibility(false);
              });
            }}
          >
            <Input label="Folder Name" />
            <Button isLoading={createFolder.isPending} className="mt-4">
              Create Folder
            </Button>
          </form>
        </div>
      </Modal>

      {/* folder list */}
      <aside className="w-1/5 px-4 mt-16">
        {}
        <ul className="grid gap-4">
          {folders.isPending && <Loader />}
          {folders.data?.data.map((item, i) => (
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
                      setId(item.id!);
                    }}
                  >
                    <MdEdit size={20} />
                  </Button>
                  {!item.is_default && (
                    <Button
                      variant="ghost"
                      colorScheme="danger"
                      onClick={() => {
                        setDeleteVisibility(true);
                        setFolderName(item.name);
                        setId(item.id!);
                      }}
                    >
                      <MdDelete size={20} />
                    </Button>
                  )}
                </div>
              )}
              <Button
                colorScheme="none"
                // If currentFolderNotPartOfCurrentOrganization set the first folder as current, else set based on currentFolder.name === item.name ? "solid" : "outline"
                // prettier-ignore
                variant={  currentFolder.id === item.id ? "solid" : "outline"}
                // prettier-ignore
                icon={  currentFolder.id === item.id ?  <MdFolder size={20} /> :   <MdOutlineFolder size={20} />}
                iconPos="right"
                className={classNames("w-full justify-between z-[1]", {
                  "!text-primary": item.is_default,
                })}
                onClick={() =>
                  setCurrentFolder({ id: item.id!, name: item.name })
                }
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
