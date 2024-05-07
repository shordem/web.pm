import { ErrorBoundary } from "react-error-boundary";
import { useTodo } from "../../TodoContext.js";
import Categories from "../../categories/index.js";
import Settings from "../../settings/index.js";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import NoteApp from "../../NoteApp/index.js";
import TodoApp from "../../TodoApp/index.js";
import CategoriesMobile from "../../categories/CategoriesMobile.js";
import ActiveTab from "../../ui/ActiveTab.js";
import ErrorFallback from "../../ui/ErrorFallback.js";
import Footer from "../../ui/Footer.js";
import ToggleTodoAndNote from "../../ui/ToggleTodoAndNote.js";
import User from "../../ui/User.js";

function DashboardPage() {
  const { darkMode } = useTodo()!;
  const [activeTab, setActiveTab] = useState(true);
  const [showSettings, setShowSettings] = useState(true);

  function closeSettings() {
    setShowSettings(false);
    console.log("clicked");
  }

  return (
    <div
      className={`${
        darkMode ? "text-[#777a92]" : "text-#9394a5"
      } grid grid-cols-3 max-[1024px]:grid-cols-1 relative `}
    >
      <div className="max-[1024px]:hidden">
        <Categories />
      </div>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <div>
          <main className="mt-12 mx-auto max-w-2xl max-[675px]:w-4/5 max-[400px]:w-[90%]">
            <User setShowSettings={setShowSettings} />
            <div>
              {/* <Header /> */}
              <CategoriesMobile />
              <ToggleTodoAndNote
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.replace("/")}
              >
                <div className="shadow-md">
                  {" "}
                  <AnimatePresence mode="wait">
                    {activeTab ? <TodoApp /> : <NoteApp />}{" "}
                  </AnimatePresence>
                </div>
              </ErrorBoundary>
            </div>
            <ActiveTab
              className={`${
                darkMode ? "bg-[#25273c]" : "bg-white"
              } flex items-center justify-center gap-4 px-4 py-4 shadow-max-lg min-[560px]:hidden mt-4 text-[#9394a5] hover:text-inherit rounded-md`}
            />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
      {/* <AnimatePresence>{showSettings && <Settings />}</AnimatePresence> */}{" "}
      <AnimatePresence>
        {showSettings && <Settings close={closeSettings} />}
      </AnimatePresence>
    </div>
  );
}

export default DashboardPage;
