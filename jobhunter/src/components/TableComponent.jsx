import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "../hooks/useFetch";
import EditIcon from '@mui/icons-material/Edit';

const TableComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [popUp, setPopUp] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  // const [rows, setRows] = useState([]);

  //TODO - Uncomment this block of code
  // const fetchJobs = useFetch();
  // useEffect(() => {
  //   const getJobs = async () => {
  //     try {
  //       const data = await fetchJobs(
  //         "GET",
  //         "http://192.168.0.41:8080/api/jobs"
  //       );
  //       console.log(data);
  //       setRows(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getJobs();
  // }, []);

  //TODO - Comment this block of code
  const rows = [
    {
      id: 1,
      company: "Acme Corp",
      position: "Software Engineer",
      status: "Interviewing",
      date: "2023-03-15T09:00:00"
    },
    {
      id: 2,
      company: "Globex Corporation",
      position: "Product Manager",
      status: "Applied",
      date: "2023-03-12T09:00:00",
      description: "This is a description of the job."
    },
    {
      id: 3,
      company: "Initech",
      position: "System Administrator",
      status: "Offer Received",
      date: "2023-03-18T09:00:00"
    },
    {
      id: 4,
      company: "Hooli",
      position: "Frontend Developer",
      status: "Rejected",
      date: "2023-03-20T09:00:00",
      description: "This is a description of the job."
    },
    {
      id: 5,
      company: "Pied Piper",
      position: "Backend Developer",
      status: "Interviewing",
      date: "2023-03-22T09:00:00",
      description: "This is a description of the job."
    },
    {
      id: 6,
      company: "Soylent Corp",
      position: "Marketing Specialist",
      status: "Applied",
      date: "2023-03-25T09:00:00"
    },
    {
      id: 7,
      company: "Vehement Capital Partners",
      position: "Investment Analyst",
      status: "Offer Received",
      date: "2023-03-28T09:00:00",
      description: "This is a description of the job."
    },
    {
      id: 8,
      company: "Massive Dynamic",
      position: "Research Scientist",
      status: "Rejected",
      date: "2023-04-01T09:00:00"
    },
  ];
  

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

  const openJobDescription = (id) => {
    setSelectedRowId(id);
    setPopUp(true);
  };
  const closeJobDescription = () => {
    setSelectedRowId(null);
    setPopUp(false);
  };

  const JobDetails = ({ id }) => {
    const selectedRow = rows.find((row) => row.id === id);
    return (
      <div className='size-full bg-primary-dark p-4 text-secondary dark:bg-primaryDark-light dark:text-secondaryDark flex-col centred'>
        <button
          className='absolute top-2 right-2 text-secondary w-10 h-10 rounded-full dark:text-secondaryDark'
          onClick={closeJobDescription}
        >
          <CloseIcon fontSize='small' />
        </button>
        <div className="w-full flex flex-col justify-center items-start gap-4">
        <h1 className='text-2xl font-bold'>Job Details</h1>
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center items-start'>
            <p className='text-lg'>Company: {selectedRow.company}</p>
            <p className='text-lg'>Position: {selectedRow.position}</p>
            <p className='text-lg'>Date Applied: {selectedRow.date.split("T")[0]}</p>
          </div>
          <div className='flex-col centred gap-2'>
            <p className='text-lg'>Status:</p>
            <p 
              className='text-lg px-4 py-2 rounded-lg' 
              style={{ backgroundColor: 
                selectedRow.status === 'Interviewing' ? '#CA8A04' : 
                selectedRow.status === 'Applied' ? '#4F46E5' : 
                selectedRow.status === 'Offer Received' ? '#16A34A' : '#EF4444' }}
              >
                {selectedRow.status}
              </p>
          </div>
        </div>
        {selectedRow.description && (
          <div 
            className='w-full'
          >
            <p className='text-lg '>Description: </p>
            <p className='text-md text-justify text-secondary/75 dark:text-secondaryDark/50'>{selectedRow.description}</p>
          </div>
        )}
        </div>
      </div>
    );
  }


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
                          <button 
                            className="bg-indigo-500 text-secondary w-10 h-10 mr-2 rounded-full hover:bg-slate-700 text-white"
                            onClick={() => openJobDescription(row.id)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </button>
                          <button
                            className="bg-yellow-600 text-secondary w-10 h-10 mr-2 rounded-full hover:bg-yellow-700 text-white"
                          >
                            <EditIcon fontSize="small" />
                          </button>
                          <button
                            className="bg-accent text-secondary w-10 h-10 mr-2 rounded-full hover:bg-accent-dark dark:bg-accentDark dark:hover:bg-accentDark-dark"
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
        <div 
          className='absolute z-20 top-0 left-0 w-full h-full bg-black bg-opacity-50'
          style={{ display: popUp ? 'block' : 'none' }}
        >
          <div 
            className='absolute z-30 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-primary-dark p-4 rounded-lg w-1/3 gap-6 dark:bg-primaryDark-light border-2 border-accent-dark dark:border-accentDark-dark'
            style={{ display: popUp ? 'block' : 'none' }}
          >
            {selectedRowId === null ? null : <JobDetails id={selectedRowId} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
