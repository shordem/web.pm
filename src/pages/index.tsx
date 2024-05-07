<<<<<<< HEAD
import TodoApp from "@/TodoApp";
import { useTodo } from "@/TodoContext";
import Categories from "@/categories";
import CategoriesMobile from "@/categories/CategoriesMobile";
import { useAuthRedirect } from "@/hooks/auth";
import NoteApp from "@/noteapp";
import Settings from "@/settings";
import ActiveTab from "@/ui/ActiveTab";
import ErrorFallback from "@/ui/ErrorFallback";
import Footer from "@/ui/Footer";
import Header from "@/ui/Header";
import ToggleTodoAndNote from "@/ui/ToggleTodoAndNote";
import User from "@/ui/User";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

function HomePage() {
  // for redirecting to login page if not authenticated
  useAuthRedirect();

  const { darkMode } = useTodo()!;
  const [activeTab, setActiveTab] = useState(true);
  const [showSettings, setShowSettings] = useState(true);

  function closeSettings() {
    setShowSettings(false);
    console.log("clicked");
  }
=======
import { Link } from "react-router-dom";
>>>>>>> d097d808884255f0cbf8b3b8ee8f004b45ef5a39

const HomePage = () => {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <section className="text-center">
        <h1 className="text-3xl">Home Page</h1>
        <Link to="/dashboard" className="text-secondary">
          Go to Dashboard
        </Link>
      </section>
    </main>
  );
};

export default HomePage;
