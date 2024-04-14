// Desc: Test page for testing purposes

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
import useSearch from "../hooks/useSearch";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import usePagination from "../hooks/usePagination";
import useFetch from "../hooks/useFetch";
import {
  getSearchJobsSuccess,
  getTotalJobs,
} from "../features/searchJobs/searchJobsSlice";
import {
  getJobsFailure,
  getJobsStart,
  getJobsSuccess,
} from "../features/jobs/jobsSlice";
import useUserAuthentication from "../hooks/useUserAuthentication";
import useFilter from "../hooks/useFilter";

// MUI Icons
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const Test = () => {
  // Redux states
  const darkMode = useSelector((state) => state.darkMode.darkMode);

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
  const [skippedJobs, setSkippedJobs] = useState(0);
  const { jobs, performSearch, searchJobsStatus } = useSearch(
    searchTerm,
    searchLocation
    // skippedJobs
  );
  const { filteredJobs, filterJobs } = useFilter(
    searchTerm,
    searchLocation,
    jobType,
    minimumSalary,
    maximumSalary,
    distance,
    graduateJobs,
    postedBy,
    skippedJobs
  );
  const [searchedJobs, setSearchedJobs] = useState(jobs);
  const [searchedJobsStatus, setSearchedJobsStatus] =
    useState(searchJobsStatus);
  // const [searchedJobsError, setSearchedJobsError] = useState("");

  // Pagination
  // const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    setSearchedJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    setSearchedJobs(filteredJobs);
  }, [filteredJobs]);

  const {
    currentData: currentJobs,
    currentPage,
    setCurrentPage,
    maxPage,
  } = usePagination(searchedJobs, pageSize);

  useEffect(() => {
    // This ensures that the current page is always at least 1 and corrects it if it exceeds maxPage
    if (maxPage === 0) {
      // If there are no pages, we still want to set it to 1 as there might be default or placeholder content to display
      setCurrentPage(1);
    } else if (currentPage > maxPage) {
      // Only adjust currentPage if it exceeds the maxPage and maxPage is not zero
      setCurrentPage(maxPage);
    }
  }, [currentPage, maxPage, setCurrentPage]);

  const searchMoreJobs = async () => {
    setSkippedJobs((prev) => prev + 100);
    await performSearch();
    setSearchedJobs((prevJobs) => [...prevJobs, ...jobs]);
    setCurrentPage((prev) => (prev < maxPage ? prev : maxPage));
  };

  const user = useUserAuthentication("Search Jobs");

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

  useEffect(() => {
    if (jobs.length > 0) {
      if (largeScreen) {
        setFiltersActive(true);
      }
      setSearchedJobsStatus("success");
      dispatch(getSearchJobsSuccess(jobs));
      dispatch(getTotalJobs(jobs.length));
    } else {
      setSearchedJobsStatus("idle");
    }
  }, [jobs, dispatch, largeScreen]);

  useEffect(() => {
    const totalPages = Math.ceil(searchedJobs.length / pageSize);
    setIsLastPage(currentPage === totalPages);
  }, [currentPage, searchedJobs, pageSize, jobs]);

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
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${
            import.meta.env.VITE_OPENCAGE_API_KEY
          }`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        console.log(data);
        setSearchLocation(data.results[0].components.city);
      } catch (error) {
        console.error(error);
      }
    });
  };

  // Pagination Numbers
  const renderPageNumbers = () => {
    let items = [];
    if (maxPage <= 5) {
      // If there are 5 or less pages, display all page numbers
      for (let i = 1; i <= maxPage; i++) {
        items.push(i);
      }
    } else {
      // Always add the first page
      items.push(1);

      // If the current page is greater than 4, add an ellipsis after the first page
      if (currentPage > 4) {
        items.push("...");
      }

      // Determine the range of page numbers to display
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(maxPage - 1, currentPage + 1);

      // Prevent start from overlapping into the first page or the ellipsis
      start = Math.max(start, 2);
      if (currentPage < 4) {
        end = 5; // Adjust end to show at least 5 pages at the beginning
      }

      // Add page numbers in the calculated range
      for (let i = start; i <= end; i++) {
        items.push(i);
      }

      // If there is room for more pages and ellipses towards the end
      if (currentPage < maxPage - 3) {
        items.push("...");
      }

      // Always add the last page unless it's already included
      if (!items.includes(maxPage)) {
        items.push(maxPage);
      }
    }
    return items;
  };

  if (!user) {
    return (
      <Layout>
        <Loading />;
      </Layout>
    );
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
          {/* <h1 className="text-3xl font-bold">{searchedJobsError}</h1> */}
        </div>
      </Layout>
    );
  }

  // Success state
  return (
    <>
      <Layout>
        <div className="flex flex-col justify-center h-full text-secondary font-nunito p-4 dark:bg-primaryDark dark:text-secondaryDark xsm:overflow-auto xsm:mt-24 xsm:pb-28 lg:mt-0 lg:pb-2">
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
                onSearch={performSearch}
                status={"idle"}
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
                <Searchbar
                  term={searchTerm}
                  onTermChange={(e) => setSearchTerm(e.target.value)}
                  location={searchLocation}
                  onLocationChange={(e) => setSearchLocation(e.target.value)}
                  onSearch={() => {
                    performSearch();
                    setCurrentPage(1);
                    setSkippedJobs(0);
                    setJobType("All");
                    setMinimumSalary("not specified");
                    setMaximumSalary("not specified");
                    setDistance(10);
                    setGraduateJobs(false);
                    setPostedBy("All");
                  }}
                  onGetLocation={getLocation}
                  filters={filtersActive}
                  onToggleFilters={() => setFiltersActive(!filtersActive)}
                  showFilterButton={true}
                />
                <div className="flex items-center justify-between h-4/5 gap-4">
                  <div className="flex flex-col size-full">
                    <div className="flex flex-col gap-4 w-full h-full overflow-scroll overflow-x-hidden">
                      {currentJobs.map((job) => (
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
                      {isLastPage && (
                        <div className="flex justify-center items-center gap-4 w-full xsm:text-xs lg:text-md p-12">
                          <p className="">
                            Looks like you&apos;ve reached the end of the page
                          </p>
                          <button
                            className="bg-primary-light dark:bg-primaryDark-light py-2 px-4 rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark-light/90 hover:opacity-90 dark:disabled:bg-primaryDark-light/50 disabled:cursor-not-allowed disabled:bg-primary-dark disabled:text-secondaryDark-dark"
                            onClick={searchMoreJobs}
                          >
                            Search for more jobs
                          </button>
                        </div>
                      )}
                    </div>
                    {/* PAGINATION  */}
                    <div className="flex justify-center items-center gap-4 w-full xsm:text-xs lg:text-md bg-primary dark:bg-primaryDark py-2">
                      <button
                        className="bg-primary-light dark:bg-primaryDark-light py-2 px-4 rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark-light/90 hover:opacity-90 dark:disabled:bg-primaryDark-light/50 disabled:cursor-not-allowed disabled:bg-primary-dark disabled:text-secondaryDark-dark"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                      {renderPageNumbers().map((item, index) =>
                        typeof item === "number" ? (
                          <button
                            key={index}
                            className={`bg-primary-light dark:bg-primaryDark p-2 rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark ${
                              item === currentPage
                                ? "text-xl bg-primary dark:bg-primaryDark-light"
                                : ""
                            }`}
                            onClick={() => setCurrentPage(item)}
                            disabled={currentPage === item}
                          >
                            {item}
                          </button>
                        ) : (
                          <span key={index} className="pagination-ellipsis">
                            {item}
                          </span>
                        )
                      )}
                      <button
                        className="bg-primary-light dark:bg-primaryDark-light py-2 px-4 rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark-light/90 hover:opacity-90 dark:disabled:bg-primaryDark-light/50 disabled:cursor-not-allowed disabled:bg-primary-dark disabled:text-secondaryDark-dark"
                        onClick={() =>
                          setCurrentPage((prev) => Math.min(maxPage, prev + 1))
                        }
                        disabled={currentPage >= maxPage}
                      >
                        Next
                      </button>
                    </div>
                    {/* END OF PAGINATION */}
                  </div>
                  <div
                    className={`xsm:w-11/12 ${
                      filtersActive ? "xsm:visible lg:visible" : "xsm:invisible"
                    } lg:w-1/4 xsm:absolute lg:relative lg:flex flex-col gap-4 lg:h-full p-4 rounded-sm bg-primary-dark dark:bg-primaryDark-light transition ease-in-out duration-300`}
                  >
                    <Filters
                      jobTypeValue={jobType}
                      onJobTypeChange={(e) => setJobType(e.target.value)}
                      minimumSalaryValue={minimumSalary}
                      onMinimumSalaryChange={(e) =>
                        setMinimumSalary(e.target.value)
                      }
                      maximumSalaryValue={maximumSalary}
                      onMaximumSalaryChange={(e) =>
                        setMaximumSalary(e.target.value)
                      }
                      distanceValue={distance}
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
                      postedByValue={postedBy}
                      onPostedByChange={(e) => setPostedBy(e.target.value)}
                      onApplyFilters={filterJobs}
                      viewCustomDistance={customDistance}
                    />
                  </div>
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

export default Test;
