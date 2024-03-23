import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode");
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <button
        onClick={toggleDarkMode}
        className={`px-4 py-2 rounded-lg ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } ${
          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
        } transition-colors duration-300 ease-in-out z-20`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </>
  );
};

export default ThemeSwitcher;
