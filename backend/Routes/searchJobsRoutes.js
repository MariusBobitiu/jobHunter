const express = require("express");
const searchJobsController = require("../Controllers/searchJobsController");
const { searchReedJobs, searchReedJob } = searchJobsController;

const router = express.Router();

// Search Reed Jobs
router.get("/reed", searchReedJobs);
//Specific Job
router.get("/reed/:jobId", searchReedJob);
// Filter Jobs
router.get("/reed/filter", filterReedJobs);

module.exports = router;
