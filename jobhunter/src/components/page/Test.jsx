import linkedIn from "linkedin-jobs-api";
import { useEffect } from "react";

const Test = () => {
  const queryOptions = {
    keyword: "Software Engineer",
    location: "San Francisco Bay Area",
    dateSincePosted: "past Week",
    jobType: "full time",
    remoteFilter: "remote",
    salary: "100000-150000",
    experienceLevel: "Entry Level",
    limit: "10",
  };
  useEffect(() => {
    linkedIn.query(queryOptions).then((response) => {
      console.log(response);
    });
  }, []);

  return <div className="w-full h-dvh flex justify-center items-center"></div>;
};

export default Test;
