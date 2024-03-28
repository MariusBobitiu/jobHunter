import { useSelector } from "react-redux";
import lightPlaceholder from "../../assets/images/Dashboard-Placeholder.svg";
import darkPlaceholder from "../../assets/images/Dashboard-PlaceholderDark.svg";

const Placeholder = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  return (
    <>
      <div className="size-full flex-col centred bg-primary-dark dark:bg-primaryDark-light rounded-lg p-4">
        <img
          src={darkMode ? lightPlaceholder : darkPlaceholder}
          alt="Placeholder"
          className="size-2/3 opacity-60 "
        />
        <div className="flex-col centred gap-2 mt-4">
          <h1 className="font-bold text-2xl text-secondary dark:text-secondaryDark">
            Hmm... there&apos;s no activity to report yet.{" "}
          </h1>
          <p className="text-lg font-medium text-secondary dark:text-secondaryDark">
            Start by adding your first job
          </p>
          <a
            className="text-xl font-bold bg-accent hover:bg-accent-dark dark:bg-accentDark dark:hover:bg-accentDark-dark py-2 px-4 rounded-lg text-secondaryDark"
            href="/jobs"
            alt="Jobs Page"
          >
            Jobs Page
          </a>
        </div>
      </div>
    </>
  );
};

export default Placeholder;
