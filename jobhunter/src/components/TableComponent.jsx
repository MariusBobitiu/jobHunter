import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "../hooks/useFetch";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DatePicker from "react-tailwindcss-datepicker";
import { Select, MenuItem } from "@mui/material";

const TableComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [popUp, setPopUp] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState([]);
  const [addJobPopup, setAddJobPopup] = useState(false);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [details, setDetails] = useState("");
  const StatusOptions = [
    "Applied",
    "Interviewing",
    "Offer Received",
    "Rejected",
  ];

  const fetchJobs = useFetch();
  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await fetchJobs(
          "GET",
          "http://192.168.0.41:8080/api/jobs"
        );
        console.log(data);
        setRows(data);
      } catch (err) {
        console.error(err);
      }
    };

    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteJob = (id) => async () => {
    try {
      await fetchJobs("DELETE", `http://192.168.0.41:8080/api/jobs/${id}`);
      const newRows = rows.filter((row) => row.id !== id);
      setRows(newRows);
    } catch (err) {
      console.error(err);
    }
  };

  const addJob = async () => {
    if (!company || !position || !status || !date.startDate) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await fetchJobs("POST", "http://192.168.0.41:8080/api/jobs", {
        company,
        position,
        status,
        date: date.startDate,
        details,
      });
    } catch (err) {
      console.error(err);
    }
    const data = await fetchJobs("GET", "http://192.168.0.41:8080/api/jobs");
    setRows(data);

    setCompany("");
    setPosition("");
    setStatus("Applied");
    setDate({ startDate: null, endDate: null });
    setDetails("");
    setAddJobPopup(false);
  };

  const updateStatus = async (id, event) => {
    const newStatus = event.target.value;
    console.log(`Updating task ${id} to ${newStatus}`);
    try {
      await fetchJobs("PUT", `http://192.168.0.41:8080/api/jobs/${id}`, {
        status: newStatus,
      });

      const getJobs = await fetchJobs(
        "GET",
        "http://192.168.0.41:8080/api/jobs"
      );
      setRows(getJobs);
    } catch (err) {
      console.error(err);
    }
    console.log("Updated status successfully!");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openJobDescription = (id) => {
    setSelectedRowId(id);
    setPopUp(true);
  };
  const closeJobDescription = () => {
    setSelectedRowId(null);
    setPopUp(false);
  };

  const JobDetails = ({ id }) => {
    const selectedRow = rows.find((row) => row.id === id);
    return (
      <div className="size-full bg-primary-dark p-4 text-secondary dark:bg-primaryDark-light dark:text-secondaryDark flex-col centred">
        <button
          className="absolute top-2 right-2 text-secondary w-10 h-10 rounded-full dark:text-secondaryDark"
          onClick={closeJobDescription}
        >
          <CloseIcon fontSize="small" />
        </button>
        <div className="w-full flex flex-col justify-center items-start gap-4">
          <h1 className="text-2xl font-bold">Job Details</h1>
          <div className="flex justify-between w-full">
            <div className="flex flex-col justify-center items-start">
              <p className="text-lg">Company: {selectedRow.company}</p>
              <p className="text-lg">Position: {selectedRow.position}</p>
              <p className="text-lg">
                Date Applied:{" "}
                {selectedRow.date.split("T")[0].split("-").join("/")}
              </p>
            </div>
            <div className="flex-col centred gap-2">
              <p className="text-lg">Status:</p>
              <p
                className="text-lg px-4 py-2 rounded-lg"
                style={{
                  backgroundColor:
                    selectedRow.status === "Interviewing"
                      ? "#CA8A04"
                      : selectedRow.status === "Applied"
                      ? "#4F46E5"
                      : selectedRow.status === "Offer Received"
                      ? "#16A34A"
                      : "#EF4444",
                }}
              >
                {selectedRow.status}
              </p>
            </div>
          </div>
          {selectedRow.details && (
            <div className="w-full">
              <p className="text-lg ">Description: </p>
              <p className="text-md text-justify text-secondary/75 dark:text-secondaryDark/75">
                {selectedRow.details}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };
  JobDetails.propTypes = {
    id: PropTypes.number.isRequired,
  };

  return (
    <>
      <div className="w-full bg-tertiary p-4 m-2">
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "transparent",
          }}
        >
          <TableContainer
            sx={{
              maxHeight: "60vh",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Company</TableCell>
                  <TableCell align="center">Position</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="center" color="white">
                          {row.id}
                        </TableCell>
                        <TableCell align="center">{row.company}</TableCell>
                        <TableCell align="center">{row.position}</TableCell>
                        <TableCell align="center">
                          <Select
                            IconComponent={() => null}
                            displayEmpty
                            value={row.status}
                            onChange={(e) => updateStatus(row.id, e)}
                            className="w-3/4 rounded-full mb-2"
                            style={{
                              backgroundColor:
                                row.status === "Interviewing"
                                  ? "#CA8A04"
                                  : row.status === "Applied"
                                  ? "#4F46E5"
                                  : row.status === "Offer Received"
                                  ? "#16A34A"
                                  : "#EF4444",
                              borderRadius: "9999px",
                            }}
                          >
                            {StatusOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell align="center">
                          {row.date.split("T")[0].split("-").join("/")}
                        </TableCell>
                        <TableCell align="center">
                          <button
                            className="bg-indigo-500 text-secondaryDark w-10 h-10 mr-2 rounded-full hover:bg-indigo-700"
                            onClick={() => openJobDescription(row.id)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </button>
                          <button className="bg-yellow-600 text-secondaryDark w-10 h-10 mr-2 rounded-full hover:bg-yellow-700">
                            <EditIcon fontSize="small" />
                          </button>
                          <button
                            className="bg-accent text-secondaryDark w-10 h-10 mr-2 rounded-full hover:bg-accent-dark dark:bg-accentDark dark:hover:bg-accentDark-dark"
                            onClick={deleteJob(row.id)}
                          >
                            <CloseIcon fontSize="small" />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            classes={{
              root: "bg-primary-dark dark:bg-primaryDark-light",
              toolbar: "text-secondary dark:text-secondaryDark",
              spacer: "text-secondary dark:text-secondaryDark",
              actions: "text-secondary dark:text-secondaryDark",
              input: "text-secondary dark:text-secondaryDark",
            }}
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <div
          className="absolute z-20 top-0 left-0 w-full h-full bg-black bg-opacity-50"
          style={{ display: popUp ? "block" : "none" }}
        >
          <div
            className="absolute z-30 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-primary-dark p-4 rounded-lg w-1/3 gap-6 dark:bg-primaryDark-light border-2 border-accent-light dark:border-accentDark"
            style={{ display: popUp ? "block" : "none" }}
          >
            {selectedRowId === null ? null : <JobDetails id={selectedRowId} />}
          </div>
        </div>
        <div className="flex justify-center items-center py-2">
          <button
            className="bg-green-400 text-secondary rounded-lg py-4 w-1/3 dark:bg-green-600 dark:text-secondaryDark text-2xl font-bold hover:bg-green-500 dark:hover:bg-green-700 active:bg-green-700 dark:active:bg-green-800 mt-4"
            onClick={() => setAddJobPopup(true)}
          >
            <span>
              <AddCircleOutlineIcon className="-mt-1 mr-2" fontSize="large" />
            </span>
            Add new job
          </button>
        </div>
        <div
          className="w-screen h-screen z-20 bg-black bg-opacity-50 absolute top-0 left-0"
          style={{ display: addJobPopup ? "block" : "none" }}
        >
          <div className="absolute w-1/2 z-30 px-12 py-8 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-primary-dark rounded-lg gap-6 dark:bg-primaryDark-light border-2 border-accent-light dark:border-accentDark">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">Add new job</h1>
              <button
                className="text-secondary w-10 h-10 rounded-full dark:text-secondaryDark hover:bg-accent-light dark:hover:bg-accentDark-light active:bg-accent-dark dark:active:bg-accentDark"
                onClick={() => setAddJobPopup(false)}
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
              </Select>
              <DatePicker
                showShortcuts={true}
                asSingle={true}
                useRange={false}
                inputClassName="bg-primary-light w-full p-4 rounded-lg dark:bg-primaryDark-dark text-secondary dark:text-secondaryDar mb-2"
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
                  onClick={addJob}
                >
                  Add
                </button>
                <button
                  className="bg-red-400 text-secondary rounded-lg py-2 w-1/3 dark:bg-red-600 dark:text-secondaryDark text-lg font-bold hover:bg-red-500 dark:hover:bg-red-700 active:bg-red-700 dark:active:bg-red-800"
                  onClick={() => setAddJobPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
