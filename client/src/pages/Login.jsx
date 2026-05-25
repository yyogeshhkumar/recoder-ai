import { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(form);
    login(data);
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-950 text-white">
  <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-96">
    
    <h2 className="text-3xl font-bold text-center mb-6">
      ReCoder
    </h2>

    <p className="text-gray-400 text-center mb-6 text-sm">
      AI Code Reviewer
    </p>

    <form onSubmit={handleSubmit}>
      
      <input
        className="w-full mb-4 p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        className="w-full mb-4 p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition">
        Login
      </button>

    </form>

    <p className="text-gray-400 text-sm mt-4 text-center">
      Don’t have an account?{" "}
      <span
        className="text-blue-400 cursor-pointer"
        onClick={() => navigate("/register")}
      >
        Register
      </span>
    </p>

  </div>
</div>
  );
}