import Header from "./ui/Header";
import CreateNewTodo from "./ui/CreateNewTodo";
import ToDo from "./ui/ToDo";
import Footer from "./ui/Footer";
import { useTodo } from "./TodoContext";
import { useEffect } from "react";
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
        document.body.classList.add("bg-main-dark");
        document.body.classList.remove("bg-main-light");
      } else {
        document.body.classList.add("bg-main-light");
        document.body.classList.remove("bg-main-dark");
      }
    },
    [darkMode]
  );
  return (
    <div className={`${darkMode ? "text-[#777a92]" : "text-#9394a5"}`}>
      <main className="mt-16 mx-auto max-w-2xl shadow-md">
        <Header />
        <CreateNewTodo />
        <ToDo />
      </main>
      <Footer />
    </div>
  );
}

export default App;
