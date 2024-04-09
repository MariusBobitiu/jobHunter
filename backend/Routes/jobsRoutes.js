const express = require("express");
const jobsController = require("../Controllers/jobsController");
const { getJobs, createJob, updateJob, deleteJob } = jobsController;
const { userVerification } = require("../Middlewares/userAuth");

const router = express.Router();

// Get all jobs
router.get("/:userId", userVerification, getJobs);

// Create a new job
router.post("/", userVerification, createJob);

// Update a job
router.put("/:jobId", userVerification, updateJob);

// Delete a job
router.delete("/:jobId", userVerification, deleteJob);

module.exports = router;
