import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";

// Components
import JobContainer from "../components/search/JobContainer";
import JobDetails from "../components/search/JobDetails";
import {
  StyledMenuItem,
  StyledSelect,
  Theme as theme,
} from "../utils/StyledComponents";
import { ThemeProvider } from "@emotion/react";
import Checkbox from "@mui/material/Checkbox";

// Hooks
import useFetch from "../hooks/useFetch";

// MUI Icons

import MyLocationIcon from "@mui/icons-material/MyLocation";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SchoolIcon from "@mui/icons-material/School";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import {
  getSearchJobsFailure,
  getSearchJobsStart,
  getSearchJobsSuccess,
  getTotalJobs,
} from "../features/searchJobs/searchJobsSlice";
import AppliedPopup from "../components/search/AppliedPopup";
import { getJobsFailure, getJobsStart, getJobsSuccess } from "../features/jobs/jobsSlice";

const Search = () => {
  // Redux states for search jobs
  const jobs = useSelector((state) => state.searchJobs.searchJobs);
  const totalJobs = useSelector((state) => state.searchJobs.totalJobs);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const user = useSelector((state) => state.user.user);

  const [customDistance, setCustomDistance] = useState(false);

  const [jobType, setJobType] = useState("All");
  const [minimumSalary, setMinimumSalary] = useState("not specified");
  const [maximumSalary, setMaximumSalary] = useState("not specified");
  const [distance, setDistance] = useState(10);
  const [graduateJobs, setGraduateJobs] = useState(false);
  const [postedBy, setPostedBy] = useState("All");

  const [successMessage, setSuccessMessage] = useState(false);

  const [applied, setApplied] = useState("");
  const [showAppliedPopup, setShowAppliedPopup] = useState(false);
  const [appliedJob, setAppliedJob] = useState({});

  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showJobDetailsId, setShowJobDetailsId] = useState("");
  
  const dispatch = useDispatch();
  const fetchJobs = useFetch();

  useEffect(() => {
    if (applied !== "") {
      const job = jobs.find((job) => job.jobId === applied);
      console.log(job);
      setTimeout(() => {
        setApplied(job.jobId);
        setShowAppliedPopup(true);
        setAppliedJob(job);
      }, 2500);
    }
  }, [applied, jobs]);

  const AddJobToTable = async (e) => {
    console.log(`Adding job to table... ${appliedJob.jobId, appliedJob.employerName, appliedJob.jobTitle} to ${user.id}`);
    e.preventDefault();
    try {
      const formattedDate = new Date().toISOString();
      // setLoading(true);
      
      dispatch(getJobsStart());
      await fetchJobs("POST", `${import.meta.env.VITE_API_BASE_URL}/jobs`, 
      {
        company: appliedJob.employerName,
        position: appliedJob.jobTitle,
        status: "Applied",
        date: formattedDate,
        details: `Applied through jobHunter on ${appliedJob.jobUrl}`,
        userId: user.id,
      });

      const data = await fetchJobs("GET", `${import.meta.env.VITE_API_BASE_URL}/jobs/${user.id}`);
      const jobsWithId = data.map((job, index) => {
        return { ...job, jobId: index + 1 };
      });
      dispatch(getJobsSuccess(jobsWithId));

      setApplied("");
      setAppliedJob({});
      setShowAppliedPopup(false);
      console.log("Showing success message... ");
      setSuccessMessage(true);
      setTimeout(() => {
        console.log("Dismissing success message...")
        setSuccessMessage(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      dispatch(getJobsFailure(err.message));
    }
  }


  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchedJobsError, setSearchedJobsError] = useState("");

  const [searchedJobs, setSearchedJobs] = useState(jobs);
  const [searchedJobsStatus, setSearchedJobsStatus] = useState("idle");
  useState(searchedJobsStatus);

  // Get Location
  const getLocation = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${
          import.meta.env.VITE_OPENCAGE_API_KEY
        }`
      )
        .then((response) => response.json())
        .then((data) => setSearchLocation(data.results[0].components.city));
    });

    console.log(searchLocation);
  };

  // Search Jobs
  const search = async (e) => {
    e.preventDefault();
    // Dispatch action to search jobs
    dispatch(getSearchJobsStart());
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/searchJobs/reed?searchTerm=${searchTerm}&searchLocation=${searchLocation}&skippedResults=0`
      );

      const data = await response.json();
      console.log(data);
      dispatch(getSearchJobsSuccess(data.results));
      dispatch(getTotalJobs(data.totalResults));
      setSearchedJobsStatus("success");
    } catch (error) {
      dispatch(getSearchJobsFailure(error.message));
      dispatch(getTotalJobs(0));
      setSearchedJobsStatus("fail");
      setSearchedJobsError(error.message);
      console.error(error);
    }
  };

  const filterResults = async (e) => {
    e.preventDefault();

    setCurrentPage(1);

    dispatch(getSearchJobsStart());

    const queryParams = {
      searchTerm: searchTerm,
      searchLocation: searchLocation,
      jobType: jobType === "All" ? false : jobType,
      distanceFromLocation: distance,
      postedBy: postedBy === "All" ? false : postedBy,
    };

    if (minimumSalary !== "not specified") {
      queryParams.minimumSalary = minimumSalary;
    }

    if (maximumSalary !== "not specified") {
      queryParams.maximumSalary = maximumSalary;
    }

    if (graduateJobs === "true") {
      queryParams.graduate = graduateJobs;
    }

    const searchQueryParams = new URLSearchParams(queryParams).toString();

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/searchJobs/reed/filter?${searchQueryParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Reed jobs");
      }

      const data = await response.json();
      console.log(data);

      dispatch(getSearchJobsSuccess(data.results));
      dispatch(getTotalJobs(data.totalResults));
      setSearchedJobsStatus("success");
    } catch (error) {
      dispatch(getSearchJobsFailure(error.message));
      dispatch(getTotalJobs(0));
      setSearchedJobsStatus("fail");
      setSearchedJobsError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    setSearchedJobs(jobs);
  }, [jobs]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // Pagination Numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Loading state
  if (searchedJobsStatus === "loading") {
    return (
      <Layout>
        <div className="flex items-center justify-center h-dvh text-secondary font-nunito p-4 dark:bg-primaryDark dark:text-secondaryDark">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      </Layout>
    );
  }

  // Error state
  if (searchedJobsStatus === "fail") {
    return (
      <Layout>
        <div className="flex items-center justify-center h-dvh text-secondary font-nunito p-4 dark:bg-primaryDark dark:text-secondaryDark">
          <h1 className="text-3xl font-bold">{searchedJobsError}</h1>
        </div>
      </Layout>
    );
  }

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);

    dispatch(getSearchJobsStart());
    try {
      const queryParams = {
        searchTerm: searchTerm,
        searchLocation: searchLocation,
        jobType: jobType === "All" ? false : jobType,
        distanceFromLocation: distance,
        postedBy: postedBy === "All" ? false : postedBy,
        skippedResults: (newPage - 1) * jobsPerPage,
      };

      if (minimumSalary !== "not specified") {
        queryParams.minimumSalary = minimumSalary;
      }

      if (maximumSalary !== "not specified") {
        queryParams.maximumSalary = maximumSalary;
      }

      if (graduateJobs === "true") {
        queryParams.graduate = graduateJobs;
      }

      const searchQueryParams = new URLSearchParams(queryParams).toString();

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/searchJobs/reed/filter?${searchQueryParams}`
      );
      console.log(searchQueryParams);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Reed jobs. Status: ${response.status}, message: ${response.message}`
        );
      }
      const data = await response.json();
      console.log(data);
      dispatch(getSearchJobsSuccess(data.results));
      dispatch(getTotalJobs(data.totalResults));
      setSearchedJobsStatus("success");
    } catch (error) {
      dispatch(getSearchJobsFailure(error.message));
      dispatch(getTotalJobs(0));
      setSearchedJobsStatus("fail");
      setSearchedJobsError(error.message);
      console.error(error);
    }
  };

  // Success state

  return (
    <>
      <Layout>
        <div className="flex flex-col justify-center h-full text-secondary font-nunito p-4 dark:bg-primaryDark dark:text-secondaryDark xsm:overflow-auto xsm:mt-28 xsm:mb-28 lg:mt-0 lg:mb-0">
          {searchedJobsStatus === "idle" && (
            <div className="flex flex-col">
              <div className="flex flex-col justify-center gap-2 w-2/3 pl-48">
                <h1 className="text-6xl font-bold">
                  Let&apos;s find your dream job here
                </h1>
                <p className="text-xl font-semibold">
                  jobHunter is your place to search and track your job
                  applications. Get started by searching for jobs above.
                </p>
              </div>
              <div className="w-3/4 mt-8 flex self-center gap-2 p-4 rounded-lg bg-primary-dark dark:bg-primaryDark-light">
                <input
                  type="text"
                  placeholder="Search for jobs..."
                  className="w-3/6 p-2 bg-transparent border-r border-primaryDark dark:border-secondaryDark-dark/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <label htmlFor="location" className="w-2/6 relative">
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full p-2 bg-transparent"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                  <span
                    className="absolute right-0 top-0 p-2 cursor-pointer"
                    onClick={getLocation}
                  >
                    <MyLocationIcon />
                  </span>
                </label>
                <button
                  className="w-1/6 p-2 bg-primary-light dark:bg-primaryDark rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark"
                  onClick={search}
                >
                  Search
                </button>
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-2 mt-8">
                <p className="w-3/4 pl-12">
                  Our searches are powered by
                </p>
                <div className="flex gap-4 justify-evenly items-center w-3/4">
                <a
                  href="https://www.reed.co.uk/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline w-44"
                >
                  <span className="w-full">
                    <img src={darkMode ? '/reed-logo-darkMode.webp' : '/reed-logo.webp'} alt="Reed Logo" className="bg-cover bg-center w-full"/>
                  </span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline w-44 mb-4"
                >
                  <span className="w-full">
                    <img src={darkMode ? '/linkedin-logo-darkMode.webp' : '/linkedin-logo.webp'} alt="LinkedIn Logo" className="bg-cover bg-center w-full"/>
                  </span>
                </a>
                </div>
              </div>
            </div>
          )}
          {searchedJobsStatus === "success" && (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col gap-4 h-full w-full">
                <h1 className="text-3xl font-bold">Search Results for: </h1>
                <div className="w-full flex self-start gap-2 p-4 rounded-lg bg-primary-dark dark:bg-primaryDark-light">
                  <input
                    type="text"
                    placeholder="Search for jobs..."
                    className="w-3/6 p-2 bg-transparent border-r border-primaryDark dark:border-secondaryDark-dark/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <label htmlFor="location" className="w-2/6 relative">
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full p-2 bg-transparent"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                    <span
                      className="absolute right-0 top-0 p-2 cursor-pointer"
                      onClick={getLocation}
                    >
                      <MyLocationIcon />
                    </span>
                  </label>
                  <button
                    className="w-1/6 p-2 bg-primary-light dark:bg-primaryDark rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark"
                    onClick={search}
                  >
                    Search
                  </button>
                </div>
                <div className="flex items-center justify-between h-4/5 gap-4">
                  <div className="flex flex-wrap items-center justify-center gap-4 w-3/4 h-full overflow-scroll">
                    {searchedJobs.map((job) => (
                      <JobContainer
                        item={job}
                        key={job.jobId}
                        onClick={() => setApplied(job.jobId)}
                        viewDetails={() => {setShowJobDetailsId(job.jobId); setShowJobDetails(true)}}
                      />
                    ))}
                  </div>
                  <div className="w-1/4 flex flex-col gap-4 h-full p-4 rounded-sm bg-primary-dark dark:bg-primaryDark-light">
                    <div className="flex flex-col w-full h-full gap-4">
                      <ThemeProvider theme={theme}>
                        <div className="flex flex-col gap-2">
                          <h1 className="text-3xl mb-4 font-bold">Filters</h1>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="jobType" className="text-2xl mb-2">
                              Job Type
                            </label>
                            <div className="flex flex-col ml-4">
                              <StyledSelect
                                isDarkMode={darkMode}
                                isTable
                                isEdit
                                defaultValue="All"
                                onChange={(e) => setJobType(e.target.value)}
                              >
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="All"
                                >
                                  All
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="permanent"
                                >
                                  Permanent
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="contract"
                                >
                                  Contract
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="temp"
                                >
                                  Temporary
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="partTime"
                                >
                                  Part Time
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="fullTime"
                                >
                                  Full Time
                                </StyledMenuItem>
                              </StyledSelect>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="salary" className="text-2xl mb-2">
                              Salary Range
                            </label>
                            <div className="flex flex-col gap-2 ml-4">
                              <p className="text-lg">Minimum Salary</p>
                              <StyledSelect
                                isDarkMode={darkMode}
                                isTable
                                isEdit
                                defaultValue="not specified"
                                onChange={(e) =>
                                  setMinimumSalary(e.target.value)
                                }
                              >
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="10000"
                                >
                                  £10.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="20000"
                                >
                                  £20.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="30000"
                                >
                                  £30.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="40000"
                                >
                                  £40.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="50000"
                                >
                                  £50.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="not specified"
                                >
                                  Not Specified
                                </StyledMenuItem>
                              </StyledSelect>
                              <p className="text-lg">Maximum Salary</p>
                              <StyledSelect
                                isDarkMode={darkMode}
                                isTable
                                isEdit
                                defaultValue="not specified"
                                onChange={(e) =>
                                  setMaximumSalary(e.target.value)
                                }
                              >
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="20000"
                                >
                                  £20.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="30000"
                                >
                                  £30.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="40000"
                                >
                                  £40.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="50000"
                                >
                                  £50.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="60000"
                                >
                                  £60.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="not specified"
                                >
                                  Not Specified
                                </StyledMenuItem>
                              </StyledSelect>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="distance" className="text-2xl mb-2">
                              Distance from Location
                            </label>
                            <div className="ml-4 gap-2 flex flex-col">
                              <StyledSelect
                                isDarkMode={darkMode}
                                isTable
                                defaultValue="10"
                                onChange={(e) => {
                                  const value =
                                    e.target.value === "Custom Distance"
                                      ? true
                                      : false;
                                  setCustomDistance(value);
                                  setDistance(
                                    e.target.value === "Custom Distance"
                                      ? 0
                                      : e.target.value
                                  );
                                }}
                              >
                                <StyledMenuItem isDarkMode={darkMode} value="5">
                                  5 miles
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="10"
                                >
                                  10 miles
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="15"
                                >
                                  15 miles
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="20"
                                >
                                  20 miles
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="25"
                                >
                                  25 miles
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="Custom Distance"
                                >
                                  Custom Distance
                                </StyledMenuItem>
                              </StyledSelect>
                              {customDistance && (
                                <>
                                  <div className="flex justify-center items-center gap-4">
                                    <input
                                      type="number"
                                      className="py-1 px-4 bg-transparent border border-secondary/25 dark:border-primaryDark-dark/25 rounded-sm w-4/5"
                                      placeholder="Enter Custom Distance"
                                      value={distance}
                                      onChange={(e) =>
                                        setDistance(e.target.value)
                                      }
                                    />
                                    <p className="w-1/5">miles</p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 mt-2">
                            <label
                              htmlFor="graduate"
                              className="flex justify-between items-center text-2xl"
                            >
                              Graduate Jobs
                              <Checkbox
                                icon={
                                  <SchoolOutlinedIcon
                                    className="text-secondary dark:text-secondaryDark"
                                    fontSize="large"
                                  />
                                }
                                checkedIcon={
                                  <SchoolIcon
                                    className="text-secondary dark:text-secondaryDark"
                                    fontSize="large"
                                  />
                                }
                                value="graduate"
                                onChange={(e) => {
                                  setGraduateJobs(!e.target.checked);
                                  console.log(
                                    "graduate: ",
                                    e.target.checked,
                                    graduateJobs
                                  );
                                }}
                              />
                            </label>
                            <small className="text-sm -mt-4 opacity-60">
                              Click on the icon to toggle graduate jobs
                            </small>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="postedBy" className="text-2xl mb-2">
                              Posted By
                            </label>
                            <div className="flex flex-col ml-4">
                              <StyledSelect
                                isDarkMode={darkMode}
                                isTable={true}
                                defaultValue="All"
                                onChange={(e) => setPostedBy(e.target.value)}
                              >
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="All"
                                >
                                  All
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="Recruiter"
                                >
                                  Recruitment Agency
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="Company"
                                >
                                  Employer
                                </StyledMenuItem>
                              </StyledSelect>
                            </div>
                          </div>
                          <button
                            className="bg-primary-light mt-4 dark:bg-primaryDark p-2 rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark text-xl"
                            onClick={filterResults}
                          >
                            Apply Filters
                          </button>
                        </div>
                      </ThemeProvider>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <button
                    className="bg-primary-light dark:bg-primaryDark-light py-2 px-4 rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark-light/90 hover:opacity-90 dark:disabled:bg-primaryDark-light/50 disabled:cursor-not-allowed disabled:bg-primary-dark disabled:text-secondaryDark-dark"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  {/* Always show the first page */}
                  <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={`bg-primary-light dark:bg-primaryDark p-2 rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark ${
                      currentPage === 1
                        ? "text-xl bg-primary dark:bg-primaryDark-light"
                        : ""
                    }`}
                  >
                    1
                  </button>

                  {/* Conditional rendering for ellipsis and intermediate pages */}
                  {currentPage > 4 && <span className="p-2">...</span>}

                  {pageNumbers
                    .slice(
                      Math.max(currentPage - 2, 1),
                      Math.min(currentPage + 1, pageNumbers.length - 1)
                    )
                    .map((number) => (
                      <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`bg-primary-light dark:bg-primaryDark p-2 rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark ${
                          currentPage === number
                            ? "text-xl bg-primary dark:bg-primaryDark-light"
                            : ""
                        }`}
                      >
                        {number}
                      </button>
                    ))}

                  {currentPage < pageNumbers.length - 3 && (
                    <span className="p-2">...</span>
                  )}

                  {/* Always show the last page */}
                  {pageNumbers.length > 1 && (
                    <button
                      key={pageNumbers.length}
                      onClick={() => handlePageChange(pageNumbers.length)}
                      className={`bg-primary-light dark:bg-primaryDark p-2 rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark ${
                        currentPage === pageNumbers.length
                          ? "text-xl bg-primary dark:bg-primaryDark-light"
                          : ""
                      }`}
                    >
                      {pageNumbers.length}
                    </button>
                  )}
                  <button
                    className="bg-primary-light dark:bg-primaryDark-light py-2 px-4 rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark-light/90 hover:opacity-90 dark:disabled:bg-primaryDark-light/50 disabled:cursor-not-allowed disabled:bg-primary-dark disabled:text-secondaryDark-dark"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
      {showAppliedPopup && (
        <AppliedPopup
          onClick={AddJobToTable}
          closePopup={() => {
            setApplied("");
            setAppliedJob({});
            setShowAppliedPopup(false);
          }}
          job={appliedJob}
        />
      )}
      {showJobDetails && (
        <JobDetails jobId={showJobDetailsId} 
          onClick={() => {
              setShowJobDetails(false); 
              setApplied(showJobDetailsId);
            }}
          closePopup={() => setShowJobDetails(false)} 
        />
      )}
      <div className={`absolute bottom-2 right-2 p-4 rounded-lg z-50 bg-primaryDark-light dark:bg-primary-dark flex justify-center items-center gap-2 ${successMessage ? 'visible' : 'invisible'} transition ease-in-out duration-300`}>
        <span className="w-12 h-12 bg-green-600 rounded-full flex justify-center items-center">
          <TaskAltIcon fontSize="large" className={`${darkMode ? 'text-secondaryDark' : 'text-secondary'}`} />
        </span>
        <p className="text-lg font-semibold text-secondaryDark dark:text-secondary">Job added to table successfully!</p>
      </div>
    </>
  );
};

export default Search;
