import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import CloseIcon from "@mui/icons-material/Close";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TableComponent from "../components/TableComponent";

const Jobs = () => {
  const user = useSelector((state) => state.user.user);
  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      <Layout>
        <div className="flex flex-col h-screen text-secondary font-nunito dark:bg-primaryDark dark:text-secondaryDark">
          <h1 className="text-3xl text-secondary-dark w-full mt-4 ml-2 dark:text-secondaryDark-light">
            Welcome back, {user.username}!
          </h1>
          <p className="text-secondary-dark dark:text-secondaryDark-dark ml-2">
            {currentDate}
          </p>
          <h3 className="mt-2 px-4 pt-2 text-lg">My Job board</h3>
          <div className="flex gap-4 px-4 w-full">
            <div className="centred bg-primary-dark p-4 rounded-lg w-1/3 gap-6 dark:bg-primaryDark-light">
              <div className="flex justify-between items-center rounded-full w-fit bg-indigo-600 p-3">
                <CheckIcon fontSize="large" />
              </div>
              <div className="centred flex-col">
                <p className="text-lg text-secondary dark:text-secondaryDark">
                  Applied
                </p>
                <p className="text-4xl text-secondary-dark font-bold dark:text-secondaryDark">
                  8
                </p>
              </div>
            </div>
            <div className="centred bg-primary-dark p-4 rounded-lg w-1/3 gap-6 dark:bg-primaryDark-light">
              <div className="flex justify-between items-center rounded-full w-fit bg-yellow-600 p-3">
                <RotateRightIcon fontSize="large" />
              </div>
              <div className="centred flex-col">
                <p className="text-lg text-secondary dark:text-secondaryDark">
                  In progress
                </p>
                <p className="text-4xl text-secondary-dark font-bold dark:text-secondaryDark">
                  12
                </p>
              </div>
            </div>
            <div className="centred bg-primary-dark p-4 rounded-lg w-1/3 gap-6 dark:bg-primaryDark-light">
              <div className="flex justify-between items-center rounded-full w-fit bg-green-600 p-3">
                <WorkOutlineIcon fontSize="large" />
              </div>
              <div className="centred flex-col">
                <p className="text-lg text-secondary dark:text-secondaryDark">
                  Offer
                </p>
                <p className="text-4xl text-secondary-dark font-bold dark:text-secondaryDark">
                  4
                </p>
              </div>
            </div>
            <div className="centred bg-primary-dark p-4 rounded-lg w-1/3 gap-6 dark:bg-primaryDark-light">
              <div className="flex justify-between items-center rounded-full w-fit bg-red-600 p-3">
                <CloseIcon fontSize="large" />
              </div>
              <div className="centred flex-col">
                <p className="text-lg text-secondary dark:text-secondaryDark">
                  Denied
                </p>
                <p className="text-4xl text-secondary-dark font-bold dark:text-secondaryDark">
                  20
                </p>
              </div>
            </div>
          </div>
          <TableComponent />
        </div>
      </Layout>
    </>
  );
};

export default Jobs;
