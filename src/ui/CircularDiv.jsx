function CircularDiv({ onClick }) {
  return (
    <div
      className="w-6 h-6 cursor-pointer rounded-full border-2 border-[#e4e5f1] flex items-center justify-center transition-all"
      onClick={onClick}
    ></div>
  );
}

export default CircularDiv;
