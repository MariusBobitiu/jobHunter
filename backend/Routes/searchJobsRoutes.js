const express = require("express");
const searchJobsController = require("../Controllers/searchJobsController");
const { searchReedJobs, searchReedJob, filterReedJobs } = searchJobsController;

const router = express.Router();

// REED API Routes

// Search Reed Jobs
router.get("/reed", searchReedJobs);
// Filter Jobs
router.get("/reed/filter", filterReedJobs);
//Specific Job
router.get("/reed/:jobId", searchReedJob);

// LINKEDIN API Routes

module.exports = router;
