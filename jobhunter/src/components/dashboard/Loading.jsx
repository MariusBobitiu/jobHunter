import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Loading = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <>
      <div className="w-full h-screen z-20 bg-primary centred dark:bg-primaryDark">
        <div className="size-1/3 bg-primary-dark dark:bg-primaryDark-light centred flex-col gap-4 rounded-2xl">
          <CircularProgress
            sx={{
              color: darkMode ? "white" : "#161A1D",
              width: "60px !important",
              height: "60px !important",
            }}
          />
          <h1 className="text-secondary dark:text-secondaryDark">Loading...</h1>
          <p>
            <small className="text-secondary dark:text-secondaryDark-dark">
              Please wait while we load your data
            </small>
          </p>
        </div>
      </div>
    </>
  );
};

export default Loading;
