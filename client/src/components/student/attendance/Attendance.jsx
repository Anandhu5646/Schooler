import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAttendance } from '../../../api/studentApi';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function formatDateToDDMMYYYY(dateString) {
  const dateObj = new Date(dateString);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${month}/${day}/${year}`;
}

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);

  const fetchAttendanceData = async () => {
    try {
      const response = await getAttendance();
      setAttendanceData(response);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div style={{ marginTop: '50px', width: '90%', marginLeft: '100px' }}>
      <h1>View Attendance</h1>
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sl No.</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Marked By</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((row, i) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell>{formatDateToDDMMYYYY(row.date)}</StyledTableCell>
                <StyledTableCell>{row.facultyName}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Attendance;
