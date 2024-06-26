const express = require("express");
const jobsController = require("../Controllers/jobsController");
const { getJobs, createJob, updateJob, deleteJob } = jobsController;

const router = express.Router();

// Get all jobs
router.get("/:userId", getJobs);

// Create a new job
router.post("/", createJob);

// Update a job
router.put("/:jobId", updateJob);

// Delete a job
router.delete("/:jobId", deleteJob);

module.exports = router;
