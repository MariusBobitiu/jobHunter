const express = require("express");
const searchJobsController = require("../Controllers/searchJobsController");
const { searchReedJobs,
  searchReedJob, 
  filterReedJobs, 
  searchFindworkJobs,
  filterFindworkJobs,
  searchAdzunaJobs,
  filterAdzunaJobs
} =
  searchJobsController;

const router = express.Router();

// REED API Routes

// Search Reed Jobs
router.get("/reed", searchReedJobs);
// Filter Jobs
router.get("/reed/filter", filterReedJobs);
//Specific Job
router.get("/reed/:jobId", searchReedJob);

// FINDWORK API Routes

// Search Findwork Jobs
router.get("/findwork", searchFindworkJobs);
// Filter Findwork Jobs
router.get("/findwork/filter", filterFindworkJobs);


// ADZUNA API Routes

// Search Adzuna Jobs
router.get("/adzuna", searchAdzunaJobs);
// Filter Adzuna Jobs
router.get("/adzuna/filter", filterAdzunaJobs);

module.exports = router;
