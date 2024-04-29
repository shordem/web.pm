function PageCenter({ children }) {
  return (
    <div className="grid min-h-screen items-center justify-center grid-cols-[30rem] max-[600px]:grid-cols-[80%]  pt-8">
      {children}
    </div>
  );
}

export default PageCenter;
