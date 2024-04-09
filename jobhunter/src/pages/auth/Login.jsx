// import GoogleIcon from "@mui/icons-material/Google";
// import AppleIcon from "@mui/icons-material/Apple";
import { useEffect, useState } from "react";
import heroImage from "../../assets/images/register-hero.jpg";
import { LoginForm } from "../../components/functional/Forms";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.status) {
          navigate("/dashboard");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <main
        className="centred flex-col h-screen w-full overflow-hidden bg-primaryDark text-secondaryDark-light bg-center bg-cover bg-no-repeat z-0 relative before:content-[''] before:absolute before:inset-0 before:bg-primaryDark before:opacity-50 before:z-10 before:backdrop-blur-xl"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="flex justify-center items-center w-[calc(100%-4rem)] h-[calc(100dvh-4rem)] z-20">
          <div
            className="xsm:hidden md:flex flex-1 relative w-full h-full rounded-l-[2rem] bg-cover bg-no-repeat bg-center before:content-[''] before:absolute before:z-10 before:w-full before:h-full before:top-0 before:left-0 before:bg-primaryDark/75 before:rounded-l-[2rem] flex-col centred"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="flex z-20">
              <h1 className="text-6xl font-bold text-accentDark">job</h1>
              <h1 className="text-6xl font-bold text-primary-dark">Hunter</h1>
            </div>
            <p className="text-secondaryDark text-2xl font-semibold mt-8 z-20">
              Your job search companion
            </p>
          </div>
          <div className="flex-1 centred flex-col h-full backgroundImage xsm:rounded-2xl md:rounded-l-[0] lg:rounded-r-[2rem] z-20">
            <div className="flex flex-col justify-center gap-2 mb-8">
              <p className="text-primary-dark xsm:text-xs lg:text-lg">
                The best way to keep track of your job application
              </p>
              <h1 className="xsm:text-3xl lg:text-6xl font-bold text-white">
                Sign in to your account
              </h1>
              <div className="h-1 w-full border-b border-primary/50 my-4" />
              <div className="w-full centred">
                <LoginForm />
              </div>
              <div className="flex flex-col items-center gap-4 w-full z-20">
                <a
                  href="/forgot-password"
                  className="text-accent font-bold text-lg hover:underline transition-all duration-300"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="h-1 w-full border-b border-primary/50 my-4" />
              <p className="text-center text-primary-dark xsm:text-sm lg:text-xl">
                Don&apos;t have an account?{" "}
                <a
                  href="/register"
                  className="text-accent font-bold xsm:text-md lg:text-lg hover:underline transition-all duration-300"
                >
                  Sign up
                </a>
              </p>
              {/* TODO: Implement Google/Apple authentication later on */}
              {/* <div className="w-full centred gap-4">
                <button className="px-12 py-4 bg-primary text-2xl font-semibold text-secondary rounded-lg hover:bg-accentDark hover:text-primary">
                  <GoogleIcon className="-mt-1" fontSize="large" />
                  <span className="ml-2">Sign in with Google</span>
                </button>
                <button className="px-12 py-4 bg-primary text-2xl font-semibold text-secondary rounded-lg hover:bg-accentDark hover:text-primary">
                  <AppleIcon className="-mt-2" fontSize="large" />
                  <span className="ml-2">Sign in with Apple</span>
                </button>
              </div> */}
              {/* <div className="h-1 w-full border-b border-secondary/50 my-4" /> */}
            </div>
          </div>
        </div>
        <small className="absolute bottom-1 right-4 text-primary z-30">
          Made with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/marius-bobitiu/"
            className="text-accent-light hover:text-accent-dark font-bold transition-all duration-300 z-20"
          >
            Marius-Catalin Bobitiu
          </a>
        </small>
      </main>
    </>
  );
};

export default Login;
