import { Button } from '@/components/ui/button'
import Input from '@/components/ui/form/input'

function OrganizationSettings() {
  return (
    <div className="w-full">
    <form className="flex gap-6 py-4 items-end">
      <Input label="Organization Name" />
      <Button colorScheme="info">Save</Button>
    </form>

    <div className="w-full">
      <h4>Organization Members</h4>

      <form className="flex gap-6 py-4 w-full items-end">
        <Input label="User Email" className="w-4/6" />
        <Button className="w-fit">Add Member</Button>
      </form>

      <ul className="my-6">
        <li className="flex justify-between gap-4">
          <div className="flex gap-4 items-center">
            <img
              src="https://ui-avatars.com/api/?name=John+Doe&background=random&rounded=true"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <span>John Doe</span>
          </div>
          <Button variant="ghost" colorScheme="danger">
            Remove
          </Button>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default OrganizationSettings