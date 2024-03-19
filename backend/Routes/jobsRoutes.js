const express = require("express");
const jobsController = require("../Controllers/jobsController");
const { getJobs, createJob, updateJob, deleteJob } = jobsController;

const router = express.Router();

// Get all jobs
router.get("/", getJobs);

// Create a new job
router.post("/", createJob);

// Update a job
router.put("/:id", updateJob);

// Delete a job
router.delete("/:id", deleteJob);

module.exports = router;
