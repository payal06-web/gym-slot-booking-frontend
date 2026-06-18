import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import gsap from "gsap";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    const validItems = itemsRef.current.filter(Boolean);

    if (validItems.length) {
      gsap.from(validItems, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.3
      });
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="bg-black text-white px-4 sm:px-6 py-4 flex items-center justify-between shadow-lg shadow-yellow-400/30 relative z-50"
    >
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-serif text-yellow-200 cursor-pointer"
        onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1 })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1 })}
        onClick={() => navigate("/")}
      >
        DoGym
      </h2>
      <div
        className="sm:hidden text-2xl cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); 
          setMenuOpen((prev) => !prev);
        }}
      >
        <FaBars />
      </div>
      <div className="hidden sm:flex items-center gap-5">
        {user ? (
          <>
            <span
              ref={(el) => (itemsRef.current[0] = el)}
              className="text-gray-300 text-sm md:text-base"
            >
              Hello,{" "}
              <span className="text-white font-semibold">
                {user.name}
              </span>
            </span>

            {user.role === "admin" && (
              <button
                ref={(el) => (itemsRef.current[1] = el)}
                onClick={() => navigate("/admin")}
                className="bg-yellow-200 text-black px-3 py-1 md:px-4 md:py-1 rounded-lg font-medium font-serif text-sm md:text-base"
              >
                Admin
              </button>
            )}

            <button
              ref={(el) => (itemsRef.current[2] = el)}
              onClick={logout}
              className="bg-red-500 px-3 py-1 md:px-4 md:py-1 rounded-lg text-sm md:text-base"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              ref={(el) => (itemsRef.current[0] = el)}
              onClick={() => navigate("/login")}
              className="border border-gray-400 px-3 py-1 md:px-4 md:py-1 rounded-lg text-sm md:text-base"
            >
              Login
            </button>

            <Link
              ref={(el) => (itemsRef.current[1] = el)}
              to="/signup"
              className="bg-yellow-200 text-black px-3 py-1 md:px-4 md:py-1 rounded-lg font-medium font-serif text-sm md:text-base"
            >
              Signup
            </Link>
          </>
        )}
      </div>

      {menuOpen && (
        <div className="absolute top-16 right-4 bg-black border border-gray-700 rounded-lg p-4 flex flex-col gap-4 sm:hidden w-48 shadow-lg z-50">

          {user ? (
            <>
              <span className="text-gray-300 text-sm">
                Hello,{" "}
                <span className="text-white font-semibold">
                  {user.name}
                </span>
              </span>

              {user.role === "admin" && (
                <button
                  onClick={() => {
                    navigate("/admin");
                    setMenuOpen(false);
                  }}
                  className="bg-yellow-200 text-black px-3 py-1 rounded-lg"
                >
                  Admin
                </button>
              )}

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 px-3 py-1 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="border border-gray-400 px-3 py-1 rounded-lg"
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(false);
                }}
                className="bg-yellow-200 text-black px-3 py-1 rounded-lg"
              >
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;