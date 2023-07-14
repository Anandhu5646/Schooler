import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import avatar from "../../../assets/avatar.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import { deleteSubjects } from "../../../api/adminApi";
import { Button, Modal } from "react-bootstrap";

function SubjectList() {
  const [subjectList, setSubjectList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [formValue, setFormValue] = useState({
    subjectName: "",
    subjectCode: "",
    subjectCredit: "",
  });

  const fetchSubjectList = async () => {
    try {
      const response = await axios.get("/admin/viewSubjects", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.success) {
        console.log("Faculty list:", response.data.subjects);
        setSubjectList(response.data.subjects);
        setRefresh(true);
      } else {
        console.error("Error fetching faculty list:", response.data.error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const deleteSubject = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this subject. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#212A3E",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await deleteSubjects(id);
        const updatedSubjectList = subjectList.filter(
          (subject) => subject._id !== id
        );
        setSubjectList(updatedSubjectList);
        setRefresh(false);
        Swal.fire("Deleted!", "The subject has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the subject.",
        "error"
      );
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddSubject = async (event) => {
    event.preventDefault();
    handleClose()
    try {
      const response = await axios.post("/admin/addSubject", formValue);
      if (response.data.success) {
        console.log("Faculty data saved:", response.data.subject);
        setRefresh(!refresh);
      } else {
        console.error("Error saving faculty data:", response.data.error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchSubjectList();
  }, [refresh]);
  return (
    <div
      className=""
      style={{ width: "80%", marginLeft: "200px", marginTop: "50px" }}
    >
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Subject List</h1>
        <MDBBtn style={{ background: "#394867" }} onClick={handleShow}>
          Add subject
        </MDBBtn>
      </div>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Subject Name</th>
            <th scope="col">Subject Code</th>
            <th scope="col">Subject Credit</th>
            {/* <th scope="col">Subject Class</th> */}
            <th scope="col" className="d-flex ms-4">
              Action
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {subjectList.map((subject, index) => (
            <tr key={subject._id}>
              <td>{index + 1}</td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{subject.subName}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{subject.subCode}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{subject.subCredit}</p>
              </td>
              <td>
                <MDBBtn
                  color="link"
                  rounded
                  size="sm"
                  onClick={() => deleteSubject(subject._id)}
                >
                  X
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {/* ============================ Modal  ========================================= */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{marginTop:"50px"}}>Add Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBModalBody>
            <div className="mb-3">
              <MDBInput
                value={formValue.subName}
                name="subName"
                onChange={onChange}
                label="Subject Name"
                required
              />
            </div>
            <div className="mb-3">
              <MDBInput
                value={formValue.subCode}
                name="subCode"
                onChange={onChange}
                label="Subject Code"
                required
              />
            </div>
            <div className="mb-3">
              <MDBInput
                value={formValue.subCredit}
                name="subCredit"
                onChange={onChange}
                type="number"
                label="Subject Credit"
                required
              />
            </div>
          </MDBModalBody>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSubject}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default SubjectList;
