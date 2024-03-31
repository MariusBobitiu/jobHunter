import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import passwordImg from "../../assets/images/shieldLock.svg";

const ResetPassword = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Make a request to the backend to verify the token
        console.log(token);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth/verify-token`,
          {
            method: "POST",
            body: JSON.stringify({ token }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Check the response status
        if (response.status === 200) {
          setIsValidToken(true);
          console.log("Token is valid");
        } else {
          setIsValidToken(false);
          console.log("Token is invalid");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsValidToken(false);
      }
    };

    verifyToken();
  }, []);

  const resetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password/${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (!response.ok) {
        console.error(
          "Error resetting password:",
          response.status,
          response.statusText
        );
        return;
      }

      const data = await response.json();
      console.log("Password reset:", data);
      alert(data.message);

      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <>
      <div>
        {isValidToken ? (
          <div className="w-screen h-screen flex justify-center items-center backgroundImage">
            <div className="xsm:w-full sm:w-3/5 lg:w-2/5 xsm:h-full sm:h-fit bg-primaryDark/50 py-12 px-6 xsm:flex-col sm:flex-row xsm:flex xsm:justify-start xsm:items-center sm:justify-center rounded-2xl gap-4">
              <div className="w-1/4 centred">
                <img
                  src={passwordImg}
                  alt="New Password"
                  className="bg-cover size-3/4"
                />
              </div>
              <form className="flex-col w-full centred text-primary text-xl">
                <h2 className="text-4xl text-accentDark-light">
                  Reset your password
                </h2>
                <p className="text-secondaryDark mb-8">
                  Enter your new password below.
                </p>
                <label htmlFor="password" className="w-full p-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  className="w-full p-2 bg-transparent border-b-2 border-primary/50 focus:outline-none focus:border-primary/80 mb-4"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword" className="w-full p-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  className="w-full p-2 bg-transparent border-b-2 border-primary/50 focus:outline-none focus:border-primary/80 mb-4"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="w-full centred flex-col">
                  <button
                    type="submit"
                    className="py-3 px-8 bg-accentDark hover:bg-accentDark-dark rounded-lg text-primary mt-4"
                    onClick={resetPassword}
                  >
                    Reset Password
                  </button>
                  <button
                    className="py-3 px-8 text-accentDark text-lg font-semibold hover:underline"
                    onClick={() => navigate("/login")}
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="w-screen h-screen backgroundImage flex justify-center items-center">
              <div className="xsm:w-full xsm:h-full sm:h-fit sm:w-3/5 lg:w-2/5 bg-primaryDark/50 py-12 px-6 xsm:flex-col sm:flex-row centred rounded-2xl gap-4">
                <div className="w-1/4 centred">
                  <img
                    src={passwordImg}
                    alt="New Password"
                    className="bg-cover size-3/4"
                  />
                </div>
                <div className="flex-col w-full centred text-primary text-xl">
                  <h2 className="text-4xl text-accentDark-light">
                    Link has expired
                  </h2>
                  <p className="text-secondaryDark">
                    The token is invalid or has expired.
                  </p>
                  <button
                    className="py-3 px-8 bg-accentDark hover:bg-accentDark-dark rounded-lg text-primary mt-4"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
