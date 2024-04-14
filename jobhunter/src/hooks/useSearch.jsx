import { useEffect, useState } from "react";

const useSearch = (searchTerm, searchLocation) => {
  const [jobs, setJobs] = useState([]);
  const [searchJobsStatus, setSearchJobsStatus] = useState("idle");

  useEffect(() => {
    console.log("Jobs: ", jobs);
  }, [jobs]);

  const fetchJobs = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch jobs: ${response.statusText} (${response.status})`
        );
      }
      return await response.json();
    } catch (err) {
      console.log("Error fetching jobs: ", err.message, err.status, apiUrl);
      return []; // Return empty array on error
    }
  };

  const findWorkJobs = (findWorkData) => {
    return findWorkData.results.map((job) => ({
      jobId: job.id,
      jobTitle: job.role,
      date: job.date_posted,
      employerName: job.company_name,
      locationName: job.location,
      jobDescription: job.text,
      currency: "GBP",
      minimumSalary: null,
      maximumSalary: null,
      jobUrl: job.url,
      logos: {
        dark: "/FindworkLogo-dark.webp",
        light: "/FindworkLogo.webp",
      },
    }));
  };

  const adzunaJobs = (adzunaData) => {
    return adzunaData.results.map((job) => ({
      jobId: job.adref,
      jobTitle: job.title,
      date: job.created,
      employerName: job.company.display_name,
      locationName: job.location.display_name,
      jobDescription: job.description,
      currency: "GBP",
      minimumSalary: job.salary_min,
      maximumSalary: job.salary_max,
      jobUrl: job.redirect_url,
      logos: {
        dark: "/AdzunaLogo.webp",
        light: "/AdzunaLogo.webp",
      },
    }));
  };

  const reedJobs = (reedData) => {
    return reedData.results.map((job) => ({
      jobId: job.jobId,
      jobTitle: job.jobTitle,
      date: job.date,
      employerName: job.employerName,
      locationName: job.locationName,
      jobDescription: job.jobDescription,
      currency: job.currency,
      minimumSalary: job.minimumSalary,
      maximumSalary: job.maximumSalary,
      jobUrl: job.jobUrl,
      logos: {
        dark: "/reed-logo-darkMode.webp",
        light: "/reed-logo.webp",
      },
    }));
  };

  const performSearch = async () => {
    setSearchJobsStatus("loading");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const urlParams = `?searchTerm=${encodeURIComponent(
      searchTerm
    )}&searchLocation=${encodeURIComponent(searchLocation)}`;
    try {
      const [reedData, findWorkData, adzunaData] = await Promise.all([
        fetchJobs(`${baseUrl}/searchJobs/reed${urlParams}`),
        fetchJobs(`${baseUrl}/searchJobs/findwork${urlParams}`),
        fetchJobs(`${baseUrl}/searchJobs/adzuna${urlParams}`),
      ]);
      if (!reedData || !findWorkData || !adzunaData) {
        throw new Error("Failed to fetch jobs");
      }
      console.log(
        "Jobs fetched successfully: ",
        reedData,
        findWorkData,
        adzunaData
      );
      const jobsArray = [
        reedJobs(reedData),
        findWorkJobs(findWorkData),
        adzunaJobs(adzunaData),
      ];
      setJobs(jobsArray.flat());
    } catch (error) {
      console.error("Error during fetching jobs: ", error);
    }
  };

  return { jobs, performSearch, searchJobsStatus };
};

export default useSearch;
