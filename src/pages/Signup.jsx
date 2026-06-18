import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await api.post("/auth/register", form);

      alert(" Signup successful!");
      navigate("/login");

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-96 p-8 rounded-2xl bg-white/5 backdrop-blur border-none shadow-lg shadow-yellow-400/30">
        <h2 className="text-3xl font-serif text-center text-yellow-200 mb-6">
           Create Account
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Join DoGym and start booking slots
        </p>
        {error && (
          <div className="bg-red-500/20 text-red-300 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-black border border-gray-600 focus:border-yellow-400 outline-none"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-black border border-gray-600 focus:border-yellow-400 outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-black border border-gray-600 focus:border-yellow-400 outline-none"
        />
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-yellow-200 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
        <p className="text-center text-gray-400 mt-4 text-sm">
          Already have account?{" "}
          <Link to="/login" className="text-yellow-300 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;