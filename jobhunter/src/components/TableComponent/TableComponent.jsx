// MATERIAL UI COMPONENTS
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { LinearProgress } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import {
  Theme as theme,
  StyledTableCell,
  StyledTableRow,
  StyledSelect,
  StyledMenuItem,
} from "../../utils/StyledComponents";

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
        <div className="w-full bg-tertiary p-4">
          <div className="flex-col centred py-2 sm:mb-32 lg:mb-0">
            <div className="xsm:size-full sm:size-2/3 centred my-6">
              <img
                src={darkMode ? lightPlaceholder : darkPlaceholder}
                alt="Placeholder"
                className="size-2/3 opacity-60"
              />
            </div>
            <h1 className="xsm:text-lg sm:text-2xl font-bold text-secondary dark:text-secondaryDark">
              Currently there are no jobs to display
            </h1>
            <p className="text-lg font-medium text-secondary dark:text-secondaryDark">
              Start by adding your first job
            </p>
            <button
              className="bg-green-400 text-secondary rounded-lg py-4 xsm:w-full sm:w-1/3 dark:bg-green-600 dark:text-secondaryDark text-2xl font-bold hover:bg-green-500 dark:hover:bg-green-700 active:bg-green-700 dark:active:bg-green-800 mt-4"
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
          <div className="w-1/3 flex justify-between items-center xsm:px-2 sm:px-8">
            <h2 className="xsm:text-sm sm:text-2xl font-bold text-secondary dark:text-secondaryDark">
              Total Jobs:
            </h2>
            <p className="xsm:text-lg sm:text-xl font-medium text-secondary-light dark:text-secondaryDark">
              {rows.length}
            </p>
          </div>
          <div className="w-2/3 flex justify-end items-center xsm:px-2 sm:px-8">
            <label
              htmlFor="search"
              className="xsm:w-full sm:w-2/3 bg-primary-dark dark:bg-primaryDark-light relative p-3 rounded-lg dark:border-primaryDark dark:border-opacity-50 border-primary border-opacity-50 border-2"
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
                maxHeight: "55vh",
                border: darkMode ? "1px solid #232A2F" : "1px solid #AAC0C5",
                marginTop: "-3px",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <StyledTableRow isHeading={true} isDarkMode={darkMode}>
                    <StyledTableCell
                      isHeading={true}
                      isDarkMode={darkMode}
                      align="center"
                    >
                      <button
                        className="text-secondary dark:text-secondaryDark"
                        onClick={() => sortBy("id", rows)}
                      >
                        ID {sortIcon("id")}
                      </button>
                    </StyledTableCell>
                    <StyledTableCell
                      isHeading={true}
                      isDarkMode={darkMode}
                      align="center"
                    >
                      <button
                        className="text-secondary dark:text-secondaryDark"
                        onClick={() => sortBy("company", rows)}
                      >
                        Company {sortIcon("company")}
                      </button>
                    </StyledTableCell>
                    <StyledTableCell
                      isHeading={true}
                      isDarkMode={darkMode}
                      align="center"
                    >
                      <button
                        className="text-secondary dark:text-secondaryDark"
                        onClick={() => sortBy("position", rows)}
                      >
                        Position {sortIcon("position")}
                      </button>
                    </StyledTableCell>
                    <StyledTableCell
                      isHeading={true}
                      isDarkMode={darkMode}
                      align="center"
                    >
                      <button
                        className="text-secondary dark:text-secondaryDark"
                        onClick={() => sortBy("status", rows)}
                      >
                        Status {sortIcon("status")}
                      </button>
                    </StyledTableCell>
                    <StyledTableCell
                      isHeading={true}
                      isDarkMode={darkMode}
                      align="center"
                    >
                      <button
                        className="text-secondary dark:text-secondaryDark"
                        onClick={() => sortBy("date", rows)}
                      >
                        Date {sortIcon("date")}
                      </button>
                    </StyledTableCell>
                    <StyledTableCell
                      isHeading={true}
                      isDarkMode={darkMode}
                      align="center"
                    >
                      <span className="text-secondary dark:text-secondaryDark">
                        Actions
                      </span>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
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
                            <StyledSelect
                              isDarkMode={darkMode}
                              isTable
                              IconComponent={() => null}
                              displayEmpty
                              value={row.status}
                              onChange={(e) => updateStatus(row.id, e)}
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
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  key={option}
                                  value={option}
                                >
                                  {option}
                                </StyledMenuItem>
                              ))}
                            </StyledSelect>
                          </StyledTableCell>
                          <StyledTableCell isDarkMode={darkMode} align="center">
                            {row.date.split("T")[0].split("-").join("/")}
                          </StyledTableCell>
                          <StyledTableCell isDarkMode={darkMode} align="center">
                            <div className="flex justify-center items-center">
                              <button
                                className="bg-indigo-500 text-secondaryDark xsm:w-8 xsm:h-8 lg:w-10 lg:h-10 mr-2 rounded-full hover:bg-indigo-700"
                                onClick={() => openJobDescription(row.id)}
                              >
                                <VisibilityIcon fontSize="small" />
                              </button>
                              <button
                                className="bg-yellow-600 text-secondaryDark xsm:w-8 xsm:h-8 lg:w-10 lg:h-10 mr-2 rounded-full hover:bg-yellow-700"
                                onClick={() => openEditJobPopup(row.id)}
                              >
                                <EditIcon fontSize="small" />
                              </button>
                              <button
                                className="bg-accent text-secondaryDark xsm:w-8 xsm:h-8 lg:w-10 lg:h-10 mr-2 rounded-full hover:bg-accent-dark dark:bg-accentDark dark:hover:bg-accentDark-dark"
                                onClick={handleDeleteJob(row.id)}
                              >
                                <CloseIcon fontSize="small" />
                              </button>
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  {loading && (
                    <StyledTableRow isDarkMode={darkMode}>
                      <StyledTableCell isDarkMode={darkMode} colSpan={6}>
                        <LinearProgress />
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
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
                select: "text-secondary dark:text-secondaryDark",
              }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </ThemeProvider>
        </Paper>

        <div className="flex justify-center items-center py-2 xsm:mb-16 sm:mb-28 lg:mb-0">
          <button
            className="bg-green-400 text-secondary rounded-lg py-4 xsm:w-full sm:w-1/2 lg:w-1/3 dark:bg-green-600 dark:text-secondaryDark xsm:text-lg sm:text-xl lg:text-2xl font-bold hover:bg-green-500 dark:hover:bg-green-700 active:bg-green-700 dark:active:bg-green-800 mt-4"
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
