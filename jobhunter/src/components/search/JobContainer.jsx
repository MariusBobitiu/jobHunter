import { PropTypes } from "prop-types";

const JobContainer = ({ item }) => {
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
      <p className="text-xs">{item.jobDescription}</p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-lg">Salary Range:</p>
        <p className="text-lg">
          {item.currency === "GBP" ? "£" : item.currency === "USD" ? "$" : "€"}{" "}
          {formatSalary(item.minimumSalary)} -{" "}
          {formatSalary(item.maximumSalary)}{" "}
        </p>
      </div>
      <a
        href="#"
        className="text-accent-dark cursor-pointer hover:text-accent-light"
        onClick={() => {
          openDescription(item.jobId);
        }}
      >
        View Details
      </a>
    </div>
  );
};

JobContainer.propTypes = {
  item: PropTypes.object,
};

export default JobContainer;
