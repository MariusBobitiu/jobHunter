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

  console.info(req.query);

  try {
    const apiKey = process.env.REED_API_KEY;
    const encoded_API_Key = Buffer.from(`${apiKey}:`).toString("base64");

    const response = await fetch(
      `${process.env.REED_API_BASE_URL}/search?keywords=${encodeURIComponent(
        searchTerm
      )}&locationName=${encodeURIComponent(
        searchLocation
      )}&resultsToTake=10&resultsToSkip=${encodeURIComponent(skipped)}&${
        jobType ? `${jobType}=true&` : ""
      }${minimumSalary ? `minimumSalary=${minimumSalary}&` : ""}${
        maximumSalary ? `maximumSalary=${maximumSalary}&` : ""
      }${
        distanceFromLocation
          ? `distanceFromLocation=${distanceFromLocation}&`
          : ""
      }${graduate ? `graduate=${graduate}&` : ""}${
        postedBy ? `${postedBy}=true&` : ""
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${encoded_API_Key}`,
        },
      }
    );

    console.log(
      `${process.env.REED_API_BASE_URL}/search?keywords=${encodeURIComponent(
        searchTerm
      )}&location=${encodeURIComponent(
        searchLocation
      )}&resultsToTake=10&resultsToSkip=${encodeURIComponent(skipped)}&${
        jobType ? `jobType=${jobType}&` : ""
      }${minimumSalary ? `minimumSalary=${minimumSalary}&` : ""}${
        maximumSalary ? `maximumSalary=${maximumSalary}&` : ""
      }${
        distanceFromLocation
          ? `distanceFromLocation=${distanceFromLocation}&`
          : ""
      }${graduate ? `graduate=${graduate}&` : ""}${
        postedBy ? `postedBy=${postedBy}&` : ""
      }`
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
