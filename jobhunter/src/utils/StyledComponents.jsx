import styled from "@emotion/styled";
import {
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  createTheme,
  tableCellClasses,
} from "@mui/material";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#F5F5F5",
      dark: "#090A0C",
    },
    secondary: {
      main: "#E7EDEE",
      dark: "#121517",
    },
    hover: {
      main: "#D4DFE1",
      dark: "#232A2F",
    },
    text: {
      light: "#090A0C",
      dark: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
  },
});

const StyledTableRow = styled(TableRow)(({ isDarkMode, isHeading, theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: isHeading
      ? isDarkMode
        ? "#161A1D"
        : theme.palette.hover.main
      : isDarkMode
      ? theme.palette.primary.dark
      : theme.palette.primary.main,
  },
  "&:nth-of-type(even)": {
    backgroundColor: isHeading
      ? isDarkMode
        ? "#161A1D"
        : theme.palette.hover.main
      : isDarkMode
      ? theme.palette.secondary.dark
      : theme.palette.secondary.main,
  },
  "&:hover": {
    backgroundColor: isHeading
      ? isDarkMode
        ? "#161A1D"
        : theme.palette.hover.main
      : isDarkMode
      ? theme.palette.hover.dark
      : theme.palette.hover.main,
  },
}));

const StyledTableCell = styled(TableCell)(
  ({ isHeading, isDarkMode, theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: isHeading
        ? isDarkMode
          ? "#161A1D"
          : theme.palette.hover.main
        : "transparent",
      color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
      border: "none",
      borderBottom: isDarkMode ? "1px solid #3C4A53" : "1px solid #AAC0C5",
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: "transparent",
      color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
      fontSize: 14,
      border: "none",
      textOverflow: "ellipsis",
    },
  })
);

const StyledSelect = styled(Select)(
  ({ isEdit, isTable, isDarkMode, theme }) => ({
    "& .MuiSelect-select": {
      color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
      borderBottom: isTable
        ? "none"
        : isDarkMode
        ? "1px solid #3C4A53"
        : "1px solid #AAC0C5",
      fontSize: 14,
      padding: isTable
        ? "5px 0 5px 16.5px"
        : isEdit
        ? "11.25px 15px"
        : "5px 10px 0 5px",
      "& :focus": {
        backgroundColor: "transparent",
        borderBottom: isDarkMode ? "1px solid #3C4A53" : "1px solid #AAC0C5",
      },
      "& :hover": {
        backgroundColor: "transparent",
        borderBottom: isDarkMode ? "1px solid red" : "1px solid #AAC0C5",
      },
    },
    "& .Mui-disabled": {
      color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
      opacity: 0.7,
      borderBottom: isDarkMode ? "1px solid #3C4A53" : "1px solid #AAC0C5",
    },
  })
);

const StyledMenuItem = styled(MenuItem)(({ isDarkMode, theme }) => ({
  "&.MuiPaper-root": {
    color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
  },
  "&.Mui-selected": {
    backgroundColor: isDarkMode ? "" : theme.palette.secondary.main,
    color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
  },
  "&.Mui-selected:hover": {
    backgroundColor: isDarkMode
      ? theme.palette.secondary.dark
      : theme.palette.secondary.main,
    color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
  },
  "&:hover": {
    backgroundColor: isDarkMode
      ? theme.palette.secondary.dark
      : theme.palette.secondary.main,
    color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
  },
  "&:not(:last-child)": {
    borderBottom: isDarkMode ? "1px solid #161A1D" : "1px solid #D4DFE1",
  },
  backgroundColor: isDarkMode
    ? theme.palette.primary.dark
    : theme.palette.primary.main,
  color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
}));

const StyledInputLabel = styled(InputLabel)(({ isDarkMode, theme }) => ({
  color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
  opacity: isDarkMode ? 0.7 : 1,
  "&.Mui-focused": {
    color: isDarkMode ? theme.palette.text.dark : theme.palette.text.light,
    opacity: isDarkMode ? 0.7 : 1,
  },
}));

export {
  StyledTableRow,
  StyledTableCell,
  StyledSelect,
  StyledInputLabel,
  StyledMenuItem,
  Theme,
};
