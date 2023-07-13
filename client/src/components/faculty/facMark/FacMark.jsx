import React from "react";
import { Button } from "react-bootstrap";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Badge } from "@mui/material";

function MarkAttendanceTable({ students }) {
  const handleUploadMark = (studentId) => {
    // Handle the logic for uploading mark for a specific student here
    console.log(`Uploading mark for student ${studentId}`);
  };

  const isMarkUploaded = (studentId) => {
    // Implement your logic to determine if mark is uploaded for a student
    return true; // Return true if mark is uploaded, false otherwise
  };

  return (
    <div style={{ marginTop: "50px", width: "90%", marginLeft: "100px" }}>
      <div className="d-flex justify-content-between">
        <h2>Mark Attendance</h2>
      </div>
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow style={{ background: "black" }}>
              <TableCell style={{ color: "white" }}>Sl No</TableCell>
              <TableCell style={{ color: "white" }}>Student Name</TableCell>
              <TableCell style={{ color: "white" }}>Roll No</TableCell>
              <TableCell style={{ color: "white" }}>Class</TableCell>
              <TableCell style={{ color: "white" }}>Status</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students && students.length > 0 ? (
              students.map((student, index) => (
                <TableRow key={student._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.className}</TableCell>
                  <TableCell>
                    <Badge
                      badgeContent={isMarkUploaded(student._id) ? "Uploaded" : "Not Uploaded"}
                      color={isMarkUploaded(student._id) ? "success" : "error"}
                      sx={{ minWidth: "fit-content", borderRadius: 999 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleUploadMark(student._id)}
                      variant="primary"
                      size="sm"
                      disabled={isMarkUploaded(student._id)}
                    >
                      Upload Mark
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MarkAttendanceTable;
