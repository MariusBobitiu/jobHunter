import Layout from "./../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DateChart from "../components/functional/DateChart";
import Placeholder from "../components/dashboard/Placeholder";
import Loading from "../components/dashboard/Loading";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RefreshIcon from "@mui/icons-material/Refresh";
import useFetch from "../hooks/useFetch";
import {
  getJobsFailure,
  getJobsStart,
  getJobsSuccess,
} from "../features/jobs/jobsSlice";
import GoalTracker from "../components/dashboard/GoalTracker";
import CustomPieChart from "../components/dashboard/CustomPieChart";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [isData, setIsData] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobs = useSelector((state) => state.jobs.jobs);
  const user = useSelector((state) => state.user.user);
  const fetchJobs = useFetch();

  const [quote, setQuote] = useState(
    "The only way to do great work is to love what you do."
  );
  const [author, setAuthor] = useState("Steve Jobs");
  const [info, setInfo] = useState("");
  const [quoteType, setQuoteType] = useState("Quote of the day");

  useEffect(() => {
    if (!user) {
      console.log("User not logged in. Redirecting to login page...");
      navigate("/login");
    }
    document.title = `Dashboard | ${user.username}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    console.log("User after login:", user);

    const getJobs = async () => {
      try {
        console.log("Fetching jobs...");
        dispatch(getJobsStart());
        setLoading(true);
        const data = await fetchJobs(
          "GET",
          `${import.meta.env.VITE_API_BASE_URL}/jobs/${user.id}`
        );
        setLoading(false);
        console.log("Jobs fetched successfully");
        dispatch(getJobsSuccess(data));
      } catch (error) {
        console.error(error);
        dispatch(getJobsFailure(error));
        setLoading(false);
      }
    };

    const getQuote = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/quote/today`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }
        const data = await response.json();
        setQuote(data[0].q);
        setAuthor(data[0].a);
      } catch (error) {
        console.error(error);
      }
    };

    getQuote();
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRandomQuote = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/quote/random`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      if (
        data[0].q ==
        "Too many requests. Obtain an auth key for unlimited access."
      ) {
        setQuote("The only way to do great work is to love what you do.");
        setAuthor("Steve Jobs");
        setInfo("API limit reached. Please try again later.");
        setQuoteType("Inspiring Quote");
      } else {
        setQuote(data[0].q);
        setAuthor(data[0].a);
        setInfo("");
        setQuoteType("Inspiring Quote");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (jobs.length === 0) return;
    setLoading(true);
    if (jobs.length > 0) {
      setIsData(true);
    }
    setLoading(false);
  }, [jobs]);

  return (
    <>
      <Layout>
        {loading && <Loading />}
        <div className="w-full h-dvh bg-primary dark:bg-primaryDark centred p-4">
          {!isData && <Placeholder />}
          {isData && (
            <div className="w-full h-full xsm:mt-52 lg:mt-0 bg-primary dark:bg-primaryDark lg:flex lg:justify-center lg:items-center font-nunito flex-col xsm:overflow-auto xsm:justify-start lg:overflow-hidden">
              <div className="lg:flex-1 w-full lg:h-1/3 bg-primary-dark dark:bg-primaryDark-light text-secondary dark:text-secondaryDark p-4 rounded-lg relative">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h1>
                      <span className="xsm:text-md md:text-2xl lg:text-4xl text-secondary dark:text-secondaryDark">
                        Welcome back,{" "}
                      </span>
                      <span className="xsm:text-md md:text-2xl lg:text-4xl text-accent dark:text-accentDark">
                        {user.username}
                      </span>
                      <span className="xsm:text-md md:text-2xl lg:text-4xl text-secondary dark:text-secondaryDark">
                        !
                      </span>
                    </h1>
                    <p className="xsm:text-xs md:text-lg text-secondary dark:text-secondaryDark-dark">
                      {new Date().toDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="xsm:text-sm md:text-lg lg:text-2xl text-secondary dark:text-secondaryDark">
                      Get inspired
                    </h3>
                    <button
                      className="text-secondary float-end dark:text-secondaryDark-dark hover:text-accent dark:hover:text-accentDark"
                      onClick={getRandomQuote}
                    >
                      <RefreshIcon fontSize="large" />
                    </button>
                  </div>
                </div>
                <h2 className="xsm:text-sm md:text-lg lg:text-2xl text-secondary-dark dark:text-secondaryDark-light w-full text-start ml-4 xsm:mt-2 lg:mt-4">
                  {quoteType}:{" "}
                </h2>
                <div className="w-4/5 flex-col centred gap-2 xsm:my-1 lg:my-2 lg:mb-4 mx-auto p-6 rounded-lg relative bg-primary-dark/25 dark:bg-primaryDark-dark/25">
                  <h3 className="xsm:text-md md:text-xl lg:text-2xl text-secondary dark:text-secondaryDark text-center italic font-averia relative">
                    <span className="xsm:text-md md:text-2xl lg:text-4xl leading-3">
                      &ldquo;{" "}
                    </span>{" "}
                    {quote}{" "}
                    <span className="xsm:text-md md:text-2xl lg:text-4xl leading-5">
                      {" "}
                      &rdquo;
                    </span>
                  </h3>
                  <small className="xsm:text-xs md:text-lg lg:text-lg text-secondary dark:text-secondaryDark-dark w-full text-end absolute bottom-0 right-2 italic">
                    {author}
                  </small>
                  <small className="text-md text-secondary dark:text-secondaryDark-dark w-full text-start absolute bottom-0 left-2 italic">
                    {info ? info : ""}
                  </small>
                </div>
                <small className="absolute xsm:bottom-0 lg:bottom-2 xsm:text-[8px] lg:text-sm xsm:right-2 lg:right-4 text-secondary-light/40 dark:text-secondaryDark/40">
                  Quotes provided by{" "}
                  <a
                    href="https://zenquotes.io/"
                    className="text-accent/60 hover:text-accent/80 font-bold"
                    target="_blank"
                  >
                    ZenQuotes&nbsp;
                    <OpenInNewIcon fontSize="x-small" className="mb-1" />
                  </a>
                </small>
              </div>
              <div className="lg:flex-1 w-full lg:h-full pt-4 pb centred gap-4 pb-2 xsm:flex-col lg:flex-row">
                <div className="lg:flex-1 w-full">
                  <GoalTracker />
                </div>
                <div className="lg:flex-1 w-full lg:h-full bg-primary-dark dark:bg-primaryDark-light rounded-lg">
                  <div className="flex w-full lg:h-full xsm:p-2 sm:p-6 flex-col">
                    <h3 className="xsm:text-md xsm:mb-4 xsm:-mt-1 sm:mb-0 sm:mt-0 sm:text-2xl text-secondary dark:text-secondaryDark font-medium ml-2 mt-4">
                      Job Status
                    </h3>
                    <CustomPieChart />
                  </div>
                </div>
              </div>
              <div className="lg:flex-1 w-full lg:h-1/3 pt-2 centred flex-col gap-2 xsm:mb-28 lg:mb-0">
                <DateChart />
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
