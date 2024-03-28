import { useState } from "react";
import { useNavigate } from "react-router-dom";
import newEmail from "../../assets/images/newEmail.svg";
import forgotPasswordImg from "../../assets/images/lockIconOutline.svg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);

  const [emailPage, setEmailPage] = useState(true);

  const navigate = useNavigate();

  const emailSubmit = async (e) => {
    e.preventDefault();
    const verifyEmail = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (!verifyEmail.ok) {
      console.error(
        "Error verifying email:",
        verifyEmail.status,
        verifyEmail.statusText
      );
      alert(
        "Error verifying email. Please make sure you are using the right email."
      );
      return;
    }

    const response = await verifyEmail.json();
    console.log("response", response);

    setCheckEmail(true);
    setEmailPage(false);

    // TODO: Implement password reset logic here
    console.log("Reset password for email:", email);
  };

  return (
    <main className="flex h-screen centred backgroundImage">
      {emailPage && (
        <div className="flex-col centred w-1/3 p-6 bg-primaryDark/50 rounded-[2rem]">
          <div className="size-24 rounded-full bg-primaryDark-ligh p-2 m-4">
            <img
              src={forgotPasswordImg}
              alt="Email sent"
              className="bg-cover size-full"
            />
          </div>
          <h2 className="text-4xl text-accentDark-light">
            Forgot your password?
          </h2>
          <p className="text-secondaryDark">
            Your password will be reset by email.
          </p>

          <form
            onSubmit={emailSubmit}
            className="centred flex-col w-2/3 p-4 my-4 text-secondaryDark text-lg "
          >
            <label htmlFor="email" className="w-full text-start text-xl">
              Enter your email address:
            </label>
            <input
              type="email"
              id="email"
              className="p-2 border border-secondaryDark/25 rounded-lg focus:outline-none focus:border-primary transition-all duration-150 bg-transparent w-full text-secondaryDark text-lg mb-8"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="py-3 px-8 bg-accentDark text-secondaryDark font-medium text-xl rounded-lg hover:bg-accentDark-dark transition-all duration-150 hover:text-secondaryDark-light"
            >
              Reset Password
            </button>
            <button
              className="w-full text-accentDark text-lg font-semibold mt-4 hover:underline"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </form>
        </div>
      )}
      {checkEmail && (
        <div className="flex-col centred w-1/2 p-10 bg-primaryDark/50 rounded-[2rem] gap-4">
          <div className="size-24 rounded-full bg-primaryDark">
            <img
              src={newEmail}
              alt="Email sent"
              className="bg-cover size-full"
            />
          </div>
          <h2 className="text-4xl text-secondaryDark mb-4">Check your email</h2>
          <p className="text-secondaryDark my-2">
            We&apos;ve sent you instructions on how to reset your password to{" "}
            <span className="font-semibold">{email}.</span>
          </p>
          <button
            onClick={() => navigate("/login")}
            className="py-3 px-8 bg-accentDark text-secondaryDark font-medium text-xl rounded-lg hover:bg-accentDark-dark transition-all duration-150 hover:text-secondaryDark-light"
          >
            Back to Login
          </button>
        </div>
      )}
    </main>
  );
};

export default ForgotPassword;
