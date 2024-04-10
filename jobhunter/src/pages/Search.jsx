// Components
import Layout from "../components/Layout";
import JobContainer from "../components/search/JobContainer";
import JobDetails from "../components/search/JobDetails";
import Loading from "../components/Loading";
import AppliedPopup from "../components/search/AppliedPopup";
import Searchbar from "../components/search/Searchbar";
import Filters from "../components/search/Filters";
import Notification from "../components/functional/Notification";

// Hooks
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../hooks/useFetch";
import {
  getSearchJobsFailure,
  getSearchJobsStart,
  getSearchJobsSuccess,
  getTotalJobs,
} from "../features/searchJobs/searchJobsSlice";
import {
  getJobsFailure,
  getJobsStart,
  getJobsSuccess,
} from "../features/jobs/jobsSlice";

// MUI Icons
import MyLocationIcon from "@mui/icons-material/MyLocation";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const Search = () => {
  // Redux states
  const jobs = useSelector((state) => state.searchJobs.searchJobs);
  const totalJobs = useSelector((state) => state.searchJobs.totalJobs);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const user = useSelector((state) => state.user.user);

  // Local states
  const [customDistance, setCustomDistance] = useState(false);

  const [jobType, setJobType] = useState("All");
  const [minimumSalary, setMinimumSalary] = useState("not specified");
  const [maximumSalary, setMaximumSalary] = useState("not specified");
  const [distance, setDistance] = useState(10);
  const [graduateJobs, setGraduateJobs] = useState(false);
  const [postedBy, setPostedBy] = useState("All");

  const [filtersActive, setFiltersActive] = useState(false);
  const largeScreen = window.matchMedia("(min-width: 1440px)").matches;

  const [successMessage, setSuccessMessage] = useState(false);

  const [applied, setApplied] = useState("");
  const [showAppliedPopup, setShowAppliedPopup] = useState(false);
  const [appliedJob, setAppliedJob] = useState({});

  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showJobDetailsId, setShowJobDetailsId] = useState("");

  const dispatch = useDispatch();
  const fetchJobs = useFetch();

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchedJobsError, setSearchedJobsError] = useState("");

  const [searchedJobs, setSearchedJobs] = useState(jobs);
  const [searchedJobsStatus, setSearchedJobsStatus] = useState("idle");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("User not logged in. Redirecting to login page...");
      navigate("/login");
      return;
    }
    setIsLoading(false);
    document.title = `Search Jobs | ${user.username}`;
    if (largeScreen) {
      setFiltersActive(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, user]);

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
    console.log(
      `Adding job to table... ${
        (appliedJob.jobId, appliedJob.employerName, appliedJob.jobTitle)
      } to ${user.id}`
    );
    e.preventDefault();
    try {
      const formattedDate = new Date().toISOString();
      // setLoading(true);

      dispatch(getJobsStart());
      await fetchJobs("POST", `${import.meta.env.VITE_API_BASE_URL}/jobs`, {
        company: appliedJob.employerName,
        position: appliedJob.jobTitle,
        status: "Applied",
        date: formattedDate,
        details: `Applied through jobHunter on ${appliedJob.jobUrl}`,
        userId: user.id,
      });

      const data = await fetchJobs(
        "GET",
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${user.id}`
      );
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
        console.log("Dismissing success message...");
        setSuccessMessage(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      dispatch(getJobsFailure(err.message));
    }
  };

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

    if (graduateJobs) {
      queryParams.graduate = graduateJobs;
    }

    const searchQueryParams = new URLSearchParams(queryParams).toString();
    console.log(searchQueryParams);

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

      dispatch(getSearchJobsSuccess(data.results));
      dispatch(getTotalJobs(data.totalResults));
      setSearchedJobsStatus("success");
      setFiltersActive(false);
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

  // Pagination Numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    console.log("Graduate state: ", graduateJobs);
  }, [graduateJobs]);

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

  if (isLoading) {
    return <Loading />;
  }

  // Loading state
  if (searchedJobsStatus === "loading") {
    return (
      <Layout>
        <Loading />
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

  // Success state
  return (
    <>
      <Layout>
        <div className="flex flex-col justify-center h-full text-secondary font-nunito p-4 dark:bg-primaryDark dark:text-secondaryDark xsm:overflow-auto xsm:mt-24 xsm:pb-28 lg:mt-0 lg:mb-0">
          {searchedJobsStatus === "idle" && (
            <div className="flex flex-col">
              <div className="flex flex-col justify-center gap-2 xsm:w-full lg:w-2/3 xsm:items-center lg:items-start lg:pl-48">
                <h1 className="xsm:text-3xl lg:text-6xl font-bold">
                  Let&apos;s find your dream job here
                </h1>
                <p className="xsm:text-sm lg:text-xl text-secondary-light dark:text-secondaryDark-dark font-semibold xsm:w-4/5 lg:w-full">
                  jobHunter is your place to search and track your job
                  applications. Get started by searching for jobs above.
                </p>
              </div>
              <Searchbar
                term={searchTerm}
                location={searchLocation}
                onTermChange={(e) => setSearchTerm(e.target.value)}
                onLocationChange={(e) => setSearchLocation(e.target.value)}
                onGetLocation={getLocation}
                onSearch={search}
              />
              <div className="w-full flex flex-col justify-center items-center gap-2 mt-8">
                <p className="w-3/4 pl-12">Our searches are powered by</p>
                <div className="flex gap-4 justify-evenly items-center w-3/4">
                  <a
                    href="https://www.reed.co.uk/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline w-44"
                  >
                    <span className="w-full">
                      <img
                        src={
                          darkMode
                            ? "/reed-logo-darkMode.webp"
                            : "/reed-logo.webp"
                        }
                        alt="Reed Logo"
                        className="bg-cover bg-center w-full"
                      />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}
          {searchedJobsStatus === "success" && (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col gap-4 h-full w-full mt-32 mb-32 overflow-scroll">
                <h1 className="xsm:text-lg lg:text-3xl font-bold">
                  Search Results for:{" "}
                </h1>
                <div className="w-full flex xsm:flex-col lg:flex-row self-start gap-4 p-4 rounded-lg bg-primary-dark dark:bg-primaryDark-light">
                  <div className="flex items-center justify-center gap-4 xsm:w-full lg:w-5/6">
                    <input
                      type="text"
                      placeholder="Search for jobs..."
                      className="w-2/3 p-2 bg-transparent rounded-none border-r border-primaryDark/50 dark:border-secondaryDark-dark/50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <label htmlFor="location" className="w-1/3 relative">
                      <input
                        type="text"
                        placeholder="Location"
                        className="w-full p-2 bg-transparent"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                      />
                      <span
                        className="absolute right-0 top-0 p-2 cursor-pointer xsm:invisible lg:visible"
                        onClick={getLocation}
                      >
                        <MyLocationIcon />
                      </span>
                    </label>
                  </div>
                  <div className="xsm:w-full lg:w-1/6 flex justify-center items-center gap-2">
                    <button
                      className="xsm:w-1/2 lg:w-full p-2 bg-primary-light dark:bg-primaryDark rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark"
                      onClick={search}
                    >
                      Search
                    </button>
                    <button
                      className="w-1/2 xsm:visible lg:hidden p-2 bg-primary-light dark:bg-primaryDark rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark"
                      onClick={() => setFiltersActive(!filtersActive)}
                    >
                      {filtersActive ? "Hide Filters" : "Show Filters"}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between h-4/5 gap-4">
                  <div className="flex flex-wrap items-center justify-center gap-4 xsm:w-full lg:w-3/4 h-full overflow-scroll">
                    {searchedJobs.map((job) => (
                      <JobContainer
                        item={job}
                        key={job.jobId}
                        onClick={() => setApplied(job.jobId)}
                        viewDetails={() => {
                          setShowJobDetailsId(job.jobId);
                          setShowJobDetails(true);
                        }}
                      />
                    ))}
                  </div>
                  <div
                    className={`xsm:w-11/12 ${
                      filtersActive ? "xsm:visible lg:visible" : "xsm:invisible"
                    } lg:w-1/4 xsm:absolute lg:relative lg:flex flex-col gap-4 lg:h-full p-4 rounded-sm bg-primary-dark dark:bg-primaryDark-light transition ease-in-out duration-300`}
                  >
                    <Filters
                      onJobTypeChange={(e) => setJobType(e.target.value)}
                      onMinimumSalaryChange={(e) =>
                        setMinimumSalary(e.target.value)
                      }
                      onMaximumSalaryChange={(e) =>
                        setMaximumSalary(e.target.value)
                      }
                      onDistanceChange={(e) => {
                        const value =
                          e.target.value === "Custom Distance" ? true : false;
                        setCustomDistance(value);
                        setDistance(
                          e.target.value === "Custom Distance"
                            ? 0
                            : e.target.value
                        );
                      }}
                      onCustomDistanceChange={(e) =>
                        setDistance(e.target.value)
                      }
                      graduate={graduateJobs}
                      onGraduateChange={(e) =>
                        setGraduateJobs(e.target.checked)
                      }
                      onPostedByChange={(e) => setPostedBy(e.target.value)}
                      onApplyFilters={filterResults}
                      distanceValue={distance}
                      viewCustomDistance={customDistance}
                    />
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
        <JobDetails
          jobId={showJobDetailsId}
          onClick={() => {
            setShowJobDetails(false);
            setApplied(showJobDetailsId);
          }}
          closePopup={() => setShowJobDetails(false)}
        />
      )}
      {/* <div className={`absolute bottom-2 right-2 p-4 rounded-lg z-50 bg-primaryDark-light dark:bg-primary-dark flex justify-center items-center gap-2 ${successMessage ? 'visible' : 'invisible'} transition ease-in-out duration-300`}>
        <span className="w-12 h-12 bg-green-600 rounded-full flex justify-center items-center">
          <TaskAltIcon fontSize="large" className={`${darkMode ? 'text-secondaryDark' : 'text-secondary'}`} />
        </span>
        <p className="text-lg font-semibold text-secondaryDark dark:text-secondary">Job added to table successfully!</p>
      </div> */}
      <Notification
        icon={
          <TaskAltIcon
            fontSize="large"
            className={`${darkMode ? "text-secondaryDark" : "text-secondary"}`}
          />
        }
        trigger={successMessage}
        message="Job added to table successfully!"
      />
    </>
  );
};

export default Search;
