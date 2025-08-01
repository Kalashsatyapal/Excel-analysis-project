import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    adminPasskey: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registered!");
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="p-5 min-h-screen flex items-center justify-center bg-blue-100">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-black">
          Create Your Account
        </h2>

        <div className="space-y-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-black"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-black"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-black"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {form.role === "admin" && (
          <div className="space-y-1">
            <label
              htmlFor="adminPasskey"
              className="block text-sm font-medium text-black"
            >
              Admin Passkey
            </label>
            <input
              id="adminPasskey"
              name="adminPasskey"
              onChange={handleChange}
              placeholder="Admin Secret"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
          </div>
        )}

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-all">
          Register
        </button>

        <div className="text-center text-sm text-black">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-500 hover:underline font-medium"
          >
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
}
