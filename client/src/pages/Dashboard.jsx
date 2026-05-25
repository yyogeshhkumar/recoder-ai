import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { createReview, getMyReviews } from "../services/reviewService";
import { Code, History, Bug, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // History on page load
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getMyReviews(user.token);
      setHistory(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReview = async () => {
    if (!code.trim()) return alert("Enter code");

    try {
      setLoading(true);

      const data = await createReview(
        { code, language: "javascript" },
        user.token,
      );

      setResult(data.result);
      setCode("");

      // refresh history
      fetchHistory();
    } catch (err) {
      console.error(err);
      alert("Error generating review");
    } finally {
      setLoading(false);
    }
  };

  // Render list safely
  const renderList = (items, color) => {
    if (!items || items.length === 0) {
      return <li>No issues</li>;
    }

    return items.map((item, i) => (
      <li key={i} className="mb-2">
        {typeof item === "string" ? (
          item
        ) : (
          <>
            <p className={`font-semibold ${color}`}>{item.issue}</p>
            <p className="text-gray-400 text-sm">{item.suggestion}</p>
          </>
        )}
      </li>
    ));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* SIDEBAR */}
      <div
        onMouseMove={(e) =>
          setMousePos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
        }
        className="relative w-64 bg-white/5 backdrop-blur-lg border border-white/10 p-4 border-r border-gray-800 overflow-hidden"
      >
        {/* Glow effect in inside sidebar */}
        <div
          className="pointer-events-none absolute inset-0 transition duration-200"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(168,85,247,0.12), transparent 100px)`,
          }}
        />
        <h2 className="text-lg font-bold mb-4 text-blue-400">History</h2>

        <div className="space-y-2">
          {history.map((item) => (
            <div
              key={item._id}
              onClick={() => setResult(item.result)}
              className="p-3 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
            >
              <p className="text-sm text-gray-300 truncate">
                {item.code.slice(0, 40)}...
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-8 relative">
          {/* Logout button */}
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="absolute right-0 top-0 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all duration-200"
          >
            Logout
          </button>

          {/* Title */}
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent px-6 py-2 rounded-xl border border-white/10 shadow-lg shadow-purple-500/10 backdrop-blur-md">
            ReCoder AI
          </h1>

          {/* Tagline */}
          <p className="mt-3 text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
            Analyze your code with{" "}
            <span className="text-purple-400 font-medium">
              AI-powered insights
            </span>{" "}
            for better performance, security, and scalability.
          </p>
        </div>

        {/* Code Input */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl mb-4">Paste Your Code</h2>

          <textarea
            rows="8"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded mb-4"
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            onClick={handleReview}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition-all duration-200 hover:scale-105"
          >
            {loading ? (
              <span className="animate-pulse">Analyzing AI...</span>
            ) : (
              "Analyze Code"
            )}
          </button>
        </div>

        {/* EMPTY STATE */}
        {!result && (
          <div className="text-center text-gray-500 mt-10">
            Paste your code and get AI-powered review
          </div>
        )}

        {/* AI RESULT */}
        {result && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">AI Review</h2>

            <p className="mb-4 text-gray-300">
              <span className="font-semibold text-white">Summary:</span>{" "}
              {result.summary}
            </p>

            <p className="text-green-400 text-xl font-bold mb-4">
              Score: {result.score}
            </p>

            {result.time_complexity && (
              <p className="mb-4 text-purple-400">
                Time Complexity: {result.time_complexity}
              </p>
            )}

            <div className="mb-4">
              <h3 className="flex items-center gap-2 text-purple-400 font-semibold">
                <Bug className="w-5 h-5" />
                Bugs
              </h3>
              <ul className="ml-6 list-disc">
                {renderList(result.bugs, "text-red-300")}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="flex items-center gap-2 text-purple-400 font-semibold">
                <Code className="w-5 h-5" />
                Improvement
              </h3>
              <ul className="ml-6 list-disc">
                {renderList(result.improvements, "text-yellow-300")}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="flex items-center gap-2 text-purple-400 font-semibold">
                <Shield className="w-5 h-5" />
                Security
              </h3>
              <ul className="ml-6 list-disc">
                {renderList(result.security, "text-purple-300")}
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-purple-400 font-semibold">
                <Zap className="w-5 h-5" />
                Performance
              </h3>
              <ul className="ml-6 list-disc">
                {renderList(result.performance, "text-blue-300")}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
