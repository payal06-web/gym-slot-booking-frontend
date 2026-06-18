import { BrowserRouter, Routes, Route } from "react-router-dom";
import Slot from "./pages/Slot";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Crowd from "./pages/Crowd";
import AboutGym from "./pages/AboutGym";


function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/slots" element={user ? <Slot /> : <Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/crowd" element={<Crowd />} />
       <Route path="/more" element={<AboutGym />} />
      
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;