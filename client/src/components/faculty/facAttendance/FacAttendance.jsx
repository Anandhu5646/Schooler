import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./FacAttendance.css";
import Badge from "@mui/material/Badge";
import { Button, Modal } from "react-bootstrap";
import {
  fetchStudentsByclass,
  saveAttendanceData,
} from "../../../api/facultyApi";
import Swal from "sweetalert2";

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
  const [isClicked, setIsClicked] = useState(false);
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markAttendance, setMarkAttendance] = useState(() => {
    const storedAttendance = localStorage.getItem("markAttendance");
    return storedAttendance ? JSON.parse(storedAttendance) : {};
  });

  const handleClick = () => {
    setIsClicked(!isClicked);
    setShowModal(true);
  };

  const buttonStyle = {
    backgroundColor: isClicked ? "#035603" : "rgb(12 165 12)",
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

  useEffect(() => {
    localStorage.setItem("markAttendance", JSON.stringify(markAttendance));
  }, [markAttendance]);

  const handleRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMarkAttendance = async () => {
    try {
      const attendanceData = Object.entries(markAttendance).map(
        ([studentId, status]) => ({
          student: studentId,
          status: status ? "Present" : "Absent",
          date: selectedDate,
        })
      );
      console.log(attendanceData, "attendanceData");
      await saveAttendanceData(attendanceData);
      Swal.fire({
        icon:"success",
        text:"Uploaded attendance successfully"
      })
      handleCloseModal();
      handleRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setMarkAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: status,
    }));
  };

  return (
    <div>
      <div style={{ marginTop: "50px", width: "90%", marginLeft: "100px" }}>
        <div className="d-flex justify-content-between">
          <h2>Mark Attendance</h2>
          <div className="">
            <Button
              className="ms-2"
              style={{ background: "green" }}
              onClick={handleClick}
            >
              Mark Attendance
            </Button>
            <Button
              className="ms-2"
              style={{ background: "#212A3E" }}
              onClick={handleRefresh}
            >
              Report
            </Button>
          </div>
        </div>
        <hr></hr>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sl No</StyledTableCell>
                <StyledTableCell>Student Name</StyledTableCell>
                <StyledTableCell>Roll No</StyledTableCell>
                <StyledTableCell>Class</StyledTableCell>
                <StyledTableCell>Attendance Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students && students.length > 0 ? (
                students.map((student, index) => (
                  <StyledTableRow key={student._id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{student.name}</StyledTableCell>
                    <StyledTableCell>{student.rollNo}</StyledTableCell>
                    <StyledTableCell>{student.className}</StyledTableCell>
                    <StyledTableCell style={{ paddingLeft: "70px" }}>
                      <Badge
                        badgeContent={
                          markAttendance[student._id] ? "Present" : "Absent"
                        }
                        color={
                          markAttendance[student._id] ? "success" : "error"
                        }
                        sx={{ minWidth: "fit-content", borderRadius: 999 }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={5} align="center">
                    No students found
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/*============== Attendance Modal ====================== */}
      <form>
        <Modal show={showModal} onHide={handleCloseModal} style={{marginTop:"100px", zIndex:10000}}>
          <Modal.Header closeButton>
            <Modal.Title >
              Mark Attendance
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Date: {selectedDate.toLocaleDateString()}</h5>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sl No</StyledTableCell>
                    <StyledTableCell>Student Name</StyledTableCell>
                    <StyledTableCell>
                      <strong>Present</strong>
                    </StyledTableCell>
                    <StyledTableCell>
                      <strong>Absent</strong>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students && students.length > 0 ? (
                    students.map((student, index) => (
                      <StyledTableRow key={student._id}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{student.name}</StyledTableCell>
                        <StyledTableCell>
                          <input
                            type="checkbox"
                            checked={markAttendance[student._id] === true}
                            onChange={() =>
                              handleAttendanceChange(student._id, true)
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <input
                            type="checkbox"
                            checked={markAttendance[student._id] === false}
                            onChange={() =>
                              handleAttendanceChange(student._id, false)
                            }
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <StyledTableRow>
                      <StyledTableCell colSpan={4} align="center">
                        No students found
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleMarkAttendance}
              style={{ background: "#212A3E" }}
            >
              Save Attendance
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};

export default FacAttendance;
