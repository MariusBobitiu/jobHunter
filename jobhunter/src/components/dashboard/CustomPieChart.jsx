import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useMemo, useState } from "react";

const CustomPieChart = () => {
  const jobs = useSelector((state) => state.jobs.jobs);

  const [paddingAngle, setPaddingAngle] = useState(false);

  const appliedJobs = jobs.filter((job) => job.status === "Applied").length;
  const interviewingJobs = jobs.filter(
    (job) => job.status === "Interviewing"
  ).length;
  const offerJobs = jobs.filter(
    (job) => job.status === "Offer Received"
  ).length;
  const deniedJobs = jobs.filter((job) => job.status === "Rejected").length;
  const noResponse = jobs.filter((job) => job.status === "No response").length;

  const data = useMemo(
    () => [
      {
        id: "Applied",
        label: "Applied",
        value: appliedJobs,
        color: "#4F46E5",
      },
      {
        id: "Interviewing",
        label: "Interviewing",
        value: interviewingJobs,
        color: "#CA8A04",
      },
      {
        id: "Offer Received",
        label: "Offer Received",
        value: offerJobs,
        color: "#16A34A",
      },
      {
        id: "Rejected",
        label: "Rejected",
        value: deniedJobs,
        color: "#EF4444",
      },
      {
        id: "No response",
        label: "No response",
        value: noResponse,
        color: "#64748b",
      },
    ],
    [appliedJobs, interviewingJobs, offerJobs, deniedJobs, noResponse]
  );

  useEffect(() => {
    let totalValues = 0;
    data.map((data) => {
      if (data.value > 0) {
        totalValues += 1;
      }
    });

    if (totalValues > 1) {
      setPaddingAngle(true);
    } else {
      setPaddingAngle(false);
    }
  }, [data]);

  return (
    <>
      <div className="w-full h-1/2 bye-stroke">
        <PieChart
          series={[
            {
              paddingAngle: paddingAngle ? 2 : 0,
              innerRadius: 60,
              outerRadius: 100,
              data: data,
              cornerRadius: 10,
              highlightScope: {
                faded: "global",
                highlighted: "item",
              },
              faded: {
                innerRadius: 50,
                outerRadius: 85,
                color: "#808080",
              },
            },
          ]}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          height={300}
          innerRadius={10}
          outerRadius={80}
          stroke={{ color: "transparent" }}
        />
      </div>
    </>
  );
};

CustomPieChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CustomPieChart;
