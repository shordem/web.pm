import Header from "./ui/Header";
import CreateNewTodo from "./ui/CreateNewTodo";
import ToDo from "./ui/ToDo";
import { useState } from "react";
// import ToDo from ".ui/ToDo";

function App() {
  // const [tasks, setTasks] = useState([
  //   { task: "Jog around the park 3x", completed: true },
  //   { task: "10 minutes meditation", completed: false },
  // ]);
  return (
    <div className=" ">
      <main className="mt-16 mx-auto max-w-2xl shadow-md">
        <Header />
        <CreateNewTodo />
        <ToDo />
      </main>
    </div>
  );
}

export default App;
