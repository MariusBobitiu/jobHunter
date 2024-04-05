import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TableComponent from "../components/TableComponent/TableComponent";
import { useEffect } from "react";

const Jobs = () => {
  const phone = window.innerWidth < 520;

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

  useEffect(() => {
    document.title = "Jobs - JobHunter";
  }, []);

  const smallScreen = window.innerWidth < 1028;

  return (
    <>
      <Layout>
        <div className="w-full h-dvh text-secondary font-nunito dark:bg-primaryDark dark:text-secondaryDark p-4">
          <div className="size-full xsm:mt-20 sm:mt-28 lg:mt-0 xsm:overflow-auto lg:overflow-hidden">
            <h2 className="px-4 pt-2 xsm:text-lg sm:text-3xl mb-2">
              My Job board
            </h2>
            <div className="flex xsm:justify-center xsm:items-center lg:justify-normal lg:items-normal gap-4 px-4 w-full xsm:flex-wrap lg:flex-nowrap">
              <div className="centred bg-primary-dark xsm:p-2 lg:p-4 rounded-lg xsm:w-[30%] lg:w-1/5 gap-6 dark:bg-primaryDark-light">
                {!phone && (
                  <div className="flex justify-between items-center rounded-full w-fit bg-indigo-600 p-3">
                    <CheckIcon fontSize={smallScreen ? "small" : "large"} />
                  </div>
                )}
                <div className="centred flex-col">
                  <p className="xsm:text-xs lg:text-lg text-center">Applied</p>
                  <p
                    className={`xsm:text-3xl lg:text-4xl ${
                      phone ? "bg-indigo-600 px-3 pt-1 mt-1 rounded-full" : ""
                    }`}
                  >
                    {appliedJobs}
                  </p>
                </div>
              </div>
              <div className="centred bg-primary-dark xsm:p-2 lg:p-4 rounded-lg xsm:w-[30%] lg:w-1/5 gap-6 dark:bg-primaryDark-light">
                {!phone && (
                  <div className="flex justify-between items-center rounded-full w-fit bg-yellow-600 p-3">
                    <RotateRightIcon
                      fontSize={smallScreen ? "small" : "large"}
                    />
                  </div>
                )}
                <div className="centred flex-col">
                  <p className="xsm:text-xs lg:text-lg text-center">
                    Interviewing
                  </p>
                  <p
                    className={`xsm:text-3xl lg:text-4xl ${
                      phone ? "bg-yellow-600 px-3 py-1 mt-1 rounded-full" : ""
                    }`}
                  >
                    {interviewingJobs}
                  </p>
                </div>
              </div>
              <div className="centred bg-primary-dark xsm:p-2 lg:p-4 rounded-lg xsm:w-[30%] lg:w-1/5 gap-6 dark:bg-primaryDark-light">
                {!phone && (
                  <div className="flex justify-between items-center rounded-full w-fit bg-green-600 p-3">
                    <WorkOutlineIcon
                      fontSize={smallScreen ? "small" : "large"}
                    />
                  </div>
                )}
                <div className="centred flex-col">
                  <p className="xsm:text-sm lg:text-lg text-center">
                    {" "}
                    Offer Received
                  </p>
                  <p
                    className={`xsm:text-3xl lg:text-4xl ${
                      phone ? "bg-green-600 px-3 pt-1 mt-1 rounded-full" : ""
                    }`}
                  >
                    {offerJobs}
                  </p>
                </div>
              </div>
              <div className="centred bg-primary-dark xsm:p-2 lg:p-4 rounded-lg xsm:w-[30%] lg:w-1/5 gap-6 dark:bg-primaryDark-light">
                {!phone && (
                  <div className="flex justify-between items-center rounded-full w-fit bg-red-600 p-3">
                    <CloseIcon fontSize={smallScreen ? "small" : "large"} />
                  </div>
                )}
                <div className="centred flex-col">
                  <p className="xsm:text-xs lg:text-lg text-center">Rejected</p>
                  <p
                    className={`xsm:text-3xl lg:text-4xl ${
                      phone ? "bg-red-600 px-3 pt-1 mt-1 rounded-full" : ""
                    }`}
                  >
                    {deniedJobs}
                  </p>
                </div>
              </div>
              <div className="centred bg-primary-dark xsm:p-2 lg:p-4 rounded-lg xsm:w-[30%] lg:w-1/5 gap-6 dark:bg-primaryDark-light">
                {!phone && (
                  <div className="flex justify-between items-center rounded-full w-fit bg-slate-500 p-3">
                    <QuestionMarkIcon
                      fontSize={smallScreen ? "small" : "large"}
                    />
                  </div>
                )}
                <div className="centred flex-col">
                  <p className="xsm:text-xs lg:text-lg text-center">
                    {" "}
                    No response
                  </p>
                  <p
                    className={`xsm:text-3xl lg:text-4xl ${
                      phone ? "bg-slate-600 px-3 pt-1 mt-1 rounded-full" : ""
                    }`}
                  >
                    {noResponse}
                  </p>
                </div>
              </div>
            </div>
            <TableComponent />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Jobs;
