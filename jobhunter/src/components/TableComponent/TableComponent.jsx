// MATERIAL UI COMPONENTS
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Select, MenuItem, LinearProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Hooks
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobsStart,
  getJobsSuccess,
  getJobsFailure,
  setSortState,
} from "../../features/jobs/jobsSlice";

// Material UI Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//Images
import lightPlaceholder from "../../assets/images/Table-Placeholder.svg";
import darkPlaceholder from "../../assets/images/Table-PlaceholderDark.svg";

// Components
import AddJobPopupComponent from "./Modals/AddJob";
import EditJobPopupComponent from "./Modals/EditJob";
import JobDetails from "./Modals/JobDetails";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F5F5F5",
      dark: "#090A0C",
    },
    secondary: {
      main: "#E7EDEE",
      dark: "#121517",
    },
    hover: {
      main: "#D4DFE1",
      dark: "#232A2F",
    },
    text: {
      light: "#090A0C",
      dark: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
  },
});

const StyledTableCell = styled(TableCell)(({ isDarkMode, theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "transparent",
    color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
    border: "none",
    borderBottom: isDarkMode ? "1px solid #3C4A53" : "1px solid #AAC0C5",
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "transparent",
    color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
    fontSize: 14,
    border: "none",
  },
}));

const StyledTableRow = styled(TableRow)(({ isDarkMode, isHeading, theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: isHeading
      ? isDarkMode
        ? "#161A1D"
        : theme.palette.hover.main
      : isDarkMode
      ? theme.palette.primary.dark
      : theme.palette.primary.main,
  },
  "&:nth-of-type(even)": {
    backgroundColor: isHeading
      ? isDarkMode
        ? "#161A1D"
        : theme.palette.hover.main
      : isDarkMode
      ? theme.palette.secondary.dark
      : theme.palette.secondary.main,
  },
  "&:hover": {
    backgroundColor: isHeading
      ? isDarkMode
        ? "#161A1D"
        : theme.palette.hover.main
      : isDarkMode
      ? theme.palette.hover.dark
      : theme.palette.hover.main,
  },
}));

