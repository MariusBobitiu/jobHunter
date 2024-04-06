import { useState } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";

// MUI Icons
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {
  getSearchJobsFailure,
  getSearchJobsStart,
  getSearchJobsSuccess,
} from "../features/searchJobs/searchJobsSlice";

const Search = () => {
  // Redux states for search jobs
  const searchJobs = useSelector((state) => state.searchJobs);
  const searchedJobsStatus = searchJobs.status;
  const searchedJobs = searchJobs.searchJobs;
  const searchedJobsError = searchJobs.error;

  const dispatch = useDispatch();

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Pagination states
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = searchedJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    console.log(`Search Term: ${searchTerm}, Location: ${searchLocation}`);
    try {
      const encodedAPIKey = btoa(`${import.meta.env.VITE_REED_API_KEY}:`);
      console.log(
        `API Key: ${
          import.meta.env.VITE_REED_API_KEY
        }, encoded: ${encodedAPIKey}, url: ${
          import.meta.env.VITE_REED_API_BASE_URL
        }`
      );
      const response = await fetch(
        `${
          import.meta.env.VITE_REED_API_BASE_URL
        }?keywords=${searchTerm}&location=${searchLocation}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${encodedAPIKey}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      console.log(data);
      dispatch(getSearchJobsSuccess(data));
    } catch (error) {
      dispatch(getSearchJobsFailure(error.message));
      console.error(error);
    }
  };

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
        <div className="flex flex-col justify-center h-dvh text-secondary font-nunito p-4 dark:bg-primaryDark dark:text-secondaryDark xsm:overflow-auto xsm:mt-28 xsm:mb-28 lg:mt-0 lg:mb-0">
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
              <div className="w-3/4 mt-8 flex self-center gap-2 p-4 rounded-lg bg-primaryDark-light">
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
                    className="absolute right-0 top-0 p-2"
                    onClick={getLocation}
                  >
                    <MyLocationIcon />
                  </span>
                </label>
                <button
                  className="w-1/6 p-2 bg-primaryDark rounded-lg"
                  onClick={search}
                >
                  Search
                </button>
              </div>
            </div>
          )}
          {searchedJobsStatus === "success" && (
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold">Search Results</h1>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Search;
