function PageCenter({ children }) {
  return (
    <div className="grid min-h-screen items-center justify-center grid-cols-[30rem]">
      {children}
    </div>
  );
}

export default PageCenter;
