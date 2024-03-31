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

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [isData, setIsData] = useState(false);

  const dispatch = useDispatch();
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
        <div className="w-full h-screen bg-primary dark:bg-primaryDark centred p-4">
          {!isData && <Placeholder />}
          {isData && (
            <div className="w-full h-screen bg-primary dark:bg-primaryDark centred font-nunito">
              <div className="w-full h-full py-2 centred flex-col">
                <div className="w-full h-2/3 bg-primary-dark dark:bg-primaryDark-light text-secondary dark:text-secondaryDark p-4 rounded-lg relative">
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <h1>
                        <span className="text-4xl text-secondary dark:text-secondaryDark">
                          Welcome back,{" "}
                        </span>
                        <span className="text-4xl text-accent dark:text-accentDark">
                          {user.username}
                        </span>
                        <span className="text-4xl text-secondary dark:text-secondaryDark">
                          !
                        </span>
                      </h1>
                      <p className="text-secondary dark:text-secondaryDark-dark">
                        {new Date().toDateString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl text-secondary dark:text-secondaryDark">
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
                  <h2 className="text-2xl text-secondary-dark dark:text-secondaryDark-light w-full text-start ml-4 mt-4">
                    {quoteType}:{" "}
                  </h2>
                  <div className="w-4/5 flex-col centred gap-2 my-2 mx-auto p-6 rounded-lg relative bg-primary-dark/25 dark:bg-primaryDark-dark/25">
                    <h3 className="text-2xl text-secondary dark:text-secondaryDark text-center italic font-averia relative">
                      <span className="text-4xl leading-3">&ldquo; </span>{" "}
                      {quote}{" "}
                      <span className="text-4xl leading-5"> &rdquo;</span>
                    </h3>
                    <small className="text-lg text-secondary dark:text-secondaryDark-dark w-full text-end absolute bottom-0 right-2 italic">
                      {author}
                    </small>
                    <small className="text-md text-secondary dark:text-secondaryDark-dark w-full text-start absolute bottom-0 left-2 italic">
                      {info ? info : ""}
                    </small>
                  </div>
                  <small className="absolute bottom-2 right-4 text-secondary-light/40 dark:text-secondaryDark/40">
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
                <div className="w-full pt-4 pb centred gap-4 pb-2">
                  <div className="flex-1 w-full h-full">
                    <GoalTracker />
                  </div>
                  <div className="flex-1 w-full bg-primary-dark dark:bg-primaryDark-light p-4 rounded-lg">
                    <h3 className="text-2xl text-secondary dark:text-secondaryDark font-medium ml-2 mt-4">
                      Job Status
                    </h3>
                    <CustomPieChart
                    />
                  </div>
                </div>
                <div className="w-full h-full pt-2 centred flex-col gap-2">
                  <DateChart />
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
