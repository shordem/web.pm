import { useState } from "react";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import Modal from "@/components/ui/modal";
import { useVerifyEmail } from "./auth.hook";
import { VerifyEmailModalProps } from "./auth.interface";

function VerifyEmailModal(props: VerifyEmailModalProps) {
  const verifyEmail = useVerifyEmail();

  const [code, setCode] = useState("");
  return (
    <Modal visibility={props.isOpen} setVisibility={props.onClose}>
      <form
        className="w-96 bg-gray-200 px-10 py-8 gap-4 flex flex-col items-center rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
          verifyEmail.mutate({ email: props.email, code });
        }}
      >
        <h2 className="text-3xl font-semibold">Verify Your Email</h2>
        <p className="text-center text-gray-500">
          We have sent a 6 digits code to the email address&nbsp;
          <span className="font-semibold text-gray-800">{props.email}</span>
          &nbsp;Please enter the code to verify your email.
        </p>
        <Input
          label="6 digits code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button isLoading={verifyEmail.isLoading} className="px-20">
          Verify
        </Button>
      </form>
    </Modal>
  );
}

export default VerifyEmailModal;
