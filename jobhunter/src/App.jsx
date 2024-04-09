import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Jobs from "./pages/Jobs";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import About from "./pages/About";
import ResetPassword from "./pages/auth/ResetPassword";
import Test from "./components/page/Test";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
