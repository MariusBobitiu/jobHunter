import { useState } from "react";

const useFilter = (
  searchTerm,
  searchLocation,
  jobType,
  minimumSalary,
  maximumSalary,
  distanceFromLocation,
  skipped
) => {
  const [filteredJobs, setFilteredJobs] = useState([]);

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
    return findWorkData.results
      .filter((job) => job.id)
      .map((job) => ({
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
      jobId: job.id,
      jobTitle: job.title,
      date: job.created,
      employerName: job.company?.display_name || "Unknown Employer",
      locationName: job.location?.display_name || "Unknown Location",
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
    return reedData.results
      .filter((job) => job.jobId)
      .map((job) => ({
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

  const filterJobs = async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const queryParms = {
      searchTerm: searchTerm,
      searchLocation: searchLocation,
      jobType: jobType,
      minimumSalary: minimumSalary,
      maximumSalary: maximumSalary,
      distanceFromLocation: distanceFromLocation,
    };
    if (skipped) {
      queryParms.skippedResults = skipped;
    }

    const queryString = new URLSearchParams(queryParms).toString();
    try {
      const [reedData, adzunaData, findWorkData] = await Promise.all([
        fetchJobs(`${baseUrl}/searchJobs/reed/filter?${queryString}`),
        fetchJobs(`${baseUrl}/searchJobs/adzuna/filter?${queryString}`),
        fetchJobs(`${baseUrl}/searchJobs/findwork/filter?${queryString}`),
      ]);
      console.log(
        `Fetching jobs From: \n Reed: ${baseUrl}/searchJobs/reed/filter?${queryString} \n Adzuna: ${baseUrl}/searchJobs/adzuna/filter?${queryString} \n FindWork: ${baseUrl}/searchJobs/findwork/filter?${queryString}`
      );
      if (!reedData || !findWorkData || !adzunaData) {
        throw new Error("Failed to fetch jobs: ");
      }
      console.log(
        "Filtered Jobs: ",
        reedData.results,
        adzunaData.results,
        findWorkData.results
      );
      const filteredJobsArray = [
        reedJobs(reedData),
        adzunaJobs(adzunaData),
        findWorkJobs(findWorkData),
      ];
      console.log("Filtered Jobs Array: ", filteredJobsArray.flat());
      setFilteredJobs(filteredJobsArray.flat());
    } catch (err) {
      console.log("Error fetching filtered jobs: ", err.message, err.status);
    }
  };

  return { filteredJobs, filterJobs };
};

export default useFilter;
