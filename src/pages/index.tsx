import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <section className="bg-gray-200 p-20 text-center rounded">
        <h1 className="text-3xl">Home Page</h1>
        <Link to="/dashboard" className="text-purple-700">
          Go to Dashboard
        </Link>
      </section>
    </main>
  );
};

export default HomePage;
