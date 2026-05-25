import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded">
        <h2 className="text-xl mb-4">Register</h2>

        <input
          className="block mb-3 p-2 w-full text-black"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="block mb-3 p-2 w-full text-black"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="block mb-3 p-2 w-full text-black"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-green-500 px-4 py-2">Register</button>
      <p className="text-gray-400 text-sm mt-4 text-center">
  Already have an account?{" "}
  <span
    className="text-blue-400 cursor-pointer hover:underline"
    onClick={() => navigate("/login")}
  >
    Login
  </span>
</p>
      </form>
    </div>
  );
}