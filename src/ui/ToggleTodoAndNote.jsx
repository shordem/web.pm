import { useTodo } from "../TodoContext";

function ToggleTodoAndNote({ activeTab, setActiveTab }) {
  const { darkMode } = useTodo();

  function handleButtonClickTodo() {
    setActiveTab(true);
    console.log("clicked todo");
  }
  function handleButtonClickNote() {
    setActiveTab(false);
    console.log("clicked note");
  }

  function handleButtonKeyPressTodo(event) {
    if (event.key === "Enter" || event.key === " ") {
      // Trigger the button action when Enter or Space is pressed
      handleButtonClickTodo();
    }
  }
  function handleButtonKeyPressNote(event) {
    if (event.key === "Enter" || event.key === " ") {
      // Trigger the button action when Enter or Space is pressed
      handleButtonClickNote();
    }
  }
  return (
    <div className=" flex justify-center">
      <div
        className={`${
          darkMode ? "bg-[#25273c]" : "bg-[#fafafa]"
        } w-fit flex   mb-6 rounded-full overflow-hidden   `}
      >
        <p
          className={`px-6 py-4 border-r ${
            activeTab ? `${darkMode ? "bg-[#1e1f30]" : "bg-[#e1e1e1]"}` : ""
          } `}
          role="button"
          onClick={handleButtonClickTodo}
          onKeyDown={handleButtonKeyPressTodo}
        >
          Todo
        </p>
        <p
          className={`px-6 py-4  ${
            !activeTab ? `${darkMode ? "bg-[#1e1f30]" : "bg-[#e1e1e1]"}` : ""
          } `}
          role="button"
          onClick={handleButtonClickNote}
          onKeyDown={handleButtonKeyPressNote}
        >
          Note
        </p>
      </div>
    </div>
  );
}

export default ToggleTodoAndNote;
