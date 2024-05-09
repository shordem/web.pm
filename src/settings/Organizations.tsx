import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { useTodo } from "../TodoContext";
import {
  useCreateOrganization,
  useGetAllMyOrganizations,
} from "../featuresHook/useOrganization";
import Modal from "../ui/Modal";
import ShowList from "../ui/ShowList";
import OrganizationName from "./OrganizationName";

function Organizations() {
  const { setCurrentOrganisationDetails } = useTodo()!;
  const [organizationName, setOrganizationName] = useState("");
  const [open, setOpen] = useState(true);
  const { isGettingAllOrganizations, allOrganizations } =
    useGetAllMyOrganizations();
  const { isCreatingOrganization, createOrganization } =
    useCreateOrganization();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createOrganization(
      { name: organizationName },
      {
        onSuccess: () => {
          console.log("success");
          setOpen(false);
        },
      }
    );
  }

  useEffect(
    function () {
      setCurrentOrganisationDetails({
        currentOrganisationId: allOrganizations?.data[0].id || "",
        currentOrganizationName: allOrganizations?.data[0].name || "",
      });
    },
    [allOrganizations?.data, setCurrentOrganisationDetails]
  );
  return (
    <ShowList ListTitle={"Organizations"}>
      {isGettingAllOrganizations ? (
        <p>Loading ...</p>
      ) : (
        <>
          {" "}
          {allOrganizations?.data.map((organization) => (
            <OrganizationName
              key={organization.id}
              organization={organization}
            />
          ))}
          <Modal>
            <div className="flex justify-end">
              <Modal.Open opens={"addOrganization"}>
                <Button>Add Organization</Button>
              </Modal.Open>
            </div>
            {open && (
              <Modal.Window name={"addOrganization"}>
                <form onSubmit={handleSubmit} className=" w-80 ">
                  {isCreatingOrganization ? (
                    <LoaderIcon />
                  ) : (
                    <>
                      <h3 className="text-md font-semibold text-stone-800">
                        Organization Name
                      </h3>
                      <input
                        type="text"
                        className="w-full rounded-md outline-none focus:outline-none px-4 py-2 "
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                      />
                    </>
                  )}
                </form>
              </Modal.Window>
            )}
          </Modal>
        </>
      )}
    </ShowList>
  );
}

export default Organizations;

// import "./styles.css";
// import { useState } from "react";
// import { motion, Variants } from "framer-motion";

// const itemVariants: Variants = {
//   open: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 300, damping: 24 }
//   },
//   closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
// };

// export default function App() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <motion.nav
//       initial={false}
//       animate={isOpen ? "open" : "closed"}
//       className="menu"
//     >
//       <motion.button
//         whileTap={{ scale: 0.97 }}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         Menu
//         <motion.div
//           variants={{
//             open: { rotate: 180 },
//             closed: { rotate: 0 }
//           }}
//           transition={{ duration: 0.2 }}
//           style={{ originY: 0.55 }}
//         >
//           <svg width="15" height="15" viewBox="0 0 20 20">
//             <path d="M0 7 L 20 7 L 10 16" />
//           </svg>
//         </motion.div>
//       </motion.button>
//       <motion.ul
//         variants={{
//           open: {
//             clipPath: "inset(0% 0% 0% 0% round 10px)",
//             transition: {
//               type: "spring",
//               bounce: 0,
//               duration: 0.7,
//               delayChildren: 0.3,
//               staggerChildren: 0.05
//             }
//           },
//           closed: {
//             clipPath: "inset(10% 50% 90% 50% round 10px)",
//             transition: {
//               type: "spring",
//               bounce: 0,
//               duration: 0.3
//             }
//           }
//         }}
//         style={{ pointerEvents: isOpen ? "auto" : "none" }}
//       >
//         <motion.li variants={itemVariants}>Item 1 </motion.li>
//         <motion.li variants={itemVariants}>Item 2 </motion.li>
//         <motion.li variants={itemVariants}>Item 3 </motion.li>
//         <motion.li variants={itemVariants}>Item 4 </motion.li>
//         <motion.li variants={itemVariants}>Item 5 </motion.li>
//       </motion.ul>
//     </motion.nav>
//   );
// }
