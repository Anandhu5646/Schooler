import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Table,
  Form,
  FormControl,
} from "react-bootstrap";
import avatar from "../../../assets/avatar.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import { deleteSubjects } from "../../../api/adminApi";

function SubjectList() {
  const [subjectList, setSubjectList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [formValue, setFormValue] = useState({
    subName: "",
    subCode: "",
    subCredit: "",
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
    try {
      const response = await axios.post("/admin/addSubject", formValue);
      if (response.data.success) {
        console.log("Faculty data saved:", response.data.subject);
        setRefresh(!refresh);
        setFormValue({
          subName: "",
          subCode: "",
          subCredit: "",
        })
      } else {
        console.error("Error saving faculty data:", response.data.error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
    handleClose()
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
        <Button style={{ background: "#394867" }} onClick={handleShow}>
          Add subject
        </Button>
      </div>
      <Table align="middle">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Subject Name</th>
            <th scope="col">Subject Code</th>
            <th scope="col">Subject Credit</th>
            <th scope="col" className="d-flex ms-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
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
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => deleteSubject(subject._id)}
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ============================ Modal  ========================================= */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginTop: "50px" }}>Add Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <FormControl
                value={formValue.subName}
                name="subName"
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject Code</Form.Label>
              <FormControl
                value={formValue.subCode}
                name="subCode"
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject Credit</Form.Label>
              <FormControl
                value={formValue.subCredit}
                name="subCredit"
                onChange={onChange}
                type="number"
                required
              />
            </Form.Group>
          </Form>
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
