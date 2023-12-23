import { BiLoaderAlt } from "react-icons/bi";

const SpinnerMini = ({ text }) => (
  <div className="absolute inset-0 h-screen w-screen flex flex-col items-center justify-center bg-slate-100/10 backdrop-blur-sm">
    <BiLoaderAlt className="w-24 h-24 animate-spin" />
    <p className="text-purple-400 text-2xl">{text ? text : "Loading..."}</p>
  </div>
);

export default SpinnerMini;
