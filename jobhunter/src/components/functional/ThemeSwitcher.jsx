import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../features/darkMode/darkModeSlice";

const ThemeSwitcher = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const isChecked = darkMode ? true : false;
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleCheckboxChange = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center justify-between">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              isChecked ? "bg-primary-dark" : "bg-primaryDark-light"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full transition ${
              isChecked ? "translate-x-full bg-accentDark" : "bg-primary"
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default ThemeSwitcher;
