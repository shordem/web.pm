import Header from "./ui/Header";
import CreateNewTodo from "./ui/CreateNewTodo";
import ToDo from "./ui/ToDo";
import Footer from "./ui/Footer";
import { useTodo } from "./TodoContext";
import { useEffect } from "react";
import ActiveTab from "./ui/ActiveTab";
// import ToDo from ".ui/ToDo";

function App() {
  const { darkMode } = useTodo();
  // const [tasks, setTasks] = useState([
  //   { task: "Jog around the park 3x", completed: true },
  //   { task: "10 minutes meditation", completed: false },
  // ]);
  useEffect(
    function () {
      if (darkMode) {
        document.body.classList.add(
          "max-[375px]:bg-mobile-dark",
          "bg-main-dark"
        );
        document.body.classList.remove(
          "max-[375px]:bg-mobile-light",
          "bg-main-light"
        );
      } else {
        document.body.classList.remove(
          "max-[375px]:bg-mobile-dark",
          "bg-main-dark"
        );
        document.body.classList.add(
          "max-[375px]:bg-mobile-light",
          "bg-main-light"
        );
      }
    },
    [darkMode]
  );
  return (
    <div className={`${darkMode ? "text-[#777a92]" : "text-#9394a5"}`}>
      <main className="mt-16 mx-auto max-w-2xl max-[375px]:w-[310px]">
        <div className="shadow-md">
          <Header />
          <CreateNewTodo />
          <ToDo />
        </div>
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

export default App;
