const db = require("../Models");

const Job = db.jobs;

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    return res.status(200).send(jobs);
  } catch (error) {
    console.error("Error in fetching jobs:", error);
    return res.status(500).json({ error: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const { company, position, status, date, details } = req.body;
    const data = {
      company,
      position,
      status,
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
    const { id } = req.params;
    const { company, position, status, date, details } = req.body;
    const data = {
      company,
      position,
      status,
      date,
      details,
    };
    const job = await Job.update(data, { where: { id } });
    return res.status(200).send(job);
  } catch (error) {
    console.error("Error in updating job:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.destroy({ where: { id } });
    return res.status(200).send({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error in deleting job:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getJobs, createJob, updateJob, deleteJob };
