import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/protected/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMsg(res.data.msg);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-silver-200 to-blue-100 font-sans text-gray-900">
      <nav className="bg-white shadow-md p-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500 tracking-tight">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          Logout
        </button>
      </nav>

      <main className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] p-6">
        {msg && (
          <div className="bg-white shadow-xl rounded-lg px-8 py-6 max-w-md text-center">
            <p className="text-lg text-gray-700">{msg}</p>
          </div>
        )}
      </main>
    </div>
  );
}
