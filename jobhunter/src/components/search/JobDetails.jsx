import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

const JobDetails = ({ jobId, closePopup, onClick }) => {
  const [job, setJob] = useState({});

  const getJob = async (jobId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/searchJobs/reed/${jobId}`
      );
      console.log(
        `Fetching data from: ${
          import.meta.env.VITE_API_BASE_URL
        }/searchJobs/reed/${jobId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data. Status: ${response.status}, message: ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log(data);
      setJob(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cleanDescription = (description) => {
    return DOMPurify.sanitize(description);
  };

  useEffect(() => {
    getJob(jobId);
    cleanDescription(job.jobDescription);
    console.log(job);
  }, [jobId]);

  const JobDescription = ({ htmlContent }) => {
    return (
      <div
        className="text-secondary-dark dark:text-secondaryDark-dark h-full overflow-scroll"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    );
  };

  JobDescription.propTypes = {
    htmlContent: PropTypes.string.isRequired,
  };

  return (
    <>
      <div className="w-screen h-dvh flex justify-center items-center absolute top-0 left-0 bg-black/75 z-30 overflow-hidden">
        <div className="w-2/3 h-3/4 bg-primary-dark dark:bg-primaryDark-light rounded-lg p-8 relative">
          <span
            className="absolute top-2 right-4 text-3xl cursor-pointer"
            onClick={closePopup}
          >
            &times;
          </span>
          <h1 className="text-2xl text-secondary dark:text-secondaryDark font-bold">
            {job.jobTitle}
          </h1>
          <div className="w-full flex justify-between pb-4">
            <div className="flex flex-col justify-center text-secondary-dark dark:text-secondaryDark-dark">
              <p className="text-md">
                Job Type: {job.contractType} -{" "}
                {job.fullTime
                  ? "Full Time"
                  : job.partTime
                  ? "Part Time"
                  : "Temporary"}
              </p>
              <p className="text-md">Posted on: {job.datePosted}</p>
              <p className="text-md">Salary Range: </p>
            </div>
            <div className="flex flex-col justify-center text-secondary-dark dark:text-secondaryDark-dark mr-8">
              <p className="text-md ">Company: {job.employerName}</p>
              <p className="text-md ">Location: {job.locationName}</p>
              <p className="text-md">{job.salary || "Not Provided"}</p>
            </div>
          </div>
          <div className="w-full h-4/6 pb-8">
            <p className="text-lg text-secondary-dark dark:text-secondaryDark-light pb-2">
              Job Description:{" "}
            </p>
            <JobDescription htmlContent={job.jobDescription} />
          </div>
          <div className="flex justify-between items-center text-secondary-light dark:text-secondaryDark-dark text-md pt-4">
            <p>Applications: {job.applicationCount}</p>
            <p>Expiry: {job.expirationDate}</p>
          </div>
          <div className="flex justify-center items-center gap-4 py-4">
            <a
              href={job.externalUrl ? job.externalUrl : job.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-accent dark:bg-accentDark text-secondary dark:text-secondaryDark hover:bg-accent-dark dark:hover:bg-accentDark-dark rounded-lg py-2 px-8"
              onClick={onClick}
            >
              Apply Now
            </a>
            <button
              className="rounded-lg py-2 px-8 text-secondary dark:text-secondaryDark hover:text-secondary-dark dark:hover:text-secondaryDark-dark"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

JobDetails.propTypes = {
  jobId: PropTypes.string.isRequired,
  closePopup: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default JobDetails;
