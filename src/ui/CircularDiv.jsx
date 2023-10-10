function CircularDiv({ onClick }) {
  return (
    <div
      className="w-6 h-6 cursor-pointer rounded-full border-2 border-[hsl(235,32%,92%)] flex items-center justify-center transition-all hover:border-[#9394a5]"
      onClick={onClick}
    ></div>
  );
}

export default CircularDiv;
