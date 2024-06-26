import { useState } from "react";
import useRegister from "../../hooks/useRegister";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = useRegister();
  const login = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const checkPassword = [...password];
    if (checkPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await register(username, email, password);
      console.log("Registered");
      await login(email, password);
      console.log("Logged in");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form
        className="centred flex-col xsm:w-4/5 lg:w-1/2 lg:text-xl"
        onSubmit={submitForm}
      >
        <input
          type="text"
          placeholder="Username"
          className=" bg-transparent border border-primary-dark/75 text-primary-light w-full mb-4 py-4 rounded-lg px-6 focus:outline-none focus:border-white"
          onChange={handleChange}
          value={username}
          name="username"
          autoComplete="username"
          required
        />{" "}
        <input
          type="email"
          placeholder="Email Address"
          className=" bg-transparent border border-primary-dark/75 text-primary-light w-full mb-4 py-4 rounded-lg px-6 focus:outline-none focus:border-white"
          value={email}
          onChange={handleChange}
          name="email"
          autoComplete="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className=" bg-transparent border border-primary-dark/75 text-primary-light w-full mb-4 py-4 rounded-lg px-6 focus:outline-none focus:border-white"
          value={password}
          onChange={handleChange}
          name="password"
          required
        />{" "}
        <input
          type="password"
          placeholder="Confirm Password"
          className=" bg-transparent border border-primary-dark/75 text-primary-light w-full mb-4 py-4 rounded-lg px-6 focus:outline-none focus:border-white"
          value={confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          required
        />
        <button
          type="submit"
          className="px-16 py-2 bg-accentDark text-white xsm:text-lg lg:text-2xl font-semibold rounded-lg hover:bg-accentDark-dark m-4"
        >
          Sign up
        </button>
      </form>
    </>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await login(email, password);
      setIsLoading(false);
      console.log("Logged in successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error logging in:", err);
      alert(err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="centred flex-col xsm:w-4/5 lg:w-1/2 lg:text-xl"
        onSubmit={submitForm}
      >
        <input
          type="email"
          placeholder="Email Address"
          className=" bg-transparent border border-primary-dark/75 text-primary-light w-full mb-4 py-4 rounded-lg px-6 focus:outline-none focus:border-white"
          value={email}
          onChange={handleChange}
          name="email"
          autoComplete="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className=" bg-transparent border border-primary-dark/75 text-primary-light w-full mb-4 py-4 rounded-lg px-6 focus:outline-none focus:border-white"
          value={password}
          onChange={handleChange}
          name="password"
          required
        />{" "}
        <button
          type="submit"
          className="px-16 py-2 bg-accentDark text-white xsm:text-lg lg:text-2xl font-semibold rounded-lg hover:bg-accentDark-dark m-4 centred"
        >
          {isLoading ? (
            <CircularProgress size="sm" variant="soft" color="neutral" />
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </>
  );
};

export { RegisterForm, LoginForm };
