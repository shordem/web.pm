import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import toast from "react-hot-toast";
import { LiaTimesSolid as CloseIcon } from "react-icons/lia";

import { modalOverlayVariants, modalVariants } from "./modal.constant";
import { ModalProps } from "./modal.interface";

function Modal(props: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (props.setVisibility) {
      props.setVisibility();
    } else {
      toast.error("Function not implemented");
    }
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {props.visibility && (
        <motion.div
          className="fixed z-[100] w-full h-full left-0 top-0 py-4 px-3 md:px-6 bg-black/75 grid place-content-center"
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOutsideClick}
          ref={modalRef}
        >
          <motion.div
            className="shadow-lg w-fit mx-auto relative bg-[#121212] rounded-lg"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            {props.children}

            {!props.hideCloseButton && (
              <button
                className="absolute top-2 right-2 p-2 border-none text-dashboard-bg rounded-full"
                onClick={handleClose}
              >
                <CloseIcon size={32} />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
