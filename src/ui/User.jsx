import useUser from "../featuresHook/useUser";
import Logout from "./Logout";

function User() {
  const { isLoading, user } = useUser();

  // const {
  //   isLoading,
  //   user: { username },
  // } = data;
  const hours = new Date().getHours();
  let timeString = `${
    hours <= 11
      ? "Good Morning"
      : hours <= 15
      ? "Good Afternoon"
      : hours <= 20
      ? "Good Evening"
      : "Good Night"
  }`;

  if (isLoading) return <p>Loading ....</p>;
  const { username } = user;
  return (
    <div className="flex gap-3 text-white ml-auto text-base lg:text-2xl md:text-1xl w-fit">
      <p>
        {timeString}, {username || "User"}
      </p>
      <Logout />
    </div>
  );
}

export default User;
