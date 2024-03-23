import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/page/Navbar";
import Footer from "./components/page/Footer";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  const excludedRoutes = ["/login", "/register"];

  return (
    <>
      <Router>
        {!excludedRoutes && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        {!excludedRoutes && <Footer />}
      </Router>
    </>
  );
}

export default App;
