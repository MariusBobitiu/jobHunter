import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateGoalAndInterval } from "../../features/user/userSlice";
import { DateTime } from "luxon";

const GoalTracker = () => {
  const user = useSelector((state) => state.user.user);
  const jobs = useSelector((state) => state.jobs.jobs);

  const [goal, setGoal] = useState(user.goalValue || 0);
  const [timeFrame, setTimeFrame] = useState(user.timeFrame || "daily");
  const [currentValue, setCurrentValue] = useState(0);
  const [endOfTimeFrame, setEndOfTimeFrame] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const goalAchieved = currentValue >= goal;

  const dispatch = useDispatch();

  const saveGoalAndInterval = async () => {
    dispatch(updateGoalAndInterval({ goalValue: goal, timeFrame }));
    setIsEditable(false);

    console.log(user);

    // Update the time frame in the database
    const data = {
      goalValue: goal,
      timeFrame,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/goal/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isWithinInterval = (jobDate) => {
      const now = DateTime.now();
      switch (timeFrame) {
        case "daily":
          return DateTime.fromJSDate(new Date(jobDate)).hasSame(now, "day");
        case "weekly":
          return DateTime.fromJSDate(new Date(jobDate)).hasSame(now, "week");
        case "monthly":
          return DateTime.fromJSDate(new Date(jobDate)).hasSame(now, "month");
        default:
          return false;
      }
    };

    const filteredJobs = jobs.filter((job) => isWithinInterval(job.date));
    setCurrentValue(filteredJobs.length);
  }, [jobs, timeFrame]);

  const calculateTimeFrameEnd = (timeFrame) => {
    const now = DateTime.now();

    let endOfTimeFrame;
    switch (timeFrame) {
      case "daily":
        endOfTimeFrame = now.endOf("day");
        break;
      case "weekly":
        endOfTimeFrame = now.endOf("week");
        break;
      case "monthly":
        endOfTimeFrame = now.endOf("month");
        break;
      default:
        throw new Error("Invalid time frame");
    }

    let diff = endOfTimeFrame.diff(now, "days").days;
    if (diff <= 1) {
      const hoursDiff = endOfTimeFrame.diff(now, "hours").hours;
      return hoursDiff < 24 ? `${Math.ceil(hoursDiff)} hours` : Math.ceil(diff);
    }

    return `${Math.ceil(diff)} days`;
  };

  useEffect(() => {
    setEndOfTimeFrame(calculateTimeFrameEnd(timeFrame));
  }, [timeFrame]);

  return (
    <div className="size-full bg-primary-dark dark:bg-primaryDark-light rounded-lg p-4 text-secondary dark:text-secondaryDark">
      <div className="w-full flex justify-between items-center py-2">
        <h2 className="text-2xl font-semibold dark:text-white">Goal Tracker</h2>
        <label className="flex gap-4 items-center text-lg">
          Interval:{" "}
          <Select
            IconComponent={() => null}
            displayEmpty
            value={timeFrame}
            disabled={!isEditable}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="text-secondary dark:text-secondaryDark py-0 px-8 dashboard-select"
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
          {isEditable ? (
            <button onClick={saveGoalAndInterval}>
              <CheckIcon />
            </button>
          ) : (
            <button onClick={() => setIsEditable(true)}>
              <EditIcon />
            </button>
          )}
        </label>
      </div>
      <div>
        <div className="w-full flex-col flex bg-primary-light/40 dark:bg-primaryDark/25 rounded-lg py-4 px-8 relative">
          <label htmlFor="goal" className="text-xl">
            Goal:
          </label>
          <input
            type="number"
            id="goal"
            value={goal}
            disabled={!isEditable}
            onChange={(e) => setGoal(e.target.value)}
            className="bg-transparent text-4xl text-secondary dark:text-secondaryDark font-medium focus:outline-none"
          />
          <span className="absolute top-1 right-1"></span>
        </div>
      </div>
      {goalAchieved ? (
        <div className="w-full flex-col centred text-center mt-2 bg-primary/40 dark:bg-primaryDark/25 p-4 rounded-lg">
          <h3 className="text-4xl font-bold py-2 text-accent dark:text-accentDark">
            Goal Achieved!
          </h3>
          <p>
            Congratulations! You have achieved your goal of applying to {goal}{" "}
            applications for{" "}
            {timeFrame === "daily"
              ? "today"
              : timeFrame === "weekly"
              ? "this week"
              : "this month"}
          </p>
          <p>
            You have{" "}
            <span className="text-amber-600 dark:text-amber-500">
              {endOfTimeFrame}
            </span>{" "}
            before you can hit the ground running again!
          </p>
          <p>
            This shouldn&apos;t stop you from applying to more jobs if you can,
            but a little break never hurt anyone!
          </p>
          <p className="text-sm italic opacity-80">
            You can change your goal and interval at any time by clicking the
            edit button above.
          </p>
        </div>
      ) : (
        <div className="flex justify-between py-4 h-1/2 gap-4">
          <div className="flex-1 flex-col centred p-4 bg-primary-light/40 dark:bg-primaryDark/25 rounded-lg">
            <h3 className="text-lg dark:text-white">Completed: </h3>
            <h3 className="text-4xl font-bold py-2 dark:text-white">
              {currentValue}
            </h3>
          </div>
          <div className="flex-1 flex-col centred p-4 bg-primary-light/40 dark:bg-primaryDark/25 rounded-lg">
            <h3 className="text-lg dark:text-white">Remaining: </h3>
            <h3 className="text-4xl font-bold py-2 text-accent dark:text-accentDark">
              {goal - currentValue}
            </h3>
          </div>
          <div className="flex-1 flex-col centred p-4 bg-primary-light/40 dark:bg-primaryDark/25 rounded-lg">
            <h3 className="text-lg dark:text-white">Resetting in: </h3>
            <h3 className="text-4xl font-bold py-2 text-amber-600 dark:text-amber-500">
              {endOfTimeFrame}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalTracker;
