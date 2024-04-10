// Desc: Test page for testing purposes

import { useState } from "react";
import Layout from "../components/Layout";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import Logo from "../assets/images/jobHunterLogo.png";

const Test = () => {
  const [jobs, setJobs] = useState([]);

  const cleanDescription = (description) => {
    return DOMPurify.sanitize(description);
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/searchJobs/findwork?searchTerm=developer&searchLocation=London`
      );
      const data = await response.json();
      console.log(data);
      setJobs(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const JobDescription = ({ htmlContent }) => {
    return (
      <div
        className="text-secondary-dark dark:text-secondaryDark-dark h-32 w-full overflow-scroll"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    );
  };

  JobDescription.propTypes = {
    htmlContent: PropTypes.string.isRequired,
  };

  return (
    <Layout>
      <div className="w-full h-dvh">
        <div className="flex flex-col items-center justify-center gap-4 p-8 h-full w-full overflow-auto">
          {jobs.map((job) => (
            <div key={job.id}>
              <div className="flex">
                <img
                  src={job.logo || Logo}
                  alt="Company Logo"
                  className="w-24 h-24"
                />
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold">Title: {job.role}</h2>
                  <p>Company: {job.company_name}</p>
                  <p>Location: {job.location}</p>
                  <p>Remote?: {job.remote ? "Yes" : "No"}</p>
                  <p>
                    Employees: {job.company_num_employees || "Not Provided"}
                  </p>
                </div>
              </div>
              <JobDescription htmlContent={cleanDescription(job.text)} />
              <p>Date Posted: {job.date_posted}</p>
              <div className="flex flex-wrap gap-2">
                {job.keywords.map((keyword) => (
                  <p
                    key={keyword}
                    className="bg-secondary/50 dark:bg-secondaryDark/50 px-6 py-2 rounded-xl"
                  >
                    {keyword}
                  </p>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={fetchJobs}
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          >
            Fetch Jobs
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Test;
