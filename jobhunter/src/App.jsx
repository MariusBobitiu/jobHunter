import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./styles/globals.css";
import { AuthProvider, useAuth } from "./hooks/useAuth";

// Pages
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
// import Test from "./components/page/Test";

// PrivateRoute component
const PrivateRoute = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

// App Router component
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
            </Route>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h1>Not Found</h1>} />
            {/* <Route path="/test" element={<Test />} /> */}
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
