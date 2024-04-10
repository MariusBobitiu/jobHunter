const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

// Reed API
const searchReedJobs = async (req, res) => {
  const { searchTerm, searchLocation, skippedResults } = req.query;

  try {
    const apiKey = process.env.REED_API_KEY;
    const encoded_API_Key = Buffer.from(`${apiKey}:`).toString("base64");

    const response = await fetch(
      `${process.env.REED_API_BASE_URL}/search?keywords=${encodeURIComponent(
        searchTerm
      )}&location=${encodeURIComponent(
        searchLocation
      )}&resultsToTake=10&resultsToSkip=${encodeURIComponent(skippedResults)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${encoded_API_Key}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Reed jobs");
    }

    const data = await response.json();
    console.log("Jobs sent Successfully");
    res.status(200).send(data);
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).send({ message: err.message });
  }
};

const filterReedJobs = async (req, res) => {
  const {
    searchTerm,
    searchLocation,
    skippedResults,
    jobType,
    minimumSalary,
    maximumSalary,
    distanceFromLocation,
    graduate,
    postedBy,
  } = req.query;

  console.log(req.query);

  try {
    const apiKey = process.env.REED_API_KEY;
    const encoded_API_Key = Buffer.from(`${apiKey}:`).toString("base64");

    const queryParams = {
      keywords: searchTerm,
      locationName: searchLocation,
      resultsToTake: 10,
      distanceFromLocation: distanceFromLocation || 10,
    };

    if (jobType === "permanent") {
      queryParams.permanent = true;
    } else if (jobType === "contract") {
      queryParams.contract = true;
    } else if (jobType === "temp") {
      queryParams.temp = true;
    } else if (jobType === "fullTime") {
      queryParams.fullTime = true;
    } else if (jobType === "partTime") {
      queryParams.partTime = true;
    }

    if (skippedResults) {
      queryParams.resultsToSkip = skippedResults;
    }

    if (postedBy === "Recruiter") {
      queryParams.postedByRecruitmentAgency = true;
    } else if (postedBy === "Employer") {
      queryParams.postedByDirectEmployer = true;
    }

    if (graduate === "true") {
      queryParams.graduate = true;
    }

    if (minimumSalary) {
      queryParams.minimumSalary = minimumSalary;
    }
    if (maximumSalary) {
      queryParams.maximumSalary = maximumSalary;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    console.log(`${process.env.REED_API_BASE_URL}/search?${queryString}`);

    const response = await fetch(
      `${process.env.REED_API_BASE_URL}/search?${queryString}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${encoded_API_Key}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Reed jobs. ErrorMessage: ${response.message} Status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Jobs sent Successfully");
    res.status(200).send(data);
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).send({ message: err.message });
  }
};

const searchReedJob = async (req, res) => {
  const { jobId } = req.params;
  console.log(jobId);

  try {
    const apiKey = process.env.REED_API_KEY;
    const encoded_API_Key = Buffer.from(`${apiKey}:`).toString("base64");

    const response = await fetch(
      `${process.env.REED_API_BASE_URL}/jobs/${jobId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${encoded_API_Key}`,
        },
      }
    );
    if (!response.ok) {
      console.error(
        `Error: ${response.statusText} (Status: ${response.status}) \n API KEY: ${encoded_API_Key} SITE: ${process.env.REED_API_BASE_URL}/jobs/${jobId}`
      );
      throw new Error("Failed to fetch Reed job");
    }

    const data = await response.json();
    console.log("Job Details sent successfully!");
    res.status(200).send(data);
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).send({ message: err.message });
  }
};

// Findwork API
const searchFindworkJobs = async (req, res) => {
  const { searchTerm, searchLocation } = req.query;

  try {
    const response = await fetch(
      `${process.env.FINDWORK_API_BASE_URL}/?search=${searchTerm}&location=${searchLocation}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.FINDWORK_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `"Failed to fetch Findwork jobs: ${response.statusText} (${response.status})"`
      );
    }
    const data = await response.json();
    console.log("Jobs sent Successfully");
    res.status(200).send(data);
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).send({ message: err.message });
  }
};

const filterFindworkJobs = async (req, res) => {
  const { searchTerm, searchLocation, jobType } = req.query;

  const queryParams = {
    search: searchTerm,
    location: searchLocation,
  };

  if (jobType === "fullTime" || jobType === "permanent") {
    queryParams.job_type = "full+time";
  } else if (
    jobType === "partTime" ||
    jobType === "contract" ||
    jobType === "temp"
  ) {
    queryParams.job_type = "part+time";
  }

  const queryString = new URLSearchParams(queryParams).toString();
  console.log(
    `Fetching data from: ${process.env.FINDWORK_API_BASE_URL}/?${queryString}`
  );

  try {
    const response = await fetch(
      `${process.env.FINDWORK_API_BASE_URL}/?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.FINDWORK_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `"Failed to fetch Findwork jobs: ${response.statusText} (${response.status})"`
      );
    }
    const data = await response.json();
    console.log("Jobs sent Successfully");
    res.status(200).send(data);
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).send({ message: err.message });
  }
};

// Adzuna API
const searchAdzunaJobs = async (req, res) => {
  const { searchTerm, searchLocation } = req.query;

  try {
    const response = await fetch(
      `${
        process.env.ADZUNA_API_BASE_URL
      }&results_per_page=10&what=${searchTerm}&where=${searchLocation}&distance=${
        10 * 1.60934
      }`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Adzuna jobs: ${response.statusText} (${response.status})`
      );
    }

    const data = await response.json();
    console.log("Jobs sent Successfully");
    res.status(200).send(data);
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).send({ message: err.message });
  }
};

const filterAdzunaJobs = async (req, res) => {
  const {
    searchTerm,
    searchLocation,
    jobType,
    minimumSalary,
    maximumSalary,
    distanceFromLocation,
  } = req.query;

  const queryParams = {
    what: searchTerm,
    where: searchLocation,
    distance: distanceFromLocation * 1.60934 || 10 * 1.60934,
  };

  if (jobType === "permanent") {
    queryParams.permanent = 1;
  } else if (jobType === "contract") {
    queryParams.contract = 1;
  } else if (jobType === "temp") {
    queryParams.contract = 1;
  } else if (jobType === "fullTime") {
    queryParams.full_time = 1;
  } else if (jobType === "partTime") {
    queryParams.part_time = 1;
  }

  if (minimumSalary) {
    queryParams.salary_min = minimumSalary;
  }
  if (maximumSalary) {
    queryParams.salary_max = maximumSalary;
  }

  const queryString = new URLSearchParams(queryParams).toString();
  console.log(
    `Fetching data from: ${process.env.ADZUNA_API_BASE_URL}&results_per_page=10&${queryString}`
  );

  try {
    const response = await fetch(
      `${process.env.ADZUNA_API_BASE_URL}&results_per_page=10&`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Adzuna jobs: ${response.statusText} (${response.status})`
      );
    }

    const data = await response.json();
    console.log("Jobs sent Successfully");
    res.status(200).send(data);
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  searchReedJobs,
  searchReedJob,
  filterReedJobs,
  searchFindworkJobs,
  filterFindworkJobs,
  searchAdzunaJobs,
  filterAdzunaJobs,
};
