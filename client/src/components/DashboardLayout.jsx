// src/components/DashboardLayout.jsx
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ children, role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">
          {role === "admin" ? "Admin Panel" : "User Panel"}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full px-4 py-8 flex justify-center items-start">
        <div className="w-full max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
