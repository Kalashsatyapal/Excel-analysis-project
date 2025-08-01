import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/protected/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMsg(res.data.msg);

        // Clear message after 30 seconds
        setTimeout(() => {
          setMsg("");
        }, 3000);
      })
      .catch(() => {
        setMsg("Unauthorized");
        navigate("/");
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <nav className="bg-white shadow-md p-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">User Dashboard</h1>
        <button
          onClick={logout}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Logout
        </button>
      </nav>

      <main className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] p-6">
        {msg && (
          <div className="bg-white shadow-lg rounded-lg px-8 py-6 max-w-md text-center">
            <p className="text-lg">{msg}</p>
          </div>
        )}
      </main>
    </div>
  );
}
