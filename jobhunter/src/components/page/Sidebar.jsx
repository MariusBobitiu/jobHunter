import Logo from "../../assets/images/jobHunterLogo.png";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { setJobsLogout } from "../../features/jobs/jobsSlice";
import ThemeSwitcher from "../functional/ThemeSwitcher";
import { setSearchJobsLogout } from "../../features/searchJobs/searchJobsSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePathChange = () => {
      switch (window.location.pathname) {
        case "/dashboard":
          setActive("Dashboard");
          break;
        case "/jobs":
          setActive("Jobs");
          break;
        case "/search":
          setActive("Search");
          break;
        case "/profile":
          setActive("Profile");
          break;
        case "/about":
          setActive("About");
          break;
        default:
          setActive("Dashboard");
          break;
      }
    };

    handlePathChange();
  }, []);

  const logoutUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Logout failed");
      }

      const data = await response.json();
      console.log(data);

      dispatch(logout());
      dispatch(setJobsLogout());
      dispatch(setSearchJobsLogout());
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="lg:size-full lg:flex lg:flex-col lg:items-center lg:pt-8 lg:relative bg-primary-dark dark:bg-primaryDark-light lg:dark:border-r-4 lg:dark:border-primaryDark-light xsm:flex xsm:flex-row xsm:centred xsm:w-full">
      <div className="xsm:hidden md:flex xsm:w-1/3 xsm:h-full sm:flex sm:justify-center sm:items-center sm:p-2 lg:p-4 lg:w-full md:h-28">
        <div className="lg:w-24 lg:h-24 bg-primary rounded-full lg:mb-10 xsm:mb-0 xsm:h-full xsm:w-24 md:w-16 md:h-16 xsm:centred">
          <img
            src={Logo}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
          <p className="text-center text-secondary mt-2 dark:text-secondaryDark xsm:hidden lg:block">
            jobHunter
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center w-full xsm:p-0 lg:p-4 rounded-lg font-nunito lg:text-xl text-secondary dark:text-secondaryDark">
        <div className="xsm:flex xsm:flex-row xsm:justify-end lg:flex-col lg:justify-start w-full p-4 rounded-lg gap-2">
          <a
            href="/dashboard"
            alt="Dashboard"
            className="py-2 lg:px-2 xsm:px-4 hover:text-accent-dark cursor-pointer rounded-lg xsm:flex xsm:justify-center xsm:items-center lg:flex lg:items-center lg:justify-start"
            style={
              active === "Dashboard"
                ? { backgroundColor: "#BA181B", color: "white" }
                : {}
            }
          >
            <span
              className={`xsm:flex xsm:flex-col xsm:justify-center xsm:items-center lg:flex lg:items-center lg:justify-start lg:flex-row md:${
                active === "Dashboard" ? "flex-row" : "flex-col"
              }`}
            >
              <HomeRepairServiceIcon
                className="-mt-1 lg:mr-2"
                fontSize="large"
              />
              <span
                className={`xsm:text-xs md:text-lg lg:text-xl md:${
                  active === "Dashboard" ? "ml-2" : ""
                }`}
              >
                Dashboard
              </span>
            </span>
          </a>
          <a
            href="/jobs"
            alt="Jobs"
            className="py-2 lg:px-2 xsm:px-4 hover:text-accent-dark cursor-pointer rounded-lg xsm:flex xsm:justify-center xsm:items-center lg:flex lg:items-center lg:justify-start"
            style={
              active === "Jobs"
                ? { backgroundColor: "#BA181B", color: "white" }
                : {}
            }
          >
            <span
              className={`xsm:flex xsm:flex-col xsm:justify-center xsm:items-center lg:flex lg:items-center lg:justify-start lg:flex-row md:${
                active === "Jobs" ? "flex-row" : "flex-col"
              }`}
            >
              <WorkIcon className="-mt-1 lg:mr-2" fontSize="large" />
              <span
                className={`xsm:text-xs md:text-lg lg:text-xl md:${
                  active === "Jobs" ? "ml-2" : ""
                }`}
              >
                Jobs
              </span>
            </span>
          </a>
          <a
            href="/search"
            alt="Search"
            className="py-2 lg:px-2 xsm:px-4 hover:text-accent-dark cursor-pointer rounded-lg xsm:flex xsm:justify-center xsm:items-center lg:flex lg:items-center lg:justify-start"
            style={
              active === "Search"
                ? { backgroundColor: "#BA181B", color: "white" }
                : {}
            }
          >
            <span
              className={`xsm:flex xsm:flex-col xsm:justify-center xsm:items-center lg:flex lg:items-center lg:justify-start lg:flex-row md:${
                active === "Search" ? "flex-row" : "flex-col"
              }`}
            >
              <SearchIcon className="-mt-1 lg:mr-2" fontSize="large" />
              <span
                className={`xsm:text-xs md:text-lg lg:text-xl md:${
                  active === "Search" ? "ml-2" : ""
                }`}
              >
                Search
              </span>
            </span>
          </a>
          <a
            href="/profile"
            alt="Profile"
            className="py-2 lg:px-2 xsm:px-4 hover:text-accent-dark cursor-pointer rounded-lg xsm:flex xsm:justify-center xsm:items-center lg:flex lg:items-center lg:justify-start"
            style={
              active === "Profile"
                ? { backgroundColor: "#BA181B", color: "white" }
                : {}
            }
          >
            <span
              className={`xsm:flex xsm:flex-col xsm:justify-center xsm:items-center lg:flex lg:items-center lg:justify-start lg:flex-row md:${
                active === "Profile" ? "flex-row" : "flex-col"
              }`}
            >
              <PersonIcon className="-mt-1 lg:mr-2" fontSize="large" />
              <span
                className={`xsm:text-xs md:text-lg lg:text-xl md:${
                  active === "Profile" ? "ml-2" : ""
                }`}
              >
                Profile
              </span>
            </span>
          </a>
          <a
            href="/about"
            alt="About"
            className="py-2 lg:px-2 xsm:px-4 hover:text-accent-dark cursor-pointer rounded-lg xsm:flex xsm:justify-center xsm:items-center lg:flex lg:items-center lg:justify-start"
            style={
              active === "About"
                ? { backgroundColor: "#BA181B", color: "white" }
                : {}
            }
          >
            <span
              className={`xsm:flex xsm:flex-col xsm:justify-center xsm:items-center lg:flex lg:items-center lg:justify-start lg:flex-row md:${
                active === "About" ? "flex-row" : "flex-col"
              }`}
            >
              <FavoriteIcon className="-mt-1 lg:mr-2" fontSize="large" />
              <span
                className={`xsm:text-xs md:text-lg lg:text-xl md:${
                  active === "About" ? "ml-2" : ""
                }`}
              >
                About
              </span>
            </span>
          </a>
          {/* <ThemeSwitcher /> */}
        </div>
      </div>
      <div className="xsm:flex xsm:justify-center xsm:items-center lg:justify-start lg:absolute lg:bottom-0 p-4 text-white text-lg lg:w-full">
        <button
          className="text-secondary dark:text-secondaryDark hover:text-accent dark:hover:text-accentDark cursor-pointer"
          onClick={logoutUser}
        >
          <LogoutIcon className="-mt-1 lg:mr-2" fontSize="large" />
          <span className="xsm:text-xs lg:text-2xl">Logout</span>
        </button>
      </div>
      <div className="absolute top-0 -z-10">
        <ThemeSwitcher hidden={true} />
      </div>
    </div>
  );
};

export default Sidebar;
