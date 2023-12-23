import { useTodo } from "../TodoContext.jsx";
import { useGetTodos } from "../featuresHook/useTodo";
import useUser from "../featuresHook/useUser";
import ActiveTab from "../ui/ActiveTab";
import CreateNewTodo from "../ui/CreateNewTodo";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import ToDo from "../ui/ToDo";
import User from "../ui/User";

function TodoApp() {
  const { darkMode } = useTodo();
  const { isLoading, data } = useUser();
  !isLoading && console.log(data);
  return (
    <div className={`${darkMode ? "text-[#777a92]" : "text-#9394a5"} `}>
      <main className="mt-16 mx-auto max-w-2xl max-[375px]:w-[310px] ">
        <User />
        <div className="shadow-md">
          <Header />
          <CreateNewTodo />
          <ToDo />
        </div>
        <p>working</p>
        <ActiveTab
          className={`${
            darkMode ? "bg-[#25273c]" : "bg-white"
          } flex items-center justify-center gap-4 px-4 py-4 shadow-lg min-[375px]:hidden mt-4 text-[#9394a5] hover:text-inherit rounded-md`}
        />
      </main>
      <Footer />
    </div>
  );
}

export default TodoApp;
