import PropTypes from "prop-types";
import { useState } from "react";
// import { useSelector } from "react-redux";
// import useFetch from "../../../hooks/useFetch";
import CloseIcon from "@mui/icons-material/Close";
import Datepicker from "react-tailwindcss-datepicker";
import {
  Theme as theme,
  StyledSelect,
  StyledMenuItem,
} from "../../../utils/StyledComponents";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";

const AddJobPopupComponent = ({ onAdd, isVisible, onClose }) => {
  // const user = useSelector((state) => state.user.user);
  const phone = window.innerWidth < 520;
  const tablet = window.innerWidth < 1240;
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = new Date(date.startDate).toISOString();
    onAdd({
      company,
      position,
      status,
      date: formattedDate,
      details,
    });
    setCompany("");
    setPosition("");
    setStatus("Applied");
    setDate({ startDate: null, endDate: null });
    setDetails("");
  };

  if (!isVisible) return null;

  return (
    <div className="w-screen h-screen z-20 bg-black bg-opacity-50 absolute top-0 left-0">
      <div className="absolute xsm:w-full xsm:h-full sm:h-fit sm:w-4/6 lg:w-1/2 z-30 xsm:px-2 sm:px-6 lg:px-12 xsm:py-2 sm:py-4 py-8 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-primary-dark rounded-lg gap-6 dark:bg-primaryDark-light border-2 border-primary-dark dark:border-primaryDark-dark">
        <div className="flex justify-between items-center">
          <h1 className="xsm:text-lg sm:text-2xl text-4xl font-bold">
            Add new job
          </h1>
          <button
            className="text-secondary w-10 h-10 rounded-full dark:text-secondaryDark"
            onClick={onClose}
          >
            <CloseIcon fontSize={phone ? "large" : "medium"} />
          </button>
        </div>
        <div className="flex-col centred xsm:mt-2 sm:mt-0 sm:p-2 gap-1 lg:p-6 xsm:my-0 lg:my-2 culoareText">
          <label
            htmlFor="company"
            className="text-start w-full text-secondary dark:text-secondaryDark -mb-1"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            placeholder="Company"
            className="bg-primary-light xsm:py-2 md:py-3 lg:py-4v px-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <label
            htmlFor="position"
            className="text-start w-full text-secondary dark:text-secondaryDark -mb-1"
          >
            Position
          </label>
          <input
            id="position"
            type="text"
            placeholder="Position"
            className="bg-primary-light xsm:py-2 md:py-3 lg:py-4v px-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
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
            htmlFor="Date"
            className="text-start w-full text-secondary dark:text-secondaryDark -mb-1"
          >
            Date
          </label>
          <Datepicker
            showShortcuts={true}
            asSingle={true}
            useRange={false}
            inputClassName="bg-primary-light xsm:py-2 md:py-3 lg:py-4v px-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
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
            onChange={(date) => setDate(date)}
            value={date}
            displayFormat="DD/MM/YYYY"
            startWeekOn="mon"
          />
          <label
            htmlFor="Details"
            className="text-start w-full text-secondary dark:text-secondaryDark -mb-1"
          >
            Details
          </label>
          <textarea
            id="details"
            placeholder="Details"
            rows={phone ? 6 : tablet ? 4 : 6}
            className="bg-primary-light py-2 px-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <div className="centred gap-4 w-full xsm:flex-col sm:flex-row xsm:mt-2">
            <button
              className="bg-green-400 text-secondary rounded-lg py-2 xsm:w-3/4 sm:w-1/3 dark:bg-green-600 dark:text-secondaryDark text-lg font-bold hover:bg-green-500 dark:hover:bg-green-700 active:bg-green-700 dark:active:bg-green-800"
              onClick={handleSubmit}
            >
              Add
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

AddJobPopupComponent.propTypes = {
  onAdd: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddJobPopupComponent;
