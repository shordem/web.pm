import { useState } from "react";

import { BiBookAdd } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import TextArea from "@/components/ui/form/textarea";
import Modal from "@/components/ui/modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "./dashboard-context";
import {
  useCreateNote,
  useDeleteNote,
  useGetNotes,
  useUpdateNote,
} from "./dashboard.hook";

function Notes() {
  // Context hook
  const { currentOrganisationDetails, currentFolder } = useDashboardContext();

  const [createNoteVisibility, setCreateNoteVisibility] = useState(false);
  const [updateNoteVisibility, setUpdateNoteVisibility] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [noteId, setNoteId] = useState("");

  // notes hooks

  const notes = useGetNotes(
    currentOrganisationDetails.id || "",
    currentFolder.id
  );

  const createNote = useCreateNote(
    currentOrganisationDetails.id || "",
    currentFolder.id
  );

  const updateNote = useUpdateNote(currentOrganisationDetails.id || "", noteId);
  const deleteNote = useDeleteNote(currentOrganisationDetails.id);

  return (
    <>
      <Modal
        visibility={createNoteVisibility}
        setVisibility={() => setCreateNoteVisibility(false)}
      >
        <div className="grid justify-center gap-4 sm:p-12 p-6">
          <h4 className="text-2xl">Add new note</h4>
          <form
            className="sm:w-96 w-64 flex flex-col items-center gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!title || !body)
                return toast.error("All fields are required");
              createNote
                .mutateAsync({
                  title,
                  content: body,
                })
                .then(() => {
                  setCreateNoteVisibility(false);
                });
            }}
          >
            <Input
              label="Title"
              className="w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              label="Body"
              className="w-full"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <Button className="mt-4" isLoading={createNote.isPending}>
              Add note
            </Button>
          </form>
        </div>
      </Modal>

      <Modal
        visibility={updateNoteVisibility}
        setVisibility={() => setUpdateNoteVisibility(false)}
      >
        <div className="grid justify-center gap-4 sm:p-12 p-6">
          <h4 className="text-2xl">Update Note</h4>
          <form className="sm:w-96 w-64 flex flex-col items-center gap-4">
            <Input
              label="Title"
              className="w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              label="Body"
              className="w-full"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <div className="flex gap-4">
              <Button
                colorScheme="danger"
                onClick={(e) => {
                  e.preventDefault();
                  deleteNote.mutateAsync(noteId).then(() => {
                    setUpdateNoteVisibility(false);
                  });
                }}
                size="sm"
                isLoading={deleteNote.isPending}
              >
                Delete note
              </Button>
              <Button
                colorScheme="warning"
                onClick={(e) => {
                  e.preventDefault();
                  if (!title || !body)
                    return toast.error("All fields are required");
                  updateNote
                    .mutateAsync({
                      title,
                      content: body,
                    })
                    .then(() => {
                      setUpdateNoteVisibility(false);
                    });
                }}
                size="sm"
                isLoading={updateNote.isPending}
              >
                Update note
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <ul className="w-full h-full flex flex-col items-center gap-4 py-6">
        <li
          onClick={() => {
            setTitle("");
            setBody("");
            setCreateNoteVisibility(true);
          }}
          className="w-full text-ellipsis bg-[#222] flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer"
        >
          <BiBookAdd size={20} />
          <span className="text-gray-400">Add new note</span>
        </li>{" "}
        {notes.data?.data.length === 0 && (
          <li className="w-full text-ellipsis bg-[#222] flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer">
            No note available
          </li>
        )}
        {notes.data?.data.map((note) => (
          <li
            onClick={() => {
              setUpdateNoteVisibility(true);
              setTitle(note.title);
              setBody(note.content);
              setNoteId(note.id);
            }}
            className="w-full text-ellipsis bg-[#222] flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer"
            key={note.id}
          >
            <CgNotes size={18} />
            <span>
              <span className=" font-bold"> {note.title} </span> -{" "}
              <span className=" italic"> {note.content} </span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Notes;
