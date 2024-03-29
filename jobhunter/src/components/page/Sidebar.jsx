import Logo from "../../assets/images/jobHunterLogo.png";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { setJobsLogout } from "../../features/jobs/jobsSlice";
import ThemeSwitcher from "../functional/ThemeSwitcher";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const dispatch = useDispatch();

  useEffect(() => {
    const handlePathChange = () => {
      switch (window.location.pathname) {
        case "/dashboard":
          setActive("Dashboard");
          break;
        case "/jobs":
          setActive("Jobs");
          break;
        case "/Profile":
          setActive("Profile");
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

  return (
    <div className="size-full flex flex-col items-center py-8 relative bg-primary-dark dark:bg-primaryDark-light dark:border-r-4 dark:border-primaryDark-light">
      <div className="w-24 h-24 bg-primary rounded-full mb-10">
        <img
          src={Logo}
          alt="profile"
          className="w-full h-full object-cover rounded-full"
        />
        <p className="text-center text-secondary mt-2 dark:text-secondaryDark">
          jobHunter
        </p>
      </div>
      <div className="flex flex-col items-center w-full h-full p-4 rounded-lg font-nunito text-xl text-secondary dark:text-secondaryDark">
        <div className="flex flex-col w-full h-full p-4 rounded-lg gap-2">
          <a
            href="/dashboard"
            alt="Dashboard"
            className="py-4 px-2 hover:text-accent-dark cursor-pointer rounded-lg"
            style={
              active === "Dashboard"
                ? { backgroundColor: "#BA181B", color: "white" }
                : {}
            }
          >
            <span>
              <HomeRepairServiceIcon className="-mt-2 mr-2" fontSize="large" />
              Dashboard
            </span>
          </a>
          <a
            href="/jobs"
            alt="Jobs"
            className="py-4 px-2 hover:text-accent cursor-pointer rounded-lg"
            style={
              active === "Jobs"
                ? { backgroundColor: "#BA181B", color: "white" }
                : {}
            }
          >
            <span>
              <WorkIcon className="-mt-2 mr-2" fontSize="large" />
              Jobs
            </span>
          </a>
          <a
            href="/profile"
            alt="Profile"
            className="py-4 px-2 hover:text-accent cursor-pointer rounded-lg"
            style={
              active === "Profile"
                ? { backgroundColor: "#BA181B", color: "white" }
                : {}
            }
          >
            <span>
              <PersonIcon className="-mt-2 mr-2" fontSize="large" />
              Profile
            </span>
          </a>
          <a
            href="/about"
            alt="About"
            className="py-4 px-2 hover:text-accent cursor-pointer rounded-lg"
            style={
              active === "About"
                ? { backgroundColor: "#BA181B", color: "white" }
                : {}
            }
          >
            <span>
              <SettingsIcon className="-mt-2 mr-2" fontSize="large" />
              About
            </span>
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 w-full p-4 text-white text-lg">
        <button
          className="hover:text-accentLight cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(logout());
            dispatch(setJobsLogout());
            window.location.href = "/login";
          }}
        >
          <LogoutIcon
            className="-mt-2 mr-2 text-secondary dark:text-secondaryDark"
            fontSize="large"
          />
          <span className="text-2xl text-secondary dark:text-secondaryDark">
            Logout
          </span>
        </button>
      </div>
      <div className="absolute top-0 -z-10">
        <ThemeSwitcher hidden={true} />
      </div>
    </div>
  );
};

export default Sidebar;
