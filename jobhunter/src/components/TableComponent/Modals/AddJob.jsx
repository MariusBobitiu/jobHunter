import PropTypes from "prop-types";
import { useState } from "react";
// import { useSelector } from "react-redux";
// import useFetch from "../../../hooks/useFetch";
import CloseIcon from "@mui/icons-material/Close";
import { Select, MenuItem } from "@mui/material";
import Datepicker from "react-tailwindcss-datepicker";

const AddJobPopupComponent = ({ onAdd, isVisible, onClose }) => {
  // const user = useSelector((state) => state.user.user);
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
      <div className="absolute w-1/2 z-30 px-12 py-8 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-primary-dark rounded-lg gap-6 dark:bg-primaryDark-light border-2 border-accent-light dark:border-accentDark">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Add new job</h1>
          <button
            className="text-secondary w-10 h-10 rounded-full dark:text-secondaryDark hover:bg-accent-light dark:hover:bg-accentDark-light active:bg-accent-dark dark:active:bg-accentDark"
            onClick={onClose}
          >
            <CloseIcon fontSize="medium" />
          </button>
        </div>
        <div className="flex-col centred gap-4 p-6 my-4">
          <input
            type="text"
            placeholder="Company"
            className="bg-primary-light p-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Position"
            className="bg-primary-light p-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <Select
            displayEmpty
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-primary-light w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2 outline:none rounded-lg"
          >
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Interviewing">Interviewing</MenuItem>
            <MenuItem value="Offer Received">Offer Received</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="No response">No response</MenuItem>
          </Select>
          <Datepicker
            showShortcuts={true}
            asSingle={true}
            useRange={false}
            inputClassName="bg-primary-light w-full p-4 rounded-lg dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
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
          <textarea
            placeholder="Details"
            className="bg-primary-light p-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <div className="centred gap-4 w-full">
            <button
              className="bg-green-400 text-secondary rounded-lg py-2 w-1/3 dark:bg-green-600 dark:text-secondaryDark text-lg font-bold hover:bg-green-500 dark:hover:bg-green-700 active:bg-green-700 dark:active:bg-green-800"
              onClick={handleSubmit}
            >
              Add
            </button>
            <button
              className="bg-red-400 text-secondary rounded-lg py-2 w-1/3 dark:bg-red-600 dark:text-secondaryDark text-lg font-bold hover:bg-red-500 dark:hover:bg-red-700 active:bg-red-700 dark:active:bg-red-800"
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
