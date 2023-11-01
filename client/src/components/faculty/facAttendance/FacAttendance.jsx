import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./FacAttendance.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Container } from "react-bootstrap";
import {
  fetchStudentsByclass,
  saveAttendanceData,
} from "../../../api/facultyApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import nodata from "../../../assets/nodata.gif";

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
function formatDateToDDMMYYYY(dateString) {
  const dateObj = new Date(dateString);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${month}/${day}/${year}`;
}
const FacAttendance = () => {
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [select, setselect] = React.useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const open = Boolean(select);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleClick = (event, row) => {
    setSelectedStudent(row);
    setselect(event.currentTarget);
  };
  const handleClose = () => {
    setselect(null);
  };

  const changePage = (event, page) => {
    setCurrentPage(page);
  };

  const fetchStudData = async () => {
    try {
      const response = await fetchStudentsByclass(search, currentPage);
      setStudents(response.studentArr);
      setTotal(response.total);
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================
  const handleSaveAttendance = async (status) => {
    try {
      const updatedStudent = {
        ...selectedStudent,
        status: status,
      };
      await saveAttendanceData(updatedStudent);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.studentId === updatedStudent.studentId
            ? { ...student, status: updatedStudent.status }
            : student
        )
      );
      if (status === "Present") {
        toast.success(`${updatedStudent.studentName} is ${status}`, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else if (status === "Absent") {
        toast.error(`${updatedStudent.studentName} is ${status}`, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.info(`${updatedStudent.studentName} is taking ${status} leave`, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
      setRefresh(true);
      handleClose();
    } catch (error) {
      console.error("Failed to save attendance data:", error);
      toast.error("Failed to save attendance data");
    }
  };
  useEffect(() => {
    fetchStudData();
  }, [refresh, search, currentPage]);

  // ===================================

  return (
    <div className="fac-attendance-outer" >
      <Container>
        <h1>Mark Attendance</h1>
        <hr></hr>
        {/* ================== search bar ===================== */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search student name"
            className="form-control"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        {/* ===================================================== */}
        <TableContainer component={Paper} className="facultyResultTable">
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
            {students.length > 0 ? 
              <TableRow className="table-head">
                <StyledTableCell style={{ color: "white" }}>
                  No.
                </StyledTableCell>
                <StyledTableCell style={{ color: "white" }}>
                  Date
                </StyledTableCell>
                <StyledTableCell style={{ color: "white" }}>
                  Student Name
                </StyledTableCell>
                <StyledTableCell style={{ color: "white" }}>
                  Status
                </StyledTableCell>
                <StyledTableCell style={{ color: "white" }}>
                  Actions
                </StyledTableCell>
              </TableRow> :''}
              {students.length > 0 ? (
                students.map((row, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell>{i + 1}</StyledTableCell>
                    <StyledTableCell>
                      {formatDateToDDMMYYYY(row.date)}
                    </StyledTableCell>
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
                          anchorEl={select}
                          open={open && selectedStudent?._id === row._id}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              width: "20ch",
                            },
                          }}
                        >
                          <MenuItem
                            onClick={() => handleSaveAttendance("Present")}
                          >
                            Present
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleSaveAttendance("Absent")}
                          >
                            Absent
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleSaveAttendance("Half Day")}
                          >
                            Half Day
                          </MenuItem>
                        </Menu>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <div><h6>No attendance List </h6></div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      {students?.length === 0 && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px", marginTop: "30px" }}
        >
          <img src={nodata} alt="No Data" />
        </div>
      )}
      {students?.length > 0 ? (
        <div >
          <Stack spacing={2}>
            <div className="d-flex justify-content-center mt-3 pagination-out">
              <Pagination
                count={total}
                page={currentPage}
                onChange={changePage}
                shape="rounded"
              />
            </div>
          </Stack>
        </div>
      ) : (
        ""
      )}
      </Container>
    </div>
  );
};

export default FacAttendance;
