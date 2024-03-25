import Layout from "../components/Layout";
import Logo from "../assets/images/jobHunterLogo.png";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ThemeSwitcher from "../components/functional/ThemeSwitcher";
import PasswordIcon from "@mui/icons-material/Password";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { login, updateUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [deleteAccount, setDeleteAccount] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const editProfile = async () => {
    if (!isEditable) {
      setIsEditable(true);
      return;
    } else {
      if (username === user.username && email === user.email) {
        setIsEditable(false);
        return;
      }
      try {
        const updatedUser = {
          userName: username,
          email,
        };
        const response = await fetch(
          `http://192.168.0.41:8080/api/users/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("User updated successfully: ", data);
          dispatch(updateUser({ username: data.username, email: data.email }));

          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");

          setIsEditable(false);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const editPassword = async () => {
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      alert("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword || newPassword.length < 8) {
      alert("Passwords do not match or are too short.");
      return;
    }
    try {
      const response = await fetch(
        `http://192.168.0.41:8080/api/users/password/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
          }),
        }
      );
      const data = await response.json();
      if (data.message == "Wrong Old Password") {
        alert("Old password is incorrect. Please try again.");
        return;
      } else if (response.ok) {
        console.log("Password updated successfully: ", data);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setChangePassword(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.41:8080/api/users/${user.id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("User deleted successfully: ", data);
        navigate("/login");
        dispatch(login({}));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col h-screen text-secondary font-nunito p-6 dark:bg-primaryDark dark:text-secondaryDark">
          <div className="py-4 ml-4 pl-2 border-b-2 border-secondary/50 mb-4 dark:border-secondaryDark/50 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Profile</h1>
            <button
              className="text-accent text-xl font-bold mr-4 dark:text-accentDark"
              onClick={editProfile}
            >
              {isEditable ? (
                <CheckIcon fontSize="large" />
              ) : (
                <EditIcon fontSize="large" />
              )}
            </button>
          </div>
          <div className="flex gap-6 items-center p-4 m-6">
            <div className="w-28 bg-primary rounded-full flex relative">
              <img
                src={Logo}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
              {/* <label
                htmlFor="profilePic"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 rounded-full centred"
              >
                <input
                  type="file"
                  id="profilePic"
                  className="hidden"
                  accept="image/*"
                  onInput={(e) => {
                    localStorage.setItem(
                      "profilePic",
                      URL.createObjectURL(e.target.files[0])
                    );
                  }}
                  disabled={isEditable ? false : true}
                />
                {isEditable && (
                  <div className="size-1/3 rounded-full centred bg-secondary-light dark:bg-secondaryDark p-4 absolute right-0 bottom-0">
                    <EditIcon className="text-primary dark:text-primaryDark" />
                  </div>
                )} 
              </label>
              */}
            </div>
            <div className="flex flex-col w-full h-full bg-tertiary p-4 rounded-lg text-xl text-secondary relative">
              <label htmlFor="name" className="w-full mb-2">
                <p className="mt-2 dark:text-secondaryDark">Your Username</p>
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b-2 border-secondary/50 text-secondary p-2 focus:outline-none focus:border-secondary dark:border-secondaryDark/50 dark:text-secondaryDark-light"
                value={username}
                id="name"
                onChange={(e) => setUsername(e.target.value)}
                disabled={isEditable ? false : true}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold py-4 ml-4 pl-2 border-b-2 border-secondary/50 mb-4 dark:border-secondaryDark/50">
            Account
          </h1>
          <div className="flex flex-col gap-4 p-4 m-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">
                <p className="text-secondary dark:text-secondaryDark">Email</p>
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-transparent border-b-2 border-secondary/50 text-secondary p-2 focus:outline-none focus:border-secondary dark:border-secondaryDark/25 dark:text-secondaryDark-light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isEditable ? false : true}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold py-4 ml-4 pl-2 border-b-2 border-secondary/50 mb-4 dark:border-secondaryDark/50">
            Security
          </h1>
          <div className="flex flex-col gap-4 p-4 m-6">
            <div className="flex justify-between items-center">
              <p className="text-secondary dark:text-secondaryDark">
                Change Password
              </p>
              <button
                className="text-accent w-fit text-xl py-2 my-2 dark:text-accentDark font-bold"
                onClick={() => setChangePassword(true)}
              >
                <ChevronRightIcon fontSize="large" />
              </button>
              {changePassword && (
                <>
                  <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
                    <div className="bg-primary w-2/5 px-6 py-12 rounded-lg flex flex-col justify-center items-start gap-8 border-t-4 border-accent relative dark:bg-primaryDark-light dark:border-accentDark">
                      <div className="flex gap-4 w-full">
                        <div className="centred p-4 bg-accent rounded-full">
                          <PasswordIcon fontSize="large" />
                        </div>
                        <div className="flex items-center">
                          <h1 className="text-3xl text-secondary font-bold dark:text-secondaryDark">
                            Change Password
                          </h1>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 w-full">
                        <label htmlFor="oldPassword">
                          <p className="text-secondary dark:text-secondaryDark">
                            Old Password
                          </p>
                        </label>
                        <input
                          type="password"
                          id="oldPassword"
                          placeholder="********"
                          className="w-full bg-transparent border-b-2 border-secondary/50 text-secondary p-2 focus:outline-none focus:border-secondary dark:border-secondaryDark/25 dark:text-secondaryDark-light"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <label htmlFor="newPassword">
                          <p className="text-secondary dark:text-secondaryDark">
                            New Password
                          </p>
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          placeholder="********"
                          className="w-full bg-transparent border-b-2 border-secondary/50 text-secondary p-2 focus:outline-none focus:border-secondary dark:border-secondaryDark/25 dark:text-secondaryDark-light"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label htmlFor="confirmPassword">
                          <p className="text-secondary dark:text-secondaryDark">
                            Confirm New Password
                          </p>
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          placeholder="********"
                          className="w-full bg-transparent border-b-2 border-secondary/50 text-secondary p-2 focus:outline-none focus:border-secondary dark:border-secondaryDark/25 dark:text-secondaryDark-light"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-4 centred w-full">
                        <button
                          className="bg-accent text-primary font-bold w-48 h-16 rounded-lg text-lg dark:bg-accentDark"
                          onClick={editPassword}
                        >
                          Change Password
                        </button>
                        <button
                          className="text-secondary w-48 h-16 rounded-lg text-lg bg-secondary-light/25 hover:bg-secondary-light/40 dark:text-secondaryDark dark:bg-secondaryDark/25 dark:hover:bg-secondaryDark/40"
                          onClick={() => setChangePassword(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-full flex justify-between items-center">
                <label htmlFor="2fa">
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
                onClick={() => setDeleteAccount(true)}
              >
                Delete Account
              </button>
              {deleteAccount && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-primary w-1/3 h-1/4 p-6 rounded-lg flex flex-col justify-center items-start gap-4 border-t-4 border-accent relative dark:bg-primaryDark-light dark:border-accentDark">
                    <h1 className="text-3xl text-secondary font-bold dark:text-secondaryDark">
                      Delete Account
                    </h1>
                    <p className="text-secondary-dark font-medium text-xl mb-4 dark:text-secondaryDark">
                      Are you sure you want to delete your account?{" "}
                      <span className="text-secondary/75 font-normal dark:text-secondaryDark/75">
                        If you delete your account, you will permanently lose
                        your profile, personal settings, and all other data
                        associated with your account.
                      </span>
                    </p>
                    <button
                      className="absolute top-2 right-4 text-4xl"
                      onClick={() => setDeleteAccount(false)}
                    >
                      &times;
                    </button>
                    <div className="flex gap-4 centred w-full">
                      <button
                        className="bg-accent text-primary font-bold w-48 h-16 rounded-lg text-lg dark:bg-accentDark"
                        onClick={deleteUser}
                      >
                        Delete Account
                      </button>
                      <button
                        className="text-secondary w-48 h-16 rounded-lg text-lg bg-secondary-light/25 hover:bg-secondary-light/40 dark:text-secondaryDark dark:bg-secondaryDark/25 dark:hover:bg-secondaryDark/40"
                        onClick={() => setDeleteAccount(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <h1 className="text-3xl font-bold py-4 ml-4 pl-2 border-b-2 border-secondary/50 mb-4 dark:border-secondaryDark/50">
            Preferences
          </h1>
          <div className="flex flex-col gap-4 p-4 m-6">
            <div className="flex flex-col gap-2">
              <div className="w-full flex justify-between items-center">
                <p className="text-secondary dark:text-secondaryDark">
                  Dark Mode
                </p>
                <ThemeSwitcher />
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
