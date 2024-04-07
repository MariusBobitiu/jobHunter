import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";

// Components
import JobContainer from "../components/search/JobContainer";
import {
  StyledMenuItem,
  StyledSelect,
  Theme as theme,
} from "../utils/StyledComponents";
import { ThemeProvider } from "@emotion/react";
import Checkbox from "@mui/material/Checkbox";

// MUI Icons

import MyLocationIcon from "@mui/icons-material/MyLocation";
import SchoolIcon from "@mui/icons-material/School";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import {
  getSearchJobsFailure,
  getSearchJobsStart,
  getSearchJobsSuccess,
} from "../features/searchJobs/searchJobsSlice";

const Search = () => {
  // Redux states for search jobs
  const jobs = useSelector((state) => state.searchJobs.searchJobs);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const [customDistance, setCustomDistance] = useState(true);

  const [jobType, setJobType] = useState("All");
  const [minimumSalary, setMinimumSalary] = useState(20000);
  const [maximumSalary, setMaximumSalary] = useState(30000);
  const [distance, setDistance] = useState(10);
  const [graduateJobs, setGraduateJobs] = useState(false);
  const [postedBy, setPostedBy] = useState("All");

  const getSalary = (value) => {
    switch (value) {
      case "20000-30000":
        setMinimumSalary(20000);
        setMaximumSalary(30000);
        break;
      case "30000-40000":
        setMinimumSalary(30000);
        setMaximumSalary(40000);
        break;
      case "40000-50000":
        setMinimumSalary(40000);
        setMaximumSalary(50000);
        break;
      case "50000-60000":
        setMinimumSalary(50000);
        setMaximumSalary(60000);
        break;
      case "60000-1000000":
        setMinimumSalary(60000);
        setMaximumSalary(1000000);
        break;
      default:
        setMinimumSalary(20000);
        setMaximumSalary(30000);
        break;
    }
  };

  useEffect(() => {
    console.log(
      searchTerm,
      searchLocation,
      jobType,
      minimumSalary,
      maximumSalary,
      distance,
      graduateJobs,
      postedBy
    );
    console.log(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/searchJobs/reed?searchTerm=${searchTerm}&searchLocation=${searchLocation}&skipped=0&${
        jobType === "All" ? "" : `${jobType}=true`
      }&minimumSalary=${minimumSalary}&maximumSalary=${maximumSalary}&distanceFromLocation=${distance}&graduate=${graduateJobs}&${
        postedBy === "All" ? "" : `${postedBy}=true`
      }`
    );
  }, [
    searchTerm,
    searchLocation,
    jobType,
    minimumSalary,
    maximumSalary,
    distance,
    graduateJobs,
    postedBy,
  ]);

  const [searchedJobs, setSearchedJobs] = useState(jobs);
  const [searchedJobsStatus, setSearchedJobsStatus] = useState("idle");
  useState(searchedJobsStatus);

  useEffect(() => {
    console.log(searchedJobs);
    setSearchedJobs(searchedJobs);
  }, [jobs, searchedJobs]);

  const dispatch = useDispatch();

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchedJobsError, setSearchedJobsError] = useState("");

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
        }/searchJobs/reed?searchTerm=${searchTerm}&searchLocation=${searchLocation}&skipped=0`
      );

      const data = await response.json();
      console.log(data);
      dispatch(getSearchJobsSuccess(data.results));
      setSearchedJobsStatus("success");
    } catch (error) {
      dispatch(getSearchJobsFailure(error.message));
      setSearchedJobsStatus("fail");
      setSearchedJobsError(error.message);
      console.error(error);
    }
  };

  const filterResults = async (e) => {
    e.preventDefault();

    dispatch(getSearchJobsStart());
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/searchJobs/reed?searchTerm=${searchTerm}&searchLocation=${searchLocation}&skipped=0&${
          jobType === "All" ? "" : `${jobType}=true`
        }&minimumSalary=${minimumSalary}&maximumSalary=${maximumSalary}&distanceFromLocation=${distance}&graduate=${graduateJobs}&postedBy=${
          postedBy === "All" ? "" : `${postedBy}=true`
        }`
      );
      const data = await response.json();
      console.log(data);
      dispatch(getSearchJobsSuccess(data.results));
      setSearchedJobsStatus("success");
    } catch (error) {
      dispatch(getSearchJobsFailure(error.message));
      setSearchedJobsStatus("fail");
      setSearchedJobsError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    setSearchedJobs(jobs);
  }, [jobs]);

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
                      <JobContainer item={job} key={job.jobId} />
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
                            <div className="flex flex-col ml-4">
                              <StyledSelect
                                isDarkMode={darkMode}
                                isTable
                                isEdit
                                defaultValue="20000-30000"
                                onChange={(e) => getSalary(e.target.value)}
                              >
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="20000-30000"
                                >
                                  £20.000 - £30.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="30000-40000"
                                >
                                  £30.000 - £40.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="40000-50000"
                                >
                                  £40.000 - £50.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="50000-60000"
                                >
                                  £50.000 - £60.000
                                </StyledMenuItem>
                                <StyledMenuItem
                                  isDarkMode={darkMode}
                                  value="60000-1000000"
                                >
                                  &gt; £60.000
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
                                defaultValue="10 miles"
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
                              <div
                                className={`flex w-full justify-center items-center gap-4 ${
                                  customDistance ? "" : "hidden"
                                }`}
                              >
                                <input
                                  type="number"
                                  className="py-1 px-4 bg-transparent border border-secondary/25 dark:border-primaryDark-dark/25 rounded-sm w-4/5"
                                  placeholder="Enter Custom Distance"
                                  value={distance}
                                  onChange={(e) => setDistance(e.target.value)}
                                />
                                <p className="w-1/5">miles</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 mt-2">
                            <label
                              htmlFor="graduate"
                              className="flex justify-between items-center text-2xl mb-2"
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
                                onChange={(e) =>
                                  setGraduateJobs(e.target.checked)
                                }
                              />
                            </label>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="postedBy" className="text-2xl mb-2">
                              Posted By
                            </label>
                            <div className="flex flex-col ml-4">
                              <StyledSelect
                                isDarkMode={darkMode}
                                isTable
                                isEdit
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
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Search;
