import Header from "./ui/Header";
import CreateNewTodo from "./ui/CreateNewTodo";
import ToDo from "./ui/ToDo";
import Footer from "./ui/Footer";
import { useTodo } from "./TodoContext";
import { useEffect, useState } from "react";
import ActiveTab from "./ui/ActiveTab";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import ToDo from ".ui/ToDo";

const tasks = [
  { task: "ash", id: 5 },
  { task: ";lslashhdh", id: 6 },
  { task: "ashhdh", id: 7 },
];
function App() {
  const { darkMode } = useTodo();
  const [task, setTask] = useState(tasks);
  function handleOnDragEnd(result) {
    console.log(result);
  }
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
  // return (
  //   <div className={`${darkMode ? "text-[#777a92]" : "text-#9394a5"}`}>
  //     <main className="mt-16 mx-auto max-w-2xl max-[375px]:w-[310px]">
  //       <div className="shadow-md">
  //         <Header />
  //         <CreateNewTodo />
  //         <ToDo />
  //       </div>
  //       <ActiveTab
  //         className={`${
  //           darkMode ? "bg-[#25273c]" : "bg-white"
  //         } flex items-center justify-center gap-4 px-4 py-4 shadow-lg min-[375px]:hidden mt-4 text-[#9394a5] hover:text-inherit rounded-md`}
  //       />
  //     </main>
  //     <Footer />
  //   </div>
  // );
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-7 divide-y-4"
          >
            {tasks.map((task, i) => (
              <Draggable key={task.id} draggableId={task.task} index={i}>
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {i}. {task.task}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const App = () => {
//   const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
//   const handleDragEnd = (result) => {
//     if (!result.destination) {
//       return; // The item was dropped outside of a valid drop target
//     }

//     const { source, destination, draggableId } = result;

//     // Create a copy of your items list and remove the dragged item
//     const updatedItems = [...items];
//     const [removedItem] = updatedItems.splice(source.index, 1);

//     // Insert the removed item into the destination position
//     updatedItems.splice(destination.index, 0, removedItem);

//     // Update your component's state or data source
//     setItems(updatedItems);
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <Droppable droppableId="list">
//         {(provided) => (
//           <ul {...provided.droppableProps} ref={provided.innerRef}>
//             {items.map((item, index) => (
//               <Draggable key={item} draggableId={item} index={index}>
//                 {(provided) => (
//                   <li
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                   >
//                     {item}
//                   </li>
//                 )}
//               </Draggable>
//             ))}
//           </ul>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// export default App;