const TableComponent = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = useSelector((state) => state.jobs.jobs);
  const [addJobPopup, setAddJobPopup] = useState(false);
  const [viewJob, setViewJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const sortState = useSelector((state) => state.jobs.sortState);
  const [search, setSearch] = useState("");
  const [searchedJobs, setSearchedJobs] = useState([...rows]);

  const StatusOptions = [
    "Applied",
    "Interviewing",
    "Offer Received",
    "Rejected",
    "No response",
  ];

  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);

  // Fetching data from the API
  const fetchJobs = useFetch();

  useEffect(() => {
    if (jobs.length !== 0) {
      return;
    }

    const getJobs = async () => {
      try {
        dispatch(getJobsStart());
        setLoading(true);
        const data = await fetchJobs(
          "GET",
          `${import.meta.env.VITE_API_BASE_URL}/jobs/${user.id}`
        );
        sortBy("id", data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        dispatch(getJobsFailure(err));
      }
    };

    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // AddJobPopupComponent
  const handleAddJob = async (job) => {
    try {
      setLoading(true);
      const sendJob = { ...job, userId: user.id };
      await fetchJobs(
        "POST",
        `${import.meta.env.VITE_API_BASE_URL}/jobs`,
        sendJob
      );
      dispatch(getJobsStart());
      const data = await fetchJobs(
        "GET",
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${user.id}`
      );
      keepSortOnChanges(data);
      setAddJobPopup(false);
      setLoading(false);
    } catch (err) {
      console.error(err);
      dispatch(getJobsFailure(err));
    }
  };
  const handleClosePopup = () => {
    setAddJobPopup(false);
  };

  // Delete job
  const handleDeleteJob = (id) => async () => {
    try {
      setLoading(true);
      await fetchJobs(
        "DELETE",
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`
      );
      dispatch(getJobsStart());
      const data = await fetchJobs(
        "GET",
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${user.id}`
      );
      keepSortOnChanges(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      dispatch(getJobsFailure(err));
    }
  };

  // Update job status
  const updateStatus = async (id, event) => {
    const newStatus = event.target.value;
    console.log(`Updating task ${id} to ${newStatus}`);
    try {
      setLoading(true);
      await fetchJobs(
        "PUT",
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`,
        {
          status: newStatus,
        }
      );
      dispatch(getJobsStart());
      const data = await fetchJobs(
        "GET",
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${user.id}`
      );
      keepSortOnChanges(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      dispatch(getJobsFailure(err));
    }
    console.log("Updated status successfully!");
  };

  // Pagination
  const handleChangePage = (event, newPage) => {
    setLoading(true);
    setPage(newPage);
    setLoading(false);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // JobDetails
  const openJobDescription = (id) => {
    const job = rows.find((row) => row.id === id);
    setViewJob(job);
  };

  // EditJobPopupComponent
  const openEditJobPopup = (id) => {
    const job = rows.find((row) => row.id === id);
    setSelectedJob(job);
  };
  const handleEditJob = async (job) => {
    try {
      setLoading(true);
      await fetchJobs(
        "PUT",
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${job.id}`,
        job
      );
      dispatch(getJobsStart());
      const data = await fetchJobs(
        "GET",
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${user.id}`
      );
      setSelectedJob(null);
      keepSortOnChanges(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      dispatch(getJobsFailure(err));
    }
  };

  // Sorting
  const keepSortOnChanges = (array) => {
    const key = sortState.key;
    const isAsc = sortState.isAsc;
    const sorted = [...array].sort((a, b) => {
      if (a[key] < b[key]) return isAsc ? -1 : 1;
      if (a[key] > b[key]) return isAsc ? 1 : -1;
      return 0;
    });
    dispatch(getJobsSuccess(sorted));
  };

  const sortBy = (key, array) => {
    const isAsc = sortState.key === key ? !sortState.isAsc : true;
    dispatch(setSortState({ key, isAsc }));
    const sorted = [...array].sort((a, b) => {
      if (a[key] < b[key]) return isAsc ? -1 : 1;
      if (a[key] > b[key]) return isAsc ? 1 : -1;
      return 0;
    });
    dispatch(getJobsSuccess(sorted));
  };

  const sortIcon = (key) => {
    if (sortState.key === key) {
      return sortState.isAsc ? "▲" : "▼";
    }
    return "";
  };

  useEffect(() => {
    if (search === "") {
      setSearchedJobs(rows);
      return;
    }
    const filtered = rows.filter((row) => {
      return (
        row.company.toLowerCase().includes(search.toLowerCase()) ||
        row.position.toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchedJobs(filtered);
  }, [search, rows]);

  if (!rows.length)
    return (
      <>
        <div className="w-full bg-tertiary p-4 m-2">
          <div className="flex-col centred py-2">
            <div className="size-2/3 centred my-6">
              <img
                src={darkMode ? lightPlaceholder : darkPlaceholder}
                alt="Placeholder"
                className="size-2/3 opacity-60"
              />
            </div>
            <h1 className="text-2xl font-bold text-secondary dark:text-secondaryDark">
              Currently there are no jobs to display
            </h1>
            <p className="text-lg font-medium text-secondary dark:text-secondaryDark">
              Start by adding your first job
            </p>
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
          <AddJobPopupComponent
            onAdd={handleAddJob}
            isVisible={addJobPopup}
            onClose={handleClosePopup}
          />
        </div>
      </>
    );

  return (
    <>
      <div className="w-full bg-tertiary p-4 m-2">
        <div className="centred mb-2">
          <div className="w-1/3 flex justify-between items-center px-8">
            <h2 className="text-2xl font-bold text-secondary dark:text-secondaryDark">
              Total Jobs:
            </h2>
            <p className="text-xl font-medium text-secondary-light dark:text-secondaryDark">
              <span className="text-xl font-bold text-secondary dark:text-secondaryDark">
                {rows.length}
              </span>{" "}
              jobs
            </p>
          </div>
          <div className="w-2/3 flex justify-end items-center px-8">
            <label
              htmlFor="search"
              className="w-2/3 bg-primary-dark dark:bg-primaryDark-light relative p-3 rounded-lg dark:border-primaryDark dark:border-opacity-50 border-primary border-opacity-50 border-2"
            >
              <input
                type="text"
                placeholder="Search for jobs"
                className="w-full bg-transparent"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
        </div>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            boxShadow: darkMode
              ? "0px 0 10px rgba(55,55,55, 0.25)"
              : "0px 0 4px rgba(0,0,0, 0.25)",
            backgroundColor: darkMode ? "#232A2F" : "#CFDBDE",
          }}
        >
          <ThemeProvider theme={theme}>
            <TableContainer
              sx={{
                maxHeight: "60vh",
                border: darkMode ? "1px solid #232A2F" : "1px solid #AAC0C5",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <StyledTableRow isHeading={true} isDarkMode={darkMode}>
                    <StyledTableCell isDarkMode={darkMode} align="center">
                      <button
                        className="text-secondary dark:text-secondaryDark"
                        onClick={() => sortBy("id", rows)}
                      >
                        ID {sortIcon("id")}
                      </button>
                    </StyledTableCell>
                    <StyledTableCell isDarkMode={darkMode} align="center">
                      <button
                        className="text-secondary dark:text-secondaryDark"
                        onClick={() => sortBy("company", rows)}
                      >
                        Company {sortIcon("company")}
                      </button>
                    </StyledTableCell>
                    <StyledTableCell isDarkMode={darkMode} align="center">
                      <button
                        className="text-secondary dark:text-secondaryDark"
                        onClick={() => sortBy("position", rows)}
                      >
                        Position {sortIcon("position")}
                      </button>
                    </StyledTableCell>
                    <StyledTableCell isDarkMode={darkMode} align="center">
                      <button
                        className="text-secondary dark:text-secondaryDark"
                        onClick={() => sortBy("status", rows)}
                      >
                        Status {sortIcon("status")}
                      </button>
                    </StyledTableCell>
                    <StyledTableCell isDarkMode={darkMode} align="center">
                      <button
                        className="text-secondary dark:text-secondaryDark"
                        onClick={() => sortBy("date", rows)}
                      >
                        Date {sortIcon("date")}
                      </button>
                    </StyledTableCell>
                    <StyledTableCell isDarkMode={darkMode} align="center">
                      <span className="text-secondary dark:text-secondaryDark">
                        Actions
                      </span>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {loading && (
                    <StyledTableRow isDarkMode={darkMode}>
                      <StyledTableCell isDarkMode={darkMode} colSpan={6}>
                        <LinearProgress />
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                  {searchedJobs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <StyledTableRow
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          isDarkMode={darkMode}
                        >
                          <StyledTableCell
                            isDarkMode={darkMode}
                            align="center"
                            color="white"
                          >
                            {row.id}
                          </StyledTableCell>
                          <StyledTableCell isDarkMode={darkMode} align="center">
                            {row.company}
                          </StyledTableCell>
                          <StyledTableCell isDarkMode={darkMode} align="center">
                            {row.position}
                          </StyledTableCell>
                          <StyledTableCell isDarkMode={darkMode} align="center">
                            <Select
                              IconComponent={() => null}
                              displayEmpty
                              value={row.status}
                              onChange={(e) => updateStatus(row.id, e)}
                              className="w-2/3 rounded-full"
                              style={{
                                backgroundColor:
                                  row.status === "Interviewing"
                                    ? "#CA8A04"
                                    : row.status === "Applied"
                                    ? "#4F46E5"
                                    : row.status === "Offer Received"
                                    ? "#16A34A"
                                    : row.status === "No response"
                                    ? "#64748b"
                                    : "#EF4444",
                                borderRadius: "9999px",
                                color: "white",
                              }}
                            >
                              {StatusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </StyledTableCell>
                          <StyledTableCell isDarkMode={darkMode} align="center">
                            {row.date.split("T")[0].split("-").join("/")}
                          </StyledTableCell>
                          <StyledTableCell isDarkMode={darkMode} align="center">
                            <button
                              className="bg-indigo-500 text-secondaryDark w-10 h-10 mr-2 rounded-full hover:bg-indigo-700"
                              onClick={() => openJobDescription(row.id)}
                            >
                              <VisibilityIcon fontSize="small" />
                            </button>
                            <button
                              className="bg-yellow-600 text-secondaryDark w-10 h-10 mr-2 rounded-full hover:bg-yellow-700"
                              onClick={() => openEditJobPopup(row.id)}
                            >
                              <EditIcon fontSize="small" />
                            </button>
                            <button
                              className="bg-accent text-secondaryDark w-10 h-10 mr-2 rounded-full hover:bg-accent-dark dark:bg-accentDark dark:hover:bg-accentDark-dark"
                              onClick={handleDeleteJob(row.id)}
                            >
                              <CloseIcon fontSize="small" />
                            </button>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              sx={{
                border: darkMode ? "1px solid #232A2F" : "1px solid #AAC0C5",
                borderTop: "none",
              }}
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
          </ThemeProvider>
        </Paper>

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
        <AddJobPopupComponent
          onAdd={handleAddJob}
          isVisible={addJobPopup}
          onClose={handleClosePopup}
        />
        {viewJob && (
          <JobDetails job={viewJob} onClose={() => setViewJob(null)} />
        )}
        {selectedJob && (
          <EditJobPopupComponent
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            onSave={handleEditJob}
          />
        )}
      </div>
    </>
  );
};

export default TableComponent;
