const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

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
    skipped,
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
      resultsToSkip: skipped || 0,
      minimumSalary: minimumSalary,
      maximumSalary: maximumSalary,
      distanceFromLocation: distanceFromLocation,
      graduate: graduate ? "true" : undefined,
    };

    if (jobType === 'permanent') {
      queryParams.permanent = true;
    } else if (jobType === 'contract') {
      queryParams.contract = true;
    } else if (jobType === 'temp') {
      queryParams.temp = true;
    } else if (jobType === 'fullTime') {
      queryParams.fullTime = true;
    } else if (jobType === 'partTime') {
      queryParams.partTime = true;
    }

    if (postedBy === 'Recruiter') {
      queryParams.postedByRecruitmentAgency = true;
    } else if (postedBy === 'Employer') {
      queryParams.postedByDirectEmployer = true;
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

module.exports = { searchReedJobs, searchReedJob, filterReedJobs };
