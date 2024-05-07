import { useState } from "react";

import { BiBookAdd } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import TextArea from "@/components/ui/form/textarea";
import Modal from "@/components/ui/modal";

function Notes() {
  const [createNoteVisibility, setCreateNoteVisibility] = useState(false);
  const [updateNoteVisibility, setUpdateNoteVisibility] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");

  return (
    <>
      <Modal
        visibility={createNoteVisibility}
        setVisibility={() => setCreateNoteVisibility(false)}
      >
        <div className="grid justify-center gap-4 p-12">
          <h4 className="text-2xl">Add new note</h4>
          <form className="w-96 flex flex-col items-center gap-4">
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
            <Button className="mt-4">Add note</Button>
          </form>
        </div>
      </Modal>

      <Modal
        visibility={updateNoteVisibility}
        setVisibility={() => setUpdateNoteVisibility(false)}
      >
        <div className="grid justify-center gap-4 p-12">
          <h4 className="text-2xl">Update Note</h4>
          <form className="w-96 flex flex-col items-center gap-4">
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
              <Button colorScheme="danger">Delete note</Button>
              <Button colorScheme="warning">Update note</Button>
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
        {[...new Array(8)].map(() => (
          <li
            onClick={() => {
              setUpdateNoteVisibility(true);
              setTitle("Lorem Ipsum");
              setBody(
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
              );
              setId("1");
            }}
            className="w-full text-ellipsis bg-[#222] flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer"
          >
            <CgNotes size={18} />
            <span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Notes;
