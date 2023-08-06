import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { deleteSubjects } from "../../../api/adminApi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import nodata from "../../../assets/nodata.gif";

function SubjectList() {
  const [subjectList, setSubjectList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [formValue, setFormValue] = useState({
    subName: "",
    subCode: "",
    subCredit: "",
  });

  const fetchSubjectList = async (search, currentPage) => {
    try {
      const response = await axios.get(
        "/admin/viewSubjects",
        { params: { search, currentPage } },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setSubjectList(response.data.subjects);
        setTotal(response.data.total);
        setRefresh(true);
      } else {
        console.error("Error fetching faculty list:", response.data.error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    fetchSubjectList(search, currentPage);
  }, [refresh, search, currentPage]);

  const changePage = (event, page) => {
    setCurrentPage(page);
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
        console.log("subject data saved:", response.data.subject);
        setRefresh(!refresh);
        setFormValue({
          subName: "",
          subCode: "",
          subCredit: "",
        });
      } else {
        console.error("Error saving faculty data:", response.data.error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
    handleClose();
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

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
      {/* ================== search bar ===================== */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search subject name"
          className="form-control"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      {/* ===================================================== */}
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
          {subjectList?.length > 0 ? (
            subjectList.map((subject, index) => (
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
                  <p className="fw-normal mb-1" style={{ marginLeft: "24px" }}>
                    {subject.subCredit}
                  </p>
                </td>
                <td>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => deleteSubject(subject._id)}
                    style={{ marginLeft: "24px" }}
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <div>
              <h6>No Subject Data</h6>
            </div>
          )}
        </tbody>
      </Table>
      {subjectList.length === 0 && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px", marginTop: "-50px" }}
        >
          <img src={nodata} alt="No Data" />
        </div>
      )}
      {subjectList?.length > 0 ? (
        <div>
          <Stack spacing={2}>
            <div className="d-flex justify-content-center mt-3">
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
      {/* ============================ Modal  ========================================= */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
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
