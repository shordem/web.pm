import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";

function UserDetails() {
  return (
    <div className="w-full">
      <h4 className="text-xl font-bold mb-4">User Details</h4>

      <form className="grid grid-cols-2 gap-4">
        <Input label="First Name" value={"Daniel"} disabled />
        <Input label="Last Name" value={"Doe"} disabled />
        <div className="col-span-2">
          <Input label="Email" value={"johndoes@gmail.com"} disabled />
        </div>

        <Input label="Current Password" type="password" />
        <Input label="New Password" type="password" />

        <div className="col-span-2">
          <Button colorScheme="info">Save</Button>
        </div>
      </form>
    </div>
  );
}

export default UserDetails;
