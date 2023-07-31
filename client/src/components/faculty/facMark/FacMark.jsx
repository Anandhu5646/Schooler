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
import { MdUpload } from "react-icons/md";
import Swal from "sweetalert2";

function MarkAttendanceTable() {
  const [studentsList, setStudentsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [markValue, setMarkValue] = useState("");
  const [gradeValue, setGradeValue] = useState("");
  const [subjectName, setSubjectName] = useState("");

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
  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);
  useEffect(() => {
    const selectedSubjectDetails = subjects.find(
      (subject) => subject._id === selectedSubject
    );
    if (selectedSubjectDetails) {
      setSelectedSubject(selectedSubjectDetails._id);
      setSubjectName(selectedSubjectDetails.subName);
    }
  }, [selectedSubject, subjects]);
  const saveMark = async () => {
    try {
      await saveMarkData(
        selectedStudent,
        selectedSubject,
        subjectName,
        markValue,
        gradeValue
      );

      Swal.fire({
        icon: "success",
        text: "Uploaded mark successfully",
      });
      setMarkValue("");
      setSelectedStudent("");
      setGradeValue("");
      setShowModal(false);
    } catch (error) {
      console.error("Error saving mark data:", error);
    }
  };

  return (
    <div style={{ marginTop: "50px", width: "90%", marginLeft: "100px" }}>
      <div className="d-flex justify-content-between">
        <h1>Mark Results</h1>
      </div>
      <hr />
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow style={{ background: "black" }}>
              <TableCell style={{ color: "white" }}>Sl No</TableCell>
              <TableCell style={{ color: "white" }}>Student Name</TableCell>
              <TableCell style={{ color: "white" }}>Roll No</TableCell>
              <TableCell style={{ color: "white" }}>Class</TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Upload
              </TableCell>
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
                  <TableCell align="center">
                    <Button
                      onClick={() => handleUploadMark(student._id)}
                      variant="primary"
                      size="sm"
                      style={{ background: "grey" }}
                    >
                      <MdUpload />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
          <Button
            variant="primary"
            onClick={saveMark}
            style={{ background: "#394867" }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MarkAttendanceTable;
