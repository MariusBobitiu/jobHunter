import { useState } from "react";
import PropTypes from "prop-types";
import { Select, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from "react-tailwindcss-datepicker";

const EditJobPopupComponent = ({ job, onSave, onClose }) => {
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
      <div className="absolute w-1/2 z-30 px-12 py-8 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-primary-dark rounded-lg gap-6 dark:bg-primaryDark-light border-2 border-accent-light dark:border-accentDark">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Edit job</h1>
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
            value={company}
            className="bg-primary-light p-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            className="bg-primary-light p-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            onChange={(e) => setPosition(e.target.value)}
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
          <DatePicker
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
            value={date}
            onChange={(date) => setDate(date)}
            displayFormat="DD/MM/YYYY"
            startWeekOn="mon"
          />
          <textarea
            placeholder="Details"
            value={details}
            className="bg-primary-light p-4 rounded-lg w-full dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            onChange={(e) => setDetails(e.target.value)}
          />
          <div className="centred gap-4 w-full">
            <button
              className="bg-green-400 text-secondary rounded-lg py-2 w-1/3 dark:bg-green-600 dark:text-secondaryDark text-lg font-bold hover:bg-green-500 dark:hover:bg-green-700 active:bg-green-700 dark:active:bg-green-800"
              onClick={editJob}
            >
              Save
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

EditJobPopupComponent.propTypes = {
  job: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditJobPopupComponent;
