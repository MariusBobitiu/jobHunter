import { PropTypes } from "prop-types";

const JobContainer = ({ item, onClick }) => {
  const openDescription = (jobId) => {
    console.log(jobId);
  };

  const formatSalary = (salary) => {
    return salary
      ? new Intl.NumberFormat("de-DE").format(salary)
      : "Not provided";
  };

  return (
    <div
      key={item.JobId}
      className="flex flex-col w-full gap-1 p-4 rounded-lg bg-primary-dark dark:bg-primaryDark-light py-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{item.jobTitle}</h1>
        <p className="text-md">{item.date}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-md italic">{item.employerName}</p>
        <p className="text-md italic">{item.locationName}</p>
      </div>
      <p className="text-sm text-secondary-light dark:text-secondaryDark-dark">
        {item.jobDescription}
      </p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-lg">Salary Range:</p>
        <p className="text-lg">
          {item.currency === "GBP" ? "£" : item.currency === "USD" ? "$" : "€"}{" "}
          {formatSalary(item.minimumSalary)} -{" "}
          {formatSalary(item.maximumSalary)}{" "}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="#"
          className="text-secondary dark:text-secondaryDark-dark cursor-pointer hover:text-secondary-dark dark:hover:text-secondaryDark-light"
          onClick={() => {
            openDescription(item.jobId);
          }}
        >
          View More Details
        </a>
        <a
          href={item.jobUrl}
          target="_blank"
          rel="noreferrer"
          className="text-accent-dark cursor-pointer hover:text-accent-light"
          onClick={onClick}
        >
          Apply now
        </a>
      </div>
    </div>
  );
};

JobContainer.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};

export default JobContainer;
