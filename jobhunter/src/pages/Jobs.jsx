import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TableComponent from "../components/TableComponent/TableComponent";

const Jobs = () => {
  const jobs = useSelector((state) => state.jobs.jobs);
  const appliedJobs = jobs.filter((job) => job.status === "Applied").length;
  const interviewingJobs = jobs.filter(
    (job) => job.status === "Interviewing"
  ).length;
  const offerJobs = jobs.filter(
    (job) => job.status === "Offer Received"
  ).length;
  const deniedJobs = jobs.filter((job) => job.status === "Rejected").length;
  const noResponse = jobs.filter((job) => job.status === "No response").length;

  return (
    <>
      <Layout>
        <div className="flex flex-col h-screen text-secondary font-nunito dark:bg-primaryDark dark:text-secondaryDark p-4">
          {/* <h1 className="text-3xl text-secondary-dark w-full mt-4 ml-2 dark:text-secondaryDark-light">
            Welcome back, {user.username}!
          </h1>
          <p className="text-secondary-dark dark:text-secondaryDark-dark ml-2">
            {currentDate}
          </p> */}
          <h2 className="px-4 pt-2 text-3xl mb-2">My Job board</h2>
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
                  {appliedJobs}
                </p>
              </div>
            </div>
            <div className="centred bg-primary-dark p-4 rounded-lg w-1/3 gap-6 dark:bg-primaryDark-light">
              <div className="flex justify-between items-center rounded-full w-fit bg-yellow-600 p-3">
                <RotateRightIcon fontSize="large" />
              </div>
              <div className="centred flex-col">
                <p className="text-lg text-secondary dark:text-secondaryDark">
                  Interviewing
                </p>
                <p className="text-4xl text-secondary-dark font-bold dark:text-secondaryDark">
                  {interviewingJobs}
                </p>
              </div>
            </div>
            <div className="centred bg-primary-dark p-4 rounded-lg w-1/3 gap-6 dark:bg-primaryDark-light">
              <div className="flex justify-between items-center rounded-full w-fit bg-green-600 p-3">
                <WorkOutlineIcon fontSize="large" />
              </div>
              <div className="centred flex-col">
                <p className="text-lg text-secondary dark:text-secondaryDark">
                  Offer Received
                </p>
                <p className="text-4xl text-secondary-dark font-bold dark:text-secondaryDark">
                  {offerJobs}
                </p>
              </div>
            </div>
            <div className="centred bg-primary-dark p-4 rounded-lg w-1/3 gap-6 dark:bg-primaryDark-light">
              <div className="flex justify-between items-center rounded-full w-fit bg-red-600 p-3">
                <CloseIcon fontSize="large" />
              </div>
              <div className="centred flex-col">
                <p className="text-lg text-secondary dark:text-secondaryDark">
                  Rejected
                </p>
                <p className="text-4xl text-secondary-dark font-bold dark:text-secondaryDark">
                  {deniedJobs}
                </p>
              </div>
            </div>
            <div className="centred bg-primary-dark p-4 rounded-lg w-1/3 gap-6 dark:bg-primaryDark-light">
              <div className="flex justify-between items-center rounded-full w-fit bg-slate-500 p-3">
                <QuestionMarkIcon fontSize="large" />
              </div>
              <div className="centred flex-col">
                <p className="text-lg text-secondary dark:text-secondaryDark">
                  No response
                </p>
                <p className="text-4xl text-secondary-dark font-bold dark:text-secondaryDark">
                  {noResponse}
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
