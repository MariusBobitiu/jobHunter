import Layout from "./../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import DateChart from "../components/functional/DateChart";
import Placeholder from "../components/dashboard/Placeholder";
import Loading from "../components/dashboard/Loading";
import useFetch from "../hooks/useFetch";
import {
  getJobsFailure,
  getJobsStart,
  getJobsSuccess,
} from "../features/jobs/jobsSlice";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [isData, setIsData] = useState(true);
  const [paddingAngle, setPaddingAngle] = useState(false);

  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const user = useSelector((state) => state.user.user);
  const fetchJobs = useFetch();

  const [quote, setQuote] = useState(
    "The only way to do great work is to love what you do."
  );
  const [author, setAuthor] = useState("Steve Jobs");

  useEffect(() => {
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
        const response = await fetch("https://zenquotes.io/api/today");
        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    getQuote();
    getJobs();
  }, []);

  useEffect(() => {
    if (!jobs) return;
    setLoading(true);
    if (jobs.length > 0) {
      setIsData(true);
    }
    setLoading(false);
  }, [jobs]);

  const appliedJobs = jobs.filter((job) => job.status === "Applied").length;
  const interviewingJobs = jobs.filter(
    (job) => job.status === "Interviewing"
  ).length;
  const offerJobs = jobs.filter(
    (job) => job.status === "Offer Received"
  ).length;
  const deniedJobs = jobs.filter((job) => job.status === "Rejected").length;
  const noResponse = jobs.filter((job) => job.status === "No response").length;

  const combinedData = useMemo(
    () => [
      {
        id: "Applied",
        label: "Applied",
        value: appliedJobs,
        color: "#4F46E5",
      },
      {
        id: "Interviewing",
        label: "Interviewing",
        value: interviewingJobs,
        color: "#CA8A04",
      },
      {
        id: "Offer Received",
        label: "Offer Received",
        value: offerJobs,
        color: "#16A34A",
      },
      {
        id: "Rejected",
        label: "Rejected",
        value: deniedJobs,
        color: "#64748b",
      },
      {
        id: "No response",
        label: "No response",
        value: noResponse,
        color: "#EF4444",
      },
    ],
    [appliedJobs, interviewingJobs, offerJobs, deniedJobs, noResponse]
  );

  useEffect(() => {
    let totalValues = 0;
    combinedData.map((data) => {
      if (data.value > 0) {
        totalValues += 1;
      }
    });

    if (totalValues > 1) {
      setPaddingAngle(true);
    } else {
      setPaddingAngle(false);
    }
  }, [combinedData]);

  return (
    <>
      <Layout>
        {loading && <Loading />}
        <div className="w-full h-screen bg-primary dark:bg-primaryDark centred p-4">
          {!isData && <Placeholder />}
          {isData && (
            <div className="w-full h-screen bg-primary dark:bg-primaryDark centred">
              <div className="w-full h-full py-2 centred flex-col">
                <div className="w-full h-2/3 bg-primary-dark dark:bg-primaryDark-light text-secondary dark:text-secondaryDark p-4 rounded-lg">
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
                  <div className="w-4/5 flex-col centred gap-2">
                    <h3 className="text-2xl text-secondary dark:text-secondaryDark">
                      {quote}
                    </h3>
                    <small className="text-secondary dark:text-secondaryDark-dark">
                      {author}
                    </small>
                  </div>
                  <small className="absolute bottom-2 right-4">
                    Quotes provided by{" "}
                    <a
                      href="https://zenquotes.io/"
                      className="text-accent dark:text-accentDark"
                      target="_blank"
                    >
                      ZenQuotes
                    </a>
                  </small>
                </div>
                <div className="w-full pt-4 pb-2 centred ">
                  <div className="flex-1 p-8 w-full h-full">
                    <h1 className="text-3xl text-secondary dark:text-secondaryDark">
                      Job Status
                    </h1>
                  </div>
                  <div className="flex-1 w-full bg-primary-dark dark:bg-primaryDark-light p-4 rounded-lg">
                    <h3 className="text-xl text-secondary dark:text-secondaryDark">
                      Job Status
                    </h3>
                    <PieChart
                      series={[
                        {
                          data: combinedData,
                          innerRadius: 60,
                          outerRadius: 100,
                          paddingAngle: paddingAngle ? 2 : 0,
                          cornerRadius: 10,
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 50,
                            outerRadius: 85,
                            color: "#808080",
                          },
                        },
                      ]}
                      height={300}
                      innerRadius={10}
                      outerRadius={80}
                    />
                    <h4 className="text-secondary dark:text-secondaryDark">
                      Total Jobs applied:{" "}
                      {appliedJobs +
                        interviewingJobs +
                        offerJobs +
                        deniedJobs +
                        noResponse}
                    </h4>
                  </div>
                </div>
                <div className="w-full h-full p-2 centred flex-col gap-2">
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
