import heroImage from "../../assets/images/register-hero.jpg";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { RegisterForm } from "../../components/Forms";

const Register = () => {
  return (
    <>
      <main
        className="centred flex-col h-screen w-full overflow-hidden bg-primaryDark text-secondaryDark-light bg-center bg-cover bg-no-repeat z-0 relative before:content-[''] before:absolute before:inset-0 before:bg-primaryDark before:opacity-50 before:z-10 before:backdrop-blur-xl"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="flex justify-center items-center w-[calc(100%-4rem)] h-[calc(100dvh-4rem)] z-20">
          <div
            className="flex-1 relative w-full h-full rounded-l-[2rem] bg-cover bg-no-repeat bg-center before:content-[''] before:absolute before:z-10 before:w-full before:h-full before:top-0 before:left-0 before:bg-primaryDark/75 before:rounded-l-[2rem] flex-col centred"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="flex z-20">
              <h1 className="text-6xl font-bold text-accentDark">job</h1>
              <h1 className="text-6xl font-bold text-primary-dark">Hunter</h1>
            </div>
            <p className="text-secondaryDark text-2xl font-semibold mt-2 z-20">
              Your job search companion
            </p>
          </div>
          <div className="flex-1 centred flex-col h-full backgroundImage rounded-r-[2rem] z-20">
            <div className="flex flex-col justify-center gap-2 mb-8">
              <p className="">Keep track of your job applications</p>
              <h1 className="text-6xl font-bold text-white">
                Create your account
              </h1>
              <div className="h-1 w-full border-b border-primary/50 my-4" />
              <div className="w-full centred gap-4">
                <button className="px-12 py-4 bg-primary text-2xl font-semibold text-secondary rounded-lg hover:bg-accentDark hover:text-primary">
                  <GoogleIcon className="-mt-1" fontSize="large" />
                  <span className="ml-2">Sign up with Google</span>
                </button>
                <button className="px-12 py-4 bg-primary text-2xl font-semibold text-secondary rounded-lg hover:bg-accentDark hover:text-primary">
                  <AppleIcon className="-mt-2" fontSize="large" />
                  <span className="ml-2">Sign up with Apple</span>
                </button>
              </div>
              <div className="h-1 w-full border-b border-primary/50 my-4" />
            </div>
            <RegisterForm />
            <div className="h-1 w-3/4 border-b border-primary/50 my-4" />
            <p className="text-center text-primary-dark">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-accentDark font-bold text-lg hover:underline transition-all duration-300"
              >
                Sign in
              </a>
            </p>
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

export default Register;
