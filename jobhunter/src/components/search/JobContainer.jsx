import { PropTypes } from "prop-types";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";

const JobContainer = ({ item, onClick, viewDetails }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const stripDescription = (item) => {
    // Check if the job description is longer than 350 characters
    if (item.jobDescription.length > 650) {
      // Return the substring with an ellipsis added
      return item.jobDescription.substring(0, 650) + "...";
    } else {
      // Return the full description without an ellipsis
      return item.jobDescription;
    }
  };

  const JobDescription = ({ htmlContent }) => {
    const cleanContent = DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: [], // No tags allowed
      ALLOWED_ATTR: [], // No attributes allowed
    });
    const formattedContent = cleanContent.replace(/&nbsp;/g, " ").trim();

    return <p className="text-sm"> {formattedContent} </p>;
  };

  JobDescription.propTypes = {
    htmlContent: PropTypes.string,
  };

  const formatSalary = (salary) => {
    return salary
      ? new Intl.NumberFormat("en-GB").format(salary)
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
        <JobDescription htmlContent={stripDescription(item)} />
      </p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-lg">Salary Range:</p>
        <p className="text-lg">
          {item.minimumSalary === null || item.maximumSalary === null
            ? "Not provided"
            : `
          ${
            item.currency === "GBP" ? "£" : item.currency === "USD" ? "$" : "€"
          } ${formatSalary(item.minimumSalary)} - ${formatSalary(
                item.maximumSalary
              )}
          `}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-secondary dark:text-secondaryDark-dark cursor-pointer hover:text-secondary-dark dark:hover:text-secondaryDark-light"
            onClick={viewDetails}
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
        <div className="flex items-center justify-center gap-4">
          <img
            src={darkMode ? item.logos.dark : item.logos.light}
            alt="Company Logo"
            className="w-24 bg-center bg-contain bg-no-repeat"
          />
        </div>
      </div>
    </div>
  );
};

JobContainer.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
  viewDetails: PropTypes.func,
};

export default JobContainer;
