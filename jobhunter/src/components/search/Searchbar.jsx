import PropTypes from "prop-types";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const Searchbar = ({
  term,
  location,
  onTermChange,
  onLocationChange,
  onSearch,
  onGetLocation,
  filters,
  onToggleFilters,
  showFilterButton,
  status,
}) => {
  return (
    <div
      className={`${
        status === "idle" ? "w-4/5 self-center" : "w-full"
      } flex xsm:flex-col lg:flex-row self-start gap-4 p-4 rounded-lg bg-primary-dark dark:bg-primaryDark-light`}
    >
      <div className="flex items-center justify-center gap-4 xsm:w-full lg:w-5/6">
        <input
          type="text"
          placeholder="Search for jobs..."
          className="w-2/3 p-2 bg-transparent rounded-none border-r border-primaryDark/50 dark:border-secondaryDark-dark/50"
          value={term}
          onChange={onTermChange}
        />
        <label htmlFor="location" className="w-1/3 relative">
          <input
            type="text"
            placeholder="Location"
            className="w-full p-2 bg-transparent"
            value={location}
            onChange={onLocationChange}
          />
          <span
            className="absolute right-0 top-0 p-2 cursor-pointer xsm:invisible lg:visible"
            onClick={onGetLocation}
          >
            <MyLocationIcon />
          </span>
        </label>
      </div>
      <div className="xsm:w-full lg:w-1/6 flex justify-center items-center gap-2">
        <button
          className="xsm:w-1/2 lg:w-full p-2 bg-primary-light dark:bg-primaryDark rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark"
          onClick={onSearch}
        >
          Search
        </button>
        {showFilterButton && (
          <button
            className="w-1/2 xsm:visible lg:hidden p-2 bg-primary-light dark:bg-primaryDark rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark"
            onClick={onToggleFilters}
          >
            {filters ? "Hide Filters" : "Show Filters"}
          </button>
        )}
      </div>
    </div>
  );
};

Searchbar.propTypes = {
  term: PropTypes.string,
  location: PropTypes.string,
  onTermChange: PropTypes.func,
  onLocationChange: PropTypes.func,
  onSearch: PropTypes.func,
  onGetLocation: PropTypes.func,
  filters: PropTypes.bool,
  onToggleFilters: PropTypes.func,
  showFilterButton: PropTypes.bool,
  status: PropTypes.string,
};

export default Searchbar;
