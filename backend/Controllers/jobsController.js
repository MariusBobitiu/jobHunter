const db = require("../Models");

const Job = db.jobs;

const getJobs = async (req, res) => {
  try {
    const userId = req.params.userId;
    const jobs = await Job.findAll({ where: { UserId: userId } });
    return res.status(200).send(jobs);
  } catch (error) {
    console.error("Error in fetching jobs:", error);
    return res.status(500).json({ error: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const { company, position, status, date, details, userId } = req.body;
    const data = {
      company,
      position,
      status,
      UserId: userId,
      date,
      details,
    };
    const job = await Job.create(data);
    return res.status(200).send(job);
  } catch (error) {
    console.error("Error in creating job:", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { company, position, status, date, details } = req.body;
    const data = {
      company,
      position,
      status,
      date,
      details,
    };
    if (!jobId) return res.status(400).send({ message: "Job ID is required" });
    const job = await Job.update(data, { where: { id: jobId } });
    return res.status(200).send(job);
  } catch (error) {
    console.error("Error in updating job:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.destroy({ where: { id: jobId } });
    if (!job) return res.status(404).send({ message: "Job not found" });
    return res.status(200).send({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error in deleting job:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getJobs, createJob, updateJob, deleteJob };
