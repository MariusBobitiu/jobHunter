import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";

const useLogin = () => {
  const dispatch = useDispatch();

  const loginUser = async (email, password) => {
    const res = await fetch("http://192.168.0.41:8080/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json(); // Parse as JSON
      console.log(data);
      if (res.status === 401) {
        throw new Error("Invalid credentials");
      } else if (res.status !== 200) {
        throw new Error(data.message || "An unexpected error occurred");
      }

      dispatch(login(data));
      return data; // Proceed assuming login was successful
    } else {
      // Handle non-JSON responses
      const text = await res.text(); // Parse as text
      throw new Error(
        text || "An error occurred, and the server didn't send JSON data."
      );
    }
  };
  return loginUser;
};

export default useLogin;
