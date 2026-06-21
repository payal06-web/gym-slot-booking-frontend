import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      setError("");
      console.log("Email :", email)
      console.log("Password:", password)
      const res = await api.post("/auth/login", { email, password });
      login(res.data);

      if (res.data.role === "admin") navigate("/admin");
      else navigate("/");

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-96 p-8 rounded-2xl bg-white/5 backdrop-blur-md  shadow-lg shadow-yellow-400/30">
        <h2 className="text-3xl font-serif text-center text-yellow-200 mb-6">
          DoGym Login
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Access your gym dashboard </p>
        {error && (
          <div className="bg-red-500/20 text-red-300 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-black border border-gray-600 focus:border-yellow-400 outline-none"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-black border border-gray-600 focus:border-yellow-400 outline-none"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-200 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition"
        >
          Login
        </button>
        <p className="text-center text-gray-400 mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-yellow-300 font-semibold">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;