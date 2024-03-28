import CloseIcon from "@mui/icons-material/Close";
import { PropTypes } from "prop-types";

const JobDetails = ({ job, onClose }) => {
  return (
    <div className="absolute z-20 top-0 left-0 w-full h-full bg-black bg-opacity-50">
      <div className="absolute z-30 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-primary-dark p-4 rounded-lg w-1/3 gap-6 dark:bg-primaryDark-light border-2 border-accent-light dark:border-accentDark">
        <div className="size-full bg-primary-dark p-4 text-secondary dark:bg-primaryDark-light dark:text-secondaryDark flex-col centred">
          <button
            className="absolute top-2 right-2 text-secondary w-10 h-10 rounded-full dark:text-secondaryDark"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </button>
          <div className="w-full flex flex-col justify-center items-start gap-4">
            <h1 className="text-2xl font-bold">Job Details</h1>
            <div className="flex justify-between w-full">
              <div className="flex flex-col justify-center items-start">
                <p className="text-lg">Company: {job.company}</p>
                <p className="text-lg">Position: {job.position}</p>
                <p className="text-lg">
                  Date Applied: {job.date.split("T")[0].split("-").join("/")}
                </p>
              </div>
              <div className="flex-col centred gap-2">
                <p className="text-lg">Status:</p>
                <p
                  className="text-lg px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor:
                      job.status === "Interviewing"
                        ? "#CA8A04"
                        : job.status === "Applied"
                        ? "#4F46E5"
                        : job.status === "Offer Received"
                        ? "#16A34A"
                        : job.status === "No response"
                        ? "#64748b"
                        : "#EF4444",
                  }}
                >
                  {job.status}
                </p>
              </div>
            </div>
            {job.details && (
              <div className="w-full">
                <p className="text-lg ">Description: </p>
                <p className="text-md text-justify text-secondary/75 dark:text-secondaryDark/75">
                  {job.details}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
JobDetails.propTypes = {
  job: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default JobDetails;
