import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./FacAttendance.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {  Container } from "react-bootstrap";
import {
  fetchStudentsByclass,
  saveAttendanceData,
} from "../../../api/facultyApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  IconButton, Menu, MenuItem } from "@mui/material";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FacAttendance = () => {
 
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
 

  const [selectedStudent, setSelectedStudent] = useState(null); 

  const handleClick = (event, row) => {
    setSelectedStudent(row); 
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 
  const fetchStudData = async () => {
    try {
      const response = await fetchStudentsByclass();
      setStudents(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudData();
  }, [refresh]);

  // ==========================================
  const handleSaveAttendance = async (status) => {
    try {
      const updatedStudent = {
        ...selectedStudent,
        status: status,
      };
  
      await saveAttendanceData(updatedStudent);
  
     
      // setStudents((prevStudents) =>
      //   prevStudents.map((student) =>
      //     student._id === updatedStudent._id ? updatedStudent : student
      //   )
      // );
  
      if (status === "Present") {
        toast.success(`${updatedStudent.studentName} is ${status}`);
      } else if (status === "Absent") {
        toast.error(`${updatedStudent.studentName} is ${status}`);
      } else {
        toast.info(`${updatedStudent.studentName} is taking ${status} leave`);
      }
  
      handleClose();
    } catch (error) {
      console.error("Failed to save attendance data:", error);
      toast.error("Failed to save attendance data");
    }
  };
  
  // ===================================

  return (
    <div style={{ marginTop: "50px", width: "90%", marginLeft: "100px" }}>
    <Container>
      <h1>Mark Attendance</h1>
      <TableContainer component={Paper} className="facultyResultTable">
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Student Name</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
            {students.length > 0 ? (
              students.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>{row.studentName}</StyledTableCell>
                  <StyledTableCell>{row.status}</StyledTableCell>
                  <StyledTableCell>
                    <div>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(e) => handleClick(e, row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={open && selectedStudent?._id === row._id} // Show menu only for the selected student
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            width: "20ch",
                          },
                        }}
                      >
                        <MenuItem onClick={() => handleSaveAttendance("Present")}>
                          Present
                        </MenuItem>
                        <MenuItem onClick={() => handleSaveAttendance("Absent")}>
                          Absent
                        </MenuItem>
                        <MenuItem onClick={() => handleSaveAttendance("Half Day")}>
                          Half Day
                        </MenuItem>
                      </Menu>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">
                  Attends Not found
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  </div>
  );
};

export default FacAttendance;
