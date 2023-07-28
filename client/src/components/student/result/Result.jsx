import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { studentMarks } from '../../../api/studentApi';

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

function Result() {
  const [marksData, setMarksData] = useState([]);

  const fetchStudentMarks = async () => {
    try {
      const response = await studentMarks();
      setMarksData(response);
    } catch (error) {
      console.error('Error fetching student marks:', error);
    }
  };

  useEffect(() => {
    fetchStudentMarks();
  }, []);

  return (
    <div style={{ marginTop: '50px', width: '90%', marginLeft: '100px' }}>
      <h1>View Result</h1>
      <hr></hr>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sl No.</StyledTableCell>
              <StyledTableCell>Marked By</StyledTableCell>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell>Marks</StyledTableCell>
              <StyledTableCell>Grade</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marksData.length > 0 ? (
              marksData.map((row, i) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell>{i + 1}</StyledTableCell>
                  <StyledTableCell>{row.facultyName}</StyledTableCell>
                  <StyledTableCell>{row.subjectName}</StyledTableCell>
                  <StyledTableCell>{row.marks}</StyledTableCell>
                  <StyledTableCell>{row.grade}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  No Results
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Result;
