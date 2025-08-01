import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      res.data.user.role === "admin" ? navigate("/admin") : navigate("/user");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="p-5 min-h-screen flex items-center justify-center bg-blue-100">
      <form onSubmit={submit} className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-black">Welcome Back</h2>
        
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
          />
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition-all">
          Login
        </button>

        <div className="text-center text-sm text-black">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-500 hover:underline font-medium">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}
