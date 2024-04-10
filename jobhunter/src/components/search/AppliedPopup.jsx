import { PropTypes } from "prop-types";

const AppliedPopup = ({ job, onClick, closePopup }) => {
  const { jobTitle, employerName, jobId } = job;

  return (
    <div
      className="w-screen h-dvh bg-white/35 dark:bg-black/40 absolute top-0 left-0 z-30"
      key={jobId}
    >
      <div className="xsm:w-3/4 lg:w-1/3 bg-primary-light dark:bg-primaryDark-light text-secondary dark:text-secondaryDark absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg z-40 opacity-100 xsm:px-4 lg:px-12 xsm:py-0 xsm:pt-8 lg:pt-8 lg:py-8">
        <button
          onClick={closePopup}
          className="absolute top-2 right-4 text-3xl text-secondary dark:text-secondaryDark-dark"
        >
          &times;
        </button>
        <h3 className="xsm:text-lg lg:text-2xl font-bold py-2">
          Did you apply to the {jobTitle} position at {employerName}?
        </h3>
        <p className="xsm:text-xs lg:text-sm text-secondary-light dark:text-secondaryDark-dark xsm:px-2 lg:px-8">
          If you applied to this position, please click the button below to
          confirm so we can keep track of your applications. If you haven&apos;t
          applied yet or you don&apos;t want to apply, click the button to close
          this popup.
        </p>
        <div className="flex xsm:flex-col lg:flex-row justify-center xsm:gap-2 lg:gap-4 py-4">
          <button
            className="bg-accentDark hover:bg-accentDark-dark dark:bg-accent dark:hover:bg-accent-dark text-secondaryDark-light dark:text-secondaryDark-light xsm:text-sm lg:text-lg font-medium px-4 py-2 rounded-lg"
            onClick={onClick}
          >
            Yes, I applied
          </button>
          <button
            className="text-secondary dark:text-secondaryDark-dark px-4 py-2 xsm:text-sm lg:text-lg font-medium rounded-lg bg-secondary-light/25 dark:bg-secondaryDark/25 hover:bg-secondary-light/40 dark:hover:bg-secondaryDark/40"
            onClick={closePopup}
          >
            No, I didn&apos;t apply
          </button>
        </div>
      </div>
    </div>
  );
};

AppliedPopup.propTypes = {
  job: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default AppliedPopup;
