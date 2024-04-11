import { useState } from "react";

const useSearch = (searchTerm, searchLocation) => {
  const [jobs, setJobs] = useState([]);

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
      console.log("Error fetching jobs: ", err.message);
      return []; // Return empty array on error
    }
  };

  const performSearch = async () => {
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
      setJobs([...reedData, ...findWorkData, ...adzunaData]);
    } catch (error) {
      console.error("Error during fetching jobs: ", error);
    }
  };

  return { jobs, performSearch };
};

export default useSearch;
