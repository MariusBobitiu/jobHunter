import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
    StyledMenuItem,
    StyledSelect,
    Theme as theme,
  } from "../../utils/StyledComponents";
import { ThemeProvider } from "@emotion/react";
import Checkbox from "@mui/material/Checkbox";
import SchoolIcon from "@mui/icons-material/School";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

const Filters = ({ onJobTypeChange, onMinimumSalaryChange, onMaximumSalaryChange, onDistanceChange, onCustomDistanceChange,graduate, onGraduateChange, onPostedByChange, onApplyFilters, distanceValue,viewCustomDistance }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);  
  
  return (
        <div className="flex flex-col w-full h-full gap-4">
        <ThemeProvider theme={theme}>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl mb-4 font-bold">Filters</h1>
            <div className="flex flex-col gap-2">
              <label htmlFor="jobType" className="text-2xl mb-2">
                Job Type
              </label>
              <div className="flex flex-col ml-4">
                <StyledSelect
                  isDarkMode={darkMode}
                  isTable
                  isEdit
                  defaultValue="All"
                  onChange={onJobTypeChange}
                >
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="All"
                  >
                    All
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="permanent"
                  >
                    Permanent
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="contract"
                  >
                    Contract
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="temp"
                  >
                    Temporary
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="partTime"
                  >
                    Part Time
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="fullTime"
                  >
                    Full Time
                  </StyledMenuItem>
                </StyledSelect>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="salary" className="text-2xl mb-2">
                Salary Range
              </label>
              <div className="flex flex-col gap-2 ml-4">
                <p className="text-lg">Minimum Salary</p>
                <StyledSelect
                  isDarkMode={darkMode}
                  isTable
                  isEdit
                  defaultValue="not specified"
                  onChange={onMinimumSalaryChange}
                >
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="10000"
                  >
                    £10.000
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="20000"
                  >
                    £20.000
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="30000"
                  >
                    £30.000
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="40000"
                  >
                    £40.000
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="50000"
                  >
                    £50.000
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="not specified"
                  >
                    Not Specified
                  </StyledMenuItem>
                </StyledSelect>
                <p className="text-lg">Maximum Salary</p>
                <StyledSelect
                  isDarkMode={darkMode}
                  isTable
                  isEdit
                  defaultValue="not specified"
                  onChange={onMaximumSalaryChange}
                >
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="20000"
                  >
                    £20.000
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="30000"
                  >
                    £30.000
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="40000"
                  >
                    £40.000
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="50000"
                  >
                    £50.000
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="60000"
                  >
                    £60.000
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="not specified"
                  >
                    Not Specified
                  </StyledMenuItem>
                </StyledSelect>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="distance" className="text-2xl mb-2">
                Distance from Location
              </label>
              <div className="ml-4 gap-2 flex flex-col">
                <StyledSelect
                  isDarkMode={darkMode}
                  isTable
                  defaultValue="10"
                  onChange={onDistanceChange}
                >
                  <StyledMenuItem isDarkMode={darkMode} value="5">
                    5 miles
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="10"
                  >
                    10 miles
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="15"
                  >
                    15 miles
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="20"
                  >
                    20 miles
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="25"
                  >
                    25 miles
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="Custom Distance"
                  >
                    Custom Distance
                  </StyledMenuItem>
                </StyledSelect>
                {viewCustomDistance && (
                  <>
                    <div className="flex justify-center items-center gap-4">
                      <input
                        type="number"
                        className="py-1 px-4 bg-transparent border border-secondary/25 dark:border-primaryDark-dark/25 rounded-sm w-4/5"
                        placeholder="Enter Custom Distance"
                        value={distance}
                        onChange={onCustomDistanceChange}
                      />
                      <p className="w-1/5">miles</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label
                htmlFor="graduate"
                className="flex justify-between items-center text-2xl"
              >
                Graduate Jobs
                <Checkbox
                  icon={
                    <SchoolOutlinedIcon
                      className="text-secondary dark:text-secondaryDark"
                      fontSize="large"
                    />
                  }
                  checkedIcon={
                    <SchoolIcon
                      className="text-secondary dark:text-secondaryDark"
                      fontSize="large"
                    />
                  }
                  value="graduate"
                  checked={graduate}
                  onChange={onGraduateChange}
                />
              </label>
              <small className="text-sm -mt-4 opacity-60">
                Click on the icon to toggle graduate jobs
              </small>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="postedBy" className="text-2xl mb-2">
                Posted By
              </label>
              <div className="flex flex-col ml-4">
                <StyledSelect
                  isDarkMode={darkMode}
                  isTable={true}
                  defaultValue="All"
                  onChange={onPostedByChange}
                >
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="All"
                  >
                    All
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="Recruiter"
                  >
                    Recruitment Agency
                  </StyledMenuItem>
                  <StyledMenuItem
                    isDarkMode={darkMode}
                    value="Company"
                  >
                    Employer
                  </StyledMenuItem>
                </StyledSelect>
              </div>
            </div>
            <button
              className="bg-primary-light mt-4 dark:bg-primaryDark p-2 rounded-lg hover:bg-primary dark:hover:bg-opacity-60 dark:hover:bg-primaryDark text-xl"
              onClick={onApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </ThemeProvider>
      </div>
    )
}

Filters.propTypes = {
    onJobTypeChange: PropTypes.func.isRequired,
    onMinimumSalaryChange: PropTypes.func.isRequired,
    onMaximumSalaryChange: PropTypes.func.isRequired,
    onDistanceChange: PropTypes.func.isRequired,
    onCustomDistanceChange: PropTypes.func.isRequired,
    graduate: PropTypes.bool.isRequired,
    onGraduateChange: PropTypes.func.isRequired,
    onPostedByChange: PropTypes.func.isRequired,
    onApplyFilters: PropTypes.func.isRequired,
    viewCustomDistance: PropTypes.bool.isRequired,
    distanceValue: PropTypes.string.isRequired,
}

export default Filters;