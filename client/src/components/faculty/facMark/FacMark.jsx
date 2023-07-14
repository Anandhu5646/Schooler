import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Badge,
} from "@mui/material";
import {
  getAllSubj,
  getStudentByClass,
  saveMarkData,
} from "../../../api/facultyApi";
import "./FacMark.css";
import { FcUpload } from "react-icons/fc";

function MarkAttendanceTable({ students }) {
  const [studentsList, setStudentsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [markValue, setMarkValue] = useState("");
  const [gradeValue, setGradeValue] = useState("");

  const fetchStudents = async () => {
    try {
      const response = await getStudentByClass();
      setStudentsList(response);
    } catch (error) {
      console.error("Error fetching student list:", error);
    }
  };

  const handleUploadMark = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchSubjects = async () => {
    try {
      const response = await getAllSubj();
      setSubjects(response);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const saveMark = async () => {
    try {
      await saveMarkData(
        selectedStudent,
        selectedSubject,
        markValue,
        gradeValue
      );

      // Update the status of the selected student to "Uploaded" locally
      const updatedStudentsList = studentsList.map((student) => {
        if (student._id === selectedStudent) {
          return {
            ...student,
            mark: {
              ...student.mark,
              status: "Uploaded",
            },
          };
        }
        return student;
      });
      setStudentsList(updatedStudentsList);

      // Save the updated studentsList to local storage
      localStorage.setItem("studentsList", JSON.stringify(updatedStudentsList));

      setShowModal(false);
    } catch (error) {
      console.error("Error saving mark data:", error);
    }
  };

  const isMarkUploaded = (studentId) => {
    const storedStudentsList = JSON.parse(localStorage.getItem("studentsList"));
    const student = storedStudentsList?.find((student) => student._id === studentId);
    return student?.mark?.status === "Uploaded";
  };

  useEffect(() => {
    // Check if studentsList exists in local storage
    const storedStudentsList = JSON.parse(localStorage.getItem("studentsList"));

    if (storedStudentsList) {
      setStudentsList(storedStudentsList);
    } else {
      fetchStudents();
    }

    fetchSubjects();
  }, []);
  return (
    <div style={{ marginTop: "50px", width: "90%", marginLeft: "100px" }}>
      <div className="d-flex justify-content-between">
        <h2>Mark Results</h2>
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
              <TableCell style={{ color: "white" ,paddingLeft:"45px"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsList && studentsList.length > 0 ? (
              studentsList.map((student, index) => (
                <TableRow key={student._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.className}</TableCell>
                  <TableCell style={{ paddingLeft:'38px' }}>
                    <Badge
                      badgeContent={
                        isMarkUploaded(student._id) ? "Uploaded" : "Pending"
                      }
                      color={isMarkUploaded(student._id) ? "success" : "error"}
                      sx={{ minWidth: "fit-content", borderRadius: 999 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleUploadMark(student._id)}
                      variant="primary"
                      size="sm"
                      style={{background:"white"}}
                    >
                     <FcUpload/>
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

      {/*============== Modal ======================*/}

      <Modal
        style={{ zIndex: 10000, marginTop: "100px" }}
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Mark upload</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Select subject:</p>
          <select
            style={{ color: "black" }}
            className="custom-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option style={{ color: "black" }} value="">
              Select subject
            </option>
            {subjects.length > 0 &&
              subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.subName}
                </option>
              ))}
          </select>
          <div className="mt-3">
            <label htmlFor="markInput" className="form-label">
              Mark:
            </label>
            <input
              type="text"
              className="form-control"
              id="markInput"
              placeholder="Enter mark"
              name="marks"
              value={markValue}
              onChange={(e) => setMarkValue(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="markInput" className="form-label">
              Grade:
            </label>
            <input
              type="text"
              className="form-control"
              id="markInput"
              placeholder="Enter mark"
              name="grade"
              value={gradeValue}
              onChange={(e) => setGradeValue(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={saveMark}
           >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MarkAttendanceTable;
