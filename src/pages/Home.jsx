import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover mt-50 m-20"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 "></div>
        <h2 className="relative z-10 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center leading-tight tracking-tight px-4">
          <span className="block text-white">
            BUILD YOUR
          </span>

          <span className="block text-yellow-400">
            FITNESS EMPIRE
          </span>

        </h2>
      </div>
      <div className="text-center px-4 sm:px-6 mt-10">
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/more")}
            className="px-6 py-3 bg-yellow-200 text-black font-serif font-bold rounded-xl hover:scale-110 transition mt-20 shadow-lg shadow-yellow-400/30 text-sm sm:text-base"
          >
            Explore more About gym
          </button>
        </div>
        <p className="text-gray-400 mt-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Stop guessing gym timings.
          <span className="text-white font-semibold">
            {" "}Book smart • Train hard • Avoid crowd
          </span>
          with real-time slot intelligence system built for modern athletes.
        </p>

        <p className="mt-10 text-yellow-200 font-semibold tracking-widest uppercase text-xs sm:text-sm">
          # No More Waiting. Just Lifting.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <button
            onClick={() => navigate("/slots")}
            className="px-3 py-6 sm:px-5 sm:py-3 md:px-6 md:py-3 bg-yellow-200 text-black font-serif font-bold rounded-xl hover:scale-110 transition shadow-lg shadow-yellow-400/30 w-full sm:w-auto"
            style={{fontSize: "clamp(12px, 2vw, 18px"}}
          >
            Enter DoGym
          </button>

          <button
            onClick={() => navigate("/crowd")}
            className="px-6 py-3 border border-yellow-200 font-serif text-yellow-200 rounded-xl hover:bg-yellow-300 hover:text-black transition w-full sm:w-auto"
          >
            Live Crowd
          </button>

        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>

    </div>
  );
};

export default Home;