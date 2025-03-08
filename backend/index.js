const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./Models");
const userRoutes = require("./Routes/userRoutes");
const jobsRoutes = require("./Routes/jobsRoutes");
const updateUserRoutes = require("./Routes/updateUserRoutes");
const quoteRoutes = require("./Routes/quoteRoutes");
const goalRoutes = require("./Routes/goalRoutes");
const searchJobsRoutes = require("./Routes/searchJobsRoutes");
const cors = require("cors");

//const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Set up port
const PORT = process.env.PORT || 8081;

// Set up express app
const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sync the database
db.sequelize.sync().then(() => {
  console.log("Database is synced");
});

// Set up cors - localhost
const corsOptions = {
  origin: "https://jobhunter.mariusbobitiu.dev",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Set up routes
app.use("/auth", userRoutes);

app.use("/users", updateUserRoutes);

app.use("/jobs", jobsRoutes);

app.use("/quote", quoteRoutes);

app.use("/goal", goalRoutes);

app.use("/searchJobs", searchJobsRoutes);

// Listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to the Job Tracker API",
    author: "Marius Bobitiu",
    endpoints: {
      login: "/api/auth/login",
      register: "/api/auth/register",
      jobs: "/api/jobs",
      quote: "/api/quote",
      goal: "/api/goal",
      searchJobs: "/api/searchJobs",
    }
  });
});

module.exports = app;
