import { twMerge } from "tailwind-merge";
function Heading({ className, children, as = "h4" }) {
  const sizes = {
    h1: "text-[20px] md:text-[54px] tracking-widest",
    h2: "text-[18px] md:text-[48px] tracking-wider",
    h3: "text-[16px] md:text-[40px] tracking-wide",
    h4: "text-[14px] md:text-[32px] tracking-normal",
    h5: "text-[14px] md:text-[20px] tracking-normal",
  };
  const baseClassName = twMerge(" text-[#fafafa] ", sizes[as], className);
  return <h1 className={baseClassName}>{children}</h1>;
}

export default Heading;
