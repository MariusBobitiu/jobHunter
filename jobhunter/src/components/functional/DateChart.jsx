import { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Datepicker from "react-tailwindcss-datepicker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const JobsChart = () => {
  const formattedDate = (date) => {
    const pad = (s) => (s < 10 ? "0" + s : s);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}`;
  };

  let currentDate = new Date();
  const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));

  // const [startDate, setStartDate] = useState(formattedDate(oneWeekAgo));
  // const [endDate, setEndDate] = useState(formattedDate(new Date()));
  const [date, setDate] = useState({
    startDate: formattedDate(oneWeekAgo),
    endDate: formattedDate(new Date()),
  });

  const jobs = useSelector((state) => state.jobs.jobs);

  const filteredJobs = useMemo(() => {
    // Filter the jobs based on the selected start and end dates
    console.log(jobs);
    return jobs.filter((job) => {
      const jobDate = new Date(job.date);
      const start = date.startDate
        ? new Date(date.startDate)
        : new Date(Number.MIN_VALUE);
      const end = date.endDate ? new Date(date.endDate) : new Date();
      return jobDate >= start && jobDate <= end;
    });
  }, [jobs, date.startDate, date.endDate]);

  const processData = (jobs) => {
    const counts = {}; // Object to hold the count of jobs per date

    // Iterate over the jobs to count them by date
    jobs.forEach((job) => {
      const date = job.date.split("T")[0]; // Extract just the date part
      counts[date] = (counts[date] || 0) + 1; // Increment the count for this date
    });

    // Sort dates
    const sortedDates = Object.keys(counts).sort();

    // Create datasets for chart
    const chartData = {
      labels: sortedDates,
      datasets: [
        {
          label: `${jobs.length} Jobs`,
          data: sortedDates.map((date) => counts[date]),
          backgroundColor: "rgba(79,78,229)",
          hoverBackgroundColor: "rgba(46, 37, 212)",
        },
      ],
    };

    return chartData;
  };

  // When data or date filters change, recalculate the chart data
  const chartData = useMemo(() => processData(filteredJobs), [filteredJobs]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "left",
      },
      title: {
        display: false,
      },
    },
  };
  // Render the chart
  return (
    <div className="w-full h-full xsm:p-2 sm:p-6 bg-primary-dark rounded-lg dark:bg-primaryDark-light">
      <div className="flex justify-between items-center w-full">
        <h2 className="xsm:text-md sm:text-3xl xsm:-mt-6 sm:mt-0 xsm:ml-1 md:ml-4 font-bold text-secondary-dark dark:text-secondaryDark-light mb-4">
          Activity
        </h2>
        <div className="xsm:w-4/5 sm:w-2/3 md:w-2/5 lg:w-1/3 datepicker">
          <Datepicker
            showShortcuts={true}
            inputClassName="bg-primary-light w-full p-4 rounded-lg dark:bg-primaryDark-dark text-secondary dark:text-secondaryDark mb-2"
            theme={
              localStorage.getItem("darkMode") === "true" ? "dark" : "light"
            }
            primaryColor="red"
            value={date}
            onChange={(prev) => {
              setDate(prev);
            }}
            displayFormat="DD/MM/YYYY"
            startWeekOn="mon"
          />
        </div>
      </div>
      <div className="h-3/4 w-full bg-primary-dark dark:bg-primaryDark-light rounded-lg mt-4">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default JobsChart;
