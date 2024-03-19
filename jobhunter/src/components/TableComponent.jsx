import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "../hooks/useFetch";

const TableComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const fetchJobs = useFetch();
  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await fetchJobs(
          "GET",
          "http://192.168.0.41:8080/api/jobs"
        );
        console.log(data);
        setRows(data);
      } catch (err) {
        console.error(err);
      }
    };

    getJobs();
  }, []);

  const deleteJob = (id) => async () => {
    try {
      await fetchJobs("DELETE", `http://192.168.0.41:8080/api/jobs/${id}`);
      const newRows = rows.filter((row) => row.id !== id);
      setRows(newRows);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="size-full bg-tertiary p-4 m-2">
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <TableContainer
            sx={{
              maxHeight: 800,
              backgroundColor: "#161A1D",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Company</TableCell>
                  <TableCell align="center">Position</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="center" color="white">
                          {row.id}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="!text-secondaryDark !text-lg"
                        >
                          {row.company}
                        </TableCell>
                        <TableCell align="center">{row.position}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">
                          {row.date.split("T")[0]}
                        </TableCell>
                        <TableCell align="center">
                          <button className="bg-green-600 text-secondary w-[40px] p-2 mt-4 rounded-full hover:bg-green-700">
                            <CheckIcon fontSize="small" />
                          </button>
                          <button
                            className="bg-red-600 text-secondary w-[40px] p-2 mt-4 rounded-full hover:bg-red-700"
                            onClick={deleteJob(row.id)}
                          >
                            <CloseIcon fontSize="small" />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default TableComponent;
