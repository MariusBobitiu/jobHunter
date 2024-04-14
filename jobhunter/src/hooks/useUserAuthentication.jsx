import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useUserAuthentication = (titlePrefix) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("User not logged in, redirecting to login page...");
      navigate("/login");
    } else {
      console.log("User logged in: ", user.email);
      document.title = titlePrefix
        ? `${titlePrefix} | ${user.username}`
        : document.title;
    }
  }, [user, navigate, titlePrefix]);

  return user;
};

export default useUserAuthentication;
