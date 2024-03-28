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
import deleteAccountImg from "../assets/images/deleteProfile.svg";
import deleteAccountImgDark from "../assets/images/deleteProfileDark.svg";
// import twoFactorAuthImg from "../assets/images/2fa.svg";
// import twoFactorAuthImgDark from "../assets/images/2faDark.svg";

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
  // --- Two Factor Authentication ---
  // const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  // const [twoFactorAuthPopUp, setTwoFactorAuthPopUp] = useState(false);
  // const isChecked = twoFactorAuth ? true : false;

  // const handleCheckboxChange = () => {
  //   setTwoFactorAuth(!twoFactorAuth);
  //   twoFactorAuth ? setTwoFactorAuthPopUp(false) : setTwoFactorAuthPopUp(true);
  // };
  // --- Two Factor Authentication --- Later implementation

  const darkMode = useSelector((state) => state.darkMode.darkMode);

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
          `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}`,
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
        `${import.meta.env.VITE_API_BASE_URL}/users/password/${user.id}`,
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
        `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}`,
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
        <div className="flex flex-col h-screen text-secondary font-nunito p-4 dark:bg-primaryDark dark:text-secondaryDark">
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
              {/* TODO: Implement profile picture upload */}
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
              {/* TODO: Implement 2FA */}
              {/* <div className="w-full flex justify-between items-center">
                <p className="text-secondary dark:text-secondaryDark">
                  Two Factor Authentication
                </p>
                <label
                  htmlFor="2fa"
                  className="flex cursor-pointer select-none items-center justify-between"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="2fa"
                      className="sr-only"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <div
                      className={`box block h-8 w-14 rounded-full ${
                        darkMode
                          ? "bg-primaryDark-light"
                          : "bg-primaryDark-light"
                      }`}
                    ></div>
                    <div
                      className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full transition ${
                        isChecked
                          ? "translate-x-full bg-accentDark"
                          : "bg-primary"
                      }`}
                    ></div>
                  </div>
                </label>
              </div> */}
              <button
                className="text-accent w-fit text-xl py-2 my-2 dark:text-accentDark font-bold"
                onClick={() => setDeleteAccount(true)}
              >
                Delete Account
              </button>
              {deleteAccount && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-primary w-1/2 p-6 rounded-lg flex flex-col justify-center items-start gap-4 border-t-4 border-accent relative dark:bg-primaryDark-light dark:border-accentDark">
                    <div className="centred gap-6">
                      <div className="size-1/3">
                        <img
                          src={
                            darkMode ? deleteAccountImg : deleteAccountImgDark
                          }
                          alt="delete account"
                          className="size-full"
                        />
                      </div>
                      <div className="flex-col px-6">
                        <h1 className="text-3xl text-secondary font-bold dark:text-secondaryDark">
                          Delete Account
                        </h1>
                        <p className="text-secondary-dark font-medium text-xl mb-4 dark:text-secondaryDark">
                          Are you sure you want to delete your account?{" "}
                          <span className="text-secondary/75 font-normal dark:text-secondaryDark/75">
                            If you delete your account, you will permanently
                            lose your profile, personal settings, and all other
                            data associated with your account.
                          </span>
                        </p>
                        <button
                          className="absolute top-2 right-4 text-4xl"
                          onClick={() => setDeleteAccount(false)}
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4 centred w-full">
                      <button
                        className="bg-accent text-primary font-bold w-48 h-16 rounded-lg text-lg dark:bg-accentDark hover:bg-accent-dark dark:hover:bg-accentDark-dark"
                        onClick={deleteUser}
                      >
                        Confirm
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
              {/* {twoFactorAuthPopUp && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-primary w-3/5 p-10 rounded-lg flex flex-col justify-center items-start gap-4 border-t-4 border-accent relative dark:bg-primaryDark-light dark:border-accentDark">
                    <span className="absolute top-2 right-4 text-4xl">
                      &times;
                    </span>
                    <div className="flex gap-6">
                      <div className="size-1/5">
                        <img
                          src={
                            darkMode ? twoFactorAuthImg : twoFactorAuthImgDark
                          }
                          alt="2fa"
                          className="size-full"
                        />
                      </div>
                      <div className="flex-col gap-4 centred w-full">
                        <h1 className="text-3xl text-secondary font-bold dark:text-secondaryDark">
                          Two Factor Authentication
                        </h1>
                        <p className="text-secondary-dark font-medium text-xl mb-4 dark:text-secondaryDark">
                          Two Factor Authentication has been{" "}
                          <span className="text-accent font-bold dark:text-accentDark">
                            enabled
                          </span>{" "}
                          for your account.
                        </p>
                        <p className="text-secondary-dark font-medium text-xl mb-4 dark:text-secondaryDark">
                          You will need to enter a code sent to your email
                          address every time you log in.
                        </p>
                        <button
                          className="bg-accent text-primary font-bold w-48 h-16 rounded-lg text-lg dark:bg-accentDark"
                          onClick={() => setTwoFactorAuthPopUp(false)}
                        >
                          Got it!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
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
        </div>
      </Layout>
    </>
  );
};

export default Profile;
