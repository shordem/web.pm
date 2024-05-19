import { Button } from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import { useUser } from "../dashboard.hook";
import Loader from "@/components/ui/loading";

function UserDetails() {
  const user = useUser();

  const userDetails = user.data?.data!;
  return (
    <div className="w-full">
      <h4 className="text-xl font-bold mb-4">User Details</h4>
      <>
        {user.isLoading ? (
          <Loader />
        ) : (
          <form className="grid grid-cols-2 gap-4">
            <Input label="First Name" value={userDetails.first_name} disabled />
            <Input label="Last Name" value={userDetails.last_name} disabled />
            <div className="col-span-2">
              <Input label="Email" value={userDetails.email} disabled />
            </div>

            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />

            <div className="col-span-2">
              <Button colorScheme="info">Save</Button>
            </div>
          </form>
        )}
      </>
    </div>
  );
}

export default UserDetails;
