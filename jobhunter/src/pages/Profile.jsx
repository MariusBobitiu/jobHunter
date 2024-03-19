import Layout from "../components/Layout";
import Logo from "../assets/images/jobHunterLogo.png";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [active, setActive] = useState(false);
  const [popup, setPopup] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1/api/user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: e.target.value }),
      });
      if (res.status === 200) {
        console.log("Username updated successfully");
      } else {
        console.log("An error occurred while updating username");
      }
    } catch (error) {
      console.error("An error occurred while updating username:", error);
    } finally {
      setActive(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col h-screen text-secondary font-nunito p-6 dark:bg-primaryDark dark:text-secondaryDark">
          <h1 className="text-3xl font-bold py-4 ml-4 pl-2 border-b-2 border-secondary/50 mb-4 dark:border-secondaryDark/50">
            Profile
          </h1>
          <div className="flex gap-6 items-center p-4 m-6">
            <div className="w-28 bg-primary rounded-full flex">
              <img
                src={Logo}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col w-full h-full bg-tertiary p-4 rounded-lg text-xl text-secondary relative">
              <label htmlFor="name" className="w-full mb-2">
                <p className="mt-2 dark:text-secondaryDark">Your Username</p>
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-transparent border-b-2 border-secondary/50 text-secondary p-2 focus:outline-none focus:border-secondary dark:border-secondaryDark/50 dark:text-secondaryDark-light focus:border-secondaryDark-light"
                placeholder={user.username}
                onChange={(e) => {
                  setActive(!!e.target.value);
                }}
              />
              <button
                className="bg-green-600 text-secondary w-[40px] p-2 mt-4 rounded-full absolute right-8 bottom-6 hover:bg-green-700"
                style={active ? { display: "block" } : { display: "none" }}
                onClick={handleClick}
              >
                <CheckIcon />
              </button>
            </div>
          </div>
          <h1 className="text-3xl font-bold py-4 ml-4 pl-2 border-b-2 border-secondary/50 mb-4 dark:border-secondaryDark/50">
            Account
          </h1>
          <div className="flex flex-col gap-4 p-4 m-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">
                <p className="text-secondary dark:text-secondaryDark">
                  Your Email
                </p>
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-transparent border-b-2 border-secondary/50 text-secondary p-2 focus:outline-none focus:border-secondary dark:border-secondaryDark/25 dark:text-secondaryDark-light focus:border-secondaryDark-light"
                placeholder={user.email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">
                <p className="text-secondary dark:text-secondaryDark">
                  Your Password
                </p>
              </label>
              <input
                type="password"
                id="password"
                className="w-full bg-transparent border-b-2 border-secondary/50 text-secondary p-2 focus:outline-none focus:border-secondary dark:border-secondaryDark/25 dark:text-secondaryDark-light focus:border-secondaryDark-light"
                placeholder="********"
                onChange={() => setActive(true)}
              />
              <div style={active ? { display: "block" } : { display: "none" }}>
                <label htmlFor="newPassword">
                  <p className="text-secondary dark:text-secondaryDark">
                    Confirm new Password
                  </p>
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full bg-transparent border-b-2 border-secondary/50 text-secondary p-2 focus:outline-none focus:border-secondary dark:border-secondaryDark/25 dark:text-secondaryDark-light focus:border-secondaryDark-light"
                  placeholder="********"
                />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold py-4 ml-4 pl-2 border-b-2 border-secondary/50 mb-4 dark:border-secondaryDark/50">
            Security
          </h1>
          <div className="flex flex-col gap-4 p-4 m-6">
            <div className="flex flex-col gap-2">
              <div className="w-full flex justify-between items-center">
                <label htmlFor="email">
                  <p className="text-secondary dark:text-secondaryDark">
                    Two Factor Authentication
                  </p>
                </label>
                <input
                  type="checkbox"
                  id="2fa"
                  className="w-6 h-6 rounded-lg bg-secondary/50 dark:border-secondaryDark/50"
                />
              </div>
              <button
                className="text-accent w-fit text-xl py-2 my-2 dark:text-accentDark font-bold"
                onClick={() => setPopup(true)}
              >
                Delete Account
              </button>
              <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
                style={popup ? { display: "flex" } : { display: "none" }}
              >
                <div className="bg-primary w-1/3 h-1/4 p-6 rounded-lg flex flex-col justify-center items-start gap-4 border-t-4 border-accent relative dark:bg-primaryDark-light dark:border-accentDark">
                  <h1 className="text-3xl text-secondary font-bold dark:text-secondaryDark">
                    Delete Account
                  </h1>
                  <p className="text-secondary-dark font-medium text-xl mb-4 dark:text-secondaryDark">
                    Are you sure you want to delete your account?{" "}
                    <span className="text-secondary/75 font-normal dark:text-secondaryDark/75">
                      If you delete your account, you will permanently lose your
                      profile, personal settings, and all other data associated
                      with your account.
                    </span>
                  </p>
                  <button
                    className="absolute top-2 right-4 text-4xl"
                    onClick={() => setPopup(false)}
                  >
                    &times;
                  </button>
                  <div className="flex gap-4 centred w-full">
                    <button
                      className="bg-accent text-primary font-bold w-48 h-16 rounded-lg text-lg dark:bg-accentDark"
                      onClick={() => setPopup(false)}
                    >
                      Delete Account
                    </button>
                    <button
                      className="text-secondary w-48 h-16 rounded-lg text-lg bg-secondary-light/25 hover:bg-secondary-light/40 dark:text-secondaryDark dark:bg-secondaryDark/25 dark:hover:bg-secondaryDark/40"
                      onClick={() => setPopup(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <small className="absolute bottom-2 right-4">
            <p className="text-secondary text-center dark:text-secondaryDark-dark">
              &copy; Made with 💖 by
              <a
                href="http://www.linkedin.com/in/marius-bobitiu"
                className="text-accent font-bold dark:text-accentDark"
              >
                {" "}
                Marius Bobitiu.
              </a>{" "}
              All rights reserved.
            </p>
          </small>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
