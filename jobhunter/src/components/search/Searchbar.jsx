import PropTypes from "prop-types";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const Searchbar = ({
  term,
  location,
  onTermChange,
  onLocationChange,
  onSearch,
  onGetLocation,
}) => {
  return (
    <div className="xsm:w-full lg:w-3/4 mt-8 flex xsm:flex-col lg:flex-row self-center gap-2 p-4 rounded-lg bg-primary-dark dark:bg-primaryDark-light">
      <input
        type="text"
        placeholder="Search for jobs..."
        className="xsm:w-full lg:w-3/6 p-2 bg-transparent xsm:border-b lg:border-b-0 lg:border-r border-primaryDark dark:border-secondaryDark-dark/50"
        value={term}
        onChange={onTermChange}
      />
      <label htmlFor="location" className="xsm:w-full lg:w-2/6 relative">
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 bg-transparent"
          value={location}
          onChange={onLocationChange}
        />
        <span
          className="absolute right-0 top-0 p-2 cursor-pointer"
          onClick={onGetLocation}
        >
          <MyLocationIcon />
        </span>
      </label>
      <button
        className="xsm:w-4/5 xsm:py-3 lg:py-2 xsm:self-center lg:w-1/6 p-2 bg-primary-light dark:bg-primaryDark rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark"
        onClick={onSearch}
      >
        Search
      </button>
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
};

export default Searchbar;
