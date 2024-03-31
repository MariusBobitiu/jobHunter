import heroImage from "../assets/images/hero.jpg";

const Home = () => {
  return (
    <main className="flex-col centred h-screen bg-primaryDark text-secondary overflow-hidden">
      <div
        className="flex flex-col items-center justify-center w-full h-2/3 bg-cover bg-center bg-no-repeat relative overflow-hidden before:absolute before:inset-0 before:content-[''] before:opacity-50 before:z-0 before:bg-primaryDark before:backdrop-filter before:backdrop-blur-sm before:rounded-lg dark:before:backdrop-blur-0"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="z-10 flex-col centred">
          <h1 className="xsm:text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 text-primary">
            Welcome to JobHunter!
          </h1>
          <p className="xsm:text-lg lg:text-2xl mb-8 text-primary-dark">
            Track your job applications and stay organized.
          </p>
          <a
            href="/register"
            className="px-12 py-4 bg-accentDark xsm:text-lg lg:text-2xl font-semibold text-white rounded-lg hover:bg-accentHover"
          >
            Get Started
          </a>
          <p className="xsm:text-sm lg:text-lg mt-2 text-primary-dark">
            Or you can just{" "}
            <a
              href="/login"
              className="text-accentDark xsm:text-md lg:text-lg font-bold"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
