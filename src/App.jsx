import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useTodo } from "./TodoContext";
import { useEffect, useState } from "react";

import TodoApp from "./pages/TodoApp";
// import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";

// import ToDo from ".ui/ToDo";

const tasks = [
  { task: "ash", id: 5 },
  { task: ";lslashhdh", id: 6 },
  { task: "ashhdh", id: 7 },
];
function App() {
  const { darkMode } = useTodo();

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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-left"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            // backgroundColor: "var(--color-grey-0)",
            backgroundColor: "bg-red-500",
            color: "bg-red-100",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
// import React, { useState } from "react";
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
