import { useState } from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from "react-tailwindcss-datepicker";
import {
  StyledMenuItem,
  StyledSelect,
  Theme as theme,
} from "../../../utils/StyledComponents";
import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";

const EditJobPopupComponent = ({ job, onSave, onClose }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const phone = window.innerWidth < 520;
  const tablet = window.innerWidth < 1240;
  const id = job.id;
  const [company, setCompany] = useState(job.company);
  const [position, setPosition] = useState(job.position);
  const [status, setStatus] = useState(job.status);
  const [date, setDate] = useState({
    startDate: new Date(job.date),
    endDate: null,
  });
  const [details, setDetails] = useState(job.details);

  const editJob = async () => {
    onSave({ id, company, position, status, date: date.startDate, details });
    onClose();
  };

  return (
    <div className="w-screen h-screen z-20 bg-black bg-opacity-50 absolute top-0 left-0">
      <div className="absolute xsm:w-full xsm:h-full sm:h-fit sm:w-4/6 lg:w-1/2 z-30 xsm:px-2 sm:px-6 lg:px-12 xsm:py-2 sm:py-4 lg:py-8 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-primary-dark rounded-lg gap-6 dark:bg-primaryDark-light border-2 border-primary-dark dark:border-primaryDark-dark">
        <div className="flex justify-between items-center">
          <h1 className="xsm:text-lg sm:text-2xl lg:text-4xl font-bold">
            Edit job
          </h1>
          <button
            className="text-secondary w-10 h-10 rounded-full dark:text-secondaryDark"
            onClick={onClose}
          >
            <CloseIcon fontSize={phone ? "large" : "medium"} />
          </button>
        </div>
        <div className="flex-col centred gap-1 xsm:mt-2 sm:mt-0 sm:p-2 lg:p-6 xsm:my-0 lg:my-2">
          <label
            htmlFor="company"
            className="text-start w-full text-secondary dark:text-secondaryDark -mb-1"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            value={company}
            className="bg-primary-light xsm:py-2 md:py-3 lg:py-4v px-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            onChange={(e) => setCompany(e.target.value)}
          />
          <label
            htmlFor="position"
            className="text-start w-full text-secondary dark:text-secondaryDark -mb-1"
          >
            {" "}
            Position{" "}
          </label>
          <input
            id="position"
            type="text"
            placeholder="Position"
            value={position}
            className="bg-primary-light xsm:py-2 md:py-3 lg:py-4 px-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            onChange={(e) => setPosition(e.target.value)}
          />
          <label
            htmlFor="status"
            className="text-start w-full text-secondary dark:text-secondaryDark -mb-1"
          >
            Status
          </label>
          <ThemeProvider theme={theme}>
            <StyledSelect
              isDarkMode={darkMode}
              isEdit
              labelId="status"
              displayEmpty
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-primary-light w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2 outline:none rounded-lg"
            >
              <StyledMenuItem isDarkMode={darkMode} value="Applied">
                Applied
              </StyledMenuItem>
              <StyledMenuItem isDarkMode={darkMode} value="Interviewing">
                Interviewing
              </StyledMenuItem>
              <StyledMenuItem isDarkMode={darkMode} value="Offer Received">
                Offer Received
              </StyledMenuItem>
              <StyledMenuItem isDarkMode={darkMode} value="Rejected">
                Rejected
              </StyledMenuItem>
              <StyledMenuItem isDarkMode={darkMode} value="No response">
                No response
              </StyledMenuItem>
            </StyledSelect>
          </ThemeProvider>
          <label
            htmlFor="date"
            className="text-start w-full text-secondary dark:text-secondaryDark -mb-1"
          >
            Date
          </label>
          <DatePicker
            showShortcuts={true}
            asSingle={true}
            useRange={false}
            inputClassName="bg-primary-light w-full xsm:py-2 md:py-3 lg:py-4 px-4 rounded-lg dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            popoverDirection="down"
            theme={
              localStorage.getItem("darkMode") === "true" ? "dark" : "light"
            }
            configs={{
              shortcuts: {
                today: "Today",
                yesterday: "Yesterday",
                "3daysAgo": {
                  text: "3 days ago",
                  period: {
                    start: new Date().setDate(new Date().getDate() - 3),
                    end: new Date().setDate(new Date().getDate() - 3),
                  },
                },
                "7daysAgo": {
                  text: "7 days ago",
                  period: {
                    start: new Date().setDate(new Date().getDate() - 7),
                    end: new Date().setDate(new Date().getDate() - 7),
                  },
                },
                "14daysAgo": {
                  text: "14 days ago",
                  period: {
                    start: new Date().setDate(new Date().getDate() - 14),
                    end: new Date().setDate(new Date().getDate() - 14),
                  },
                },
                "30daysAgo": {
                  text: "30 days ago",
                  period: {
                    start: new Date().setDate(new Date().getDate() - 30),
                    end: new Date().setDate(new Date().getDate() - 30),
                  },
                },
              },
            }}
            primaryColor="red"
            value={date}
            onChange={(date) => setDate(date)}
            displayFormat="DD/MM/YYYY"
            startWeekOn="mon"
          />
          <label
            htmlFor="details"
            className="text-start w-full text-secondary dark:text-secondaryDark -mb-1"
          >
            Details
          </label>
          <textarea
            placeholder="Details"
            rows={phone ? 6 : tablet ? 4 : 6}
            value={details}
            className="bg-primary-light py-2 px-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            onChange={(e) => setDetails(e.target.value)}
          />
          <div className="centred gap-4 w-full xsm:flex-col sm:flex-row xsm:mt-2">
            <button
              className="bg-green-400 text-secondary rounded-lg py-2 xsm:w-3/4 sm:w-1/3 dark:bg-green-600 dark:text-secondaryDark text-lg font-bold hover:bg-green-500 dark:hover:bg-green-700 active:bg-green-700 dark:active:bg-green-800"
              onClick={editJob}
            >
              Save
            </button>
            <button
              className="bg-red-400 text-secondary rounded-lg py-2 xsm:w-3/4 sm:w-1/3 dark:bg-red-600 dark:text-secondaryDark text-lg font-bold hover:bg-red-500 dark:hover:bg-red-700 active:bg-red-700 dark:active:bg-red-800"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditJobPopupComponent.propTypes = {
  job: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditJobPopupComponent;
