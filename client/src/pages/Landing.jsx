import { useState, useContext, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [text, setText] = useState("");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔥 Typing Animation
  useEffect(() => {
    const fullText =
      "Analyze bugs • Improve performance • Secure code • Get AI insights instantly";

    let index = 0;

    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;

      if (index > fullText.length) {
        index = 0;
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // LOGIN
  const handleLogin = async () => {
    try {
      const data = await loginUser(loginForm);
      login(data);
      setShowLogin(false);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  // REGISTER
  const handleRegister = async () => {
    try {
      await registerUser(registerForm);
      alert("Registered successfully");
      setShowRegister(false);
      setShowLogin(true);
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* 🔥 GLOW BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-orange-500 opacity-30 blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-600 opacity-30 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-pink-500 opacity-20 blur-[100px]" />
      </div>

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="text-xl font-bold px-4 py-1 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-orange-400">
          ReCoder
        </h1>

        <div className="space-x-6 text-gray-300">
          <button
            onClick={() => setShowLogin(true)}
            className="hover:text-orange-400 transition"
          >
            Login
          </button>
          <button
            onClick={() => setShowRegister(true)}
            className="hover:text-orange-400 transition"
          >
            Register
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-28">

        <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
          AI-Powered Code Review
        </h1>

        <p className="text-gray-300 max-w-2xl text-lg mb-8 font-mono">
          {text}
          <span className="animate-pulse text-orange-400">|</span>
        </p>

        <button
          onClick={() => setShowRegister(true)}
          className="bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-3 rounded-lg hover:scale-105 transition shadow-[0_0_20px_rgba(255,100,0,0.6)]"
        >
          Start Reviewing Code
        </button>
      </div>

      {/* FEATURES */}
      <div className="px-10 py-20 grid md:grid-cols-3 gap-10">

        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur p-6 rounded-xl border border-white/10 hover:scale-105 transition hover:shadow-[0_0_25px_rgba(255,140,0,0.4)]">
          <h3 className="text-xl font-semibold text-orange-400 mb-3">
            Intelligent Code Analysis
          </h3>
          <p className="text-gray-400 text-sm">
            Automatically detects bugs, logical flaws, and syntax issues.
            Provides structured feedback to improve code quality faster.
          </p>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur p-6 rounded-xl border border-white/10 hover:scale-105 transition hover:shadow-[0_0_25px_rgba(255,140,0,0.4)]">
          <h3 className="text-xl font-semibold text-orange-400 mb-3">
            Performance Optimization
          </h3>
          <p className="text-gray-400 text-sm">
            Identifies inefficient logic and suggests optimized solutions.
            Helps you write faster, cleaner, and scalable code.
          </p>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur p-6 rounded-xl border border-white/10 hover:scale-105 transition hover:shadow-[0_0_25px_rgba(255,140,0,0.4)]">
          <h3 className="text-xl font-semibold text-orange-400 mb-3">
            Security & Best Practices
          </h3>
          <p className="text-gray-400 text-sm">
            Highlights vulnerabilities and ensures your code follows modern
            development standards and best practices.
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-500 text-sm pb-6">
        © 2026 ReCoder AI Project by Yogesh Kumar 
      </div>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-80">

            <h2 className="text-xl mb-4 text-center">Login</h2>

            <input
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              className="w-full mb-3 p-2 bg-gray-800 rounded"
            />

            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              className="w-full mb-4 p-2 bg-gray-800 rounded"
            />

            <button
              onClick={handleLogin}
              className="w-full bg-orange-500 py-2 rounded hover:bg-orange-600"
            >
              Login
            </button>

            <p className="text-sm text-center mt-3">
              Don’t have an account?{" "}
              <span
                className="text-orange-400 cursor-pointer"
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                }}
              >
                Register
              </span>
            </p>

            <button
              onClick={() => setShowLogin(false)}
              className="mt-3 text-gray-400 text-sm w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {showRegister && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-80">

            <h2 className="text-xl mb-4 text-center">Register</h2>

            <input
              placeholder="Name"
              value={registerForm.name}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, name: e.target.value })
              }
              className="w-full mb-3 p-2 bg-gray-800 rounded"
            />

            <input
              placeholder="Email"
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, email: e.target.value })
              }
              className="w-full mb-3 p-2 bg-gray-800 rounded"
            />

            <input
              type="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, password: e.target.value })
              }
              className="w-full mb-4 p-2 bg-gray-800 rounded"
            />

            <button
              onClick={handleRegister}
              className="w-full bg-green-500 py-2 rounded hover:bg-green-600"
            >
              Register
            </button>

            <p className="text-sm text-center mt-3">
              Already have an account?{" "}
              <span
                className="text-orange-400 cursor-pointer"
                onClick={() => {
                  setShowRegister(false);
                  setShowLogin(true);
                }}
              >
                Login
              </span>
            </p>

            <button
              onClick={() => setShowRegister(false)}
              className="mt-3 text-gray-400 text-sm w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}