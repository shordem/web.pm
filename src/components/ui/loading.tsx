import { BiLoaderAlt } from "react-icons/bi";

function Loader() {
  return (
    <div className=" flex items-center justify-center h-full w-full animate-spin">
      <BiLoaderAlt size={"2.4rem"} />
    </div>
  );
}

export default Loader;
