import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import avatar from "../../../assets/avatar.jpg";
import {
  fetchStudentList,
  addStudent,
  deleteStudent,
  updateStudent,
  saveUpdateStudent,
} from "../../../api/adminApi";
import Swal from "sweetalert2";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import nodata from '../../../assets/nodata.gif'

function StudentList() {
  const [refresh, setRefresh] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totals, setTotals] = useState(0);



  const fetchStudentData = async () => {
    try {
      const students = await fetchStudentList(search, currentPage);
      setStudentList(students.students);
      setRefresh(true);
      setTotals(students.total);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  const changePage = (event, page) => {
    setCurrentPage(page);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  // ==============================================================
  const [formValue, setFormValue] = useState({
    name: "",
    age: "",
    fatherName: "",
    dob: "",
    motherName: "",
    email: "",
    password: "",
    mobile: "",
    admYear: "",
    gender: "",
    address: "",
    className: "",
    rollNo: "",
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  // ==================================================================
  const handleAddStudent = async () => {
    try {
      const response = await addStudent(formValue);
      console.log("data saved successfully", response);
      toast.success("student added successfully!", {
        position: "top-center",
        autoClose: 300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setRefresh(!refresh);
      toggleModal();
      setFormValue({
        name: "",
        age: "",
        fatherName: "",
        dob: "",
        motherName: "",
        email: "",
        password: "",
        mobile: "",
        admYear: "",
        gender: "",
        address: "",
        className: "",
        rollNo: "",
      });
    } catch (err) {
      console.error("Error:", err);
      toast.error("Error adding student!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  useEffect(() => {
    fetchStudentData();
  }, [refresh, search, currentPage]);
  // ============================================
  const deleteStud = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this student. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#212A3E",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await deleteStudent(id);
        const updatedStudentList = studentList.filter(
          (student) => student._id !== id
        );
        setStudentList(updatedStudentList);
        Swal.fire("Deleted!", "The student has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the student.",
        "error"
      );
    }
  };
  // =================== edit code ==================
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [admYear, setAdmyear] = React.useState("");
  const [motherName, setMotherName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [className, setClassName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [fatherName, setFatherName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [rollNo, setRollNo] = React.useState("");
  const [id, setid] = React.useState("");
  const [ErrMsg, setErrmsg] = React.useState("");

  const handleOpenEdit = async (id) => {
    setid(id);
    let response = await updateStudent(id);

    setOpen(true);
    setName(response.name);
    setEmail(response.email);
    setMobile(response.mobile);
    setDob(response.dob);
    setAdmyear(response.admYear);
    setAddress(response.address);
    setFatherName(response.fatherName);
    setMotherName(response.motherName);
    setGender(response.gender);
    setAge(response.age);
    setRollNo(response.rollNo);
    setClassName(response.className);
    console.log(response);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlesaveEditStudent = () => {
    if (
      id.trim() &&
      name.trim() &&
      email.trim() &&
      mobile.trim() &&
      address.trim() &&
      fatherName.trim() &&
      dob.trim() &&
      admYear.trim() &&
      motherName.trim() &&
      gender.trim() &&
      age.trim() &&
      rollNo.trim() &&
      className.trim()
    ) {
      saveUpdateStudent(
        id,
        name,
        email,
        mobile,
        address,
        fatherName,
        dob,
        admYear,
        motherName,
        gender,
        age,
        className,
        rollNo
      );
      setRefresh(!refresh);
      setOpen(false);
    } else {
      setErrmsg("Fill All The Fields");
    }
  };
  return (
    <div
      className=""
      style={{ width: "80%", marginLeft: "200px", marginTop: "50px" }}
    >
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Student List</h1>
        <Link to="">
          <Button
            variant="primary"
            style={{ background: "#394867" }}
            onClick={toggleModal}
          >
            Add student
          </Button>
        </Link>
      </div>
      {/* ================== search bar ===================== */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search Student name"
          className="form-control"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      {/* ===================================================== */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Class</th>
            <th>Adm Year</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>Age</th>
            <th className=" ms-5">Action</th>
          </tr>
        </thead>

        <tbody>
          {studentList.length>0 ? ( studentList.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={avatar}
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{student.name}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{student.className}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{student.admYear}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{student.mobile}</p>
              </td>
              <td>{student.dob}</td>
              <td>{student.age}</td>
              <td>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleOpenEdit(student._id)}
                >
                  Edit
                </Button>

                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={() => deleteStud(student._id)}
                >
                  X
                </Button>
              </td>
            </tr>
          ))) : (
            <div><h6>No Student Data</h6></div>
          )}
        </tbody>
      </Table>
      {studentList.length === 0 && (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
            <img src={nodata} alt="No Data" />
          </div>
        )}
     {studentList?.length > 0 ? (
        <div>
          <Stack spacing={2}>
            <div className="d-flex justify-content-center mt-3">
              <Pagination
                count={totals}
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
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton style={{ marginTop: "50px" }}>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Container>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Student's Name</Form.Label>
                  <Form.Control
                    value={formValue.name}
                    name="name"
                    onChange={onChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Father's Name</Form.Label>
                  <Form.Control
                    value={formValue.fatherName}
                    name="fatherName"
                    onChange={onChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Mother's Name</Form.Label>
                  <Form.Control
                    value={formValue.motherName}
                    name="motherName"
                    onChange={onChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    value={formValue.dob}
                    name="dob"
                    type="date"
                    onChange={onChange}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    value={formValue.age}
                    name="age"
                    type="number"
                    onChange={onChange}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    value={formValue.className}
                    name="className"
                    onChange={onChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={formValue.email}
                    name="email"
                    type="email"
                    onChange={onChange}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={formValue.password}
                    name="password"
                    type="password"
                    onChange={onChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    value={formValue.mobile}
                    name="mobile"
                    onChange={onChange}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Admission Year</Form.Label>
                  <Form.Control
                    value={formValue.admYear}
                    name="admYear"
                    onChange={onChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={formValue.address}
                    name="address"
                    onChange={onChange}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Roll No.</Form.Label>
                  <Form.Control
                    value={formValue.rollNo}
                    name="rollNo"
                    onChange={onChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Gender</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      value="male"
                      checked={formValue.gender === "male"}
                      onChange={onChange}
                      required
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      value="female"
                      checked={formValue.gender === "female"}
                      onChange={onChange}
                      required
                    />
                    <Form.Check
                      type="radio"
                      label="Other"
                      name="gender"
                      value="other"
                      checked={formValue.gender === "other"}
                      onChange={onChange}
                      required
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"
             onClick={toggleModal}>
              Close
            </Button>
            <Button
              onClick={handleAddStudent}
              style={{ background: "#394867" }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* ======================== edit modal ======================= */}

      <Modal show={open} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ marginTop: "50px" }}>
          <Modal.Title>Edit Student</Modal.Title>
          <p style={{ color: "red" }}>{ErrMsg}</p>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Container>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Student's Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Father's Name</Form.Label>
                  <Form.Control
                    value={fatherName}
                    name="fatherName"
                    onChange={(e) => setFatherName(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Mother's Name</Form.Label>
                  <Form.Control
                    value={motherName}
                    name="motherName"
                    onChange={(e) => setMotherName(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    value={dob}
                    name="dob"
                    type="date"
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    value={age}
                    name="age"
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    value={className}
                    name="className"
                    onChange={(e) => setClassName(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={email}
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    value={mobile}
                    name="mobile"
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Admission Year</Form.Label>
                  <Form.Control
                    value={admYear}
                    name="admYear"
                    onChange={(e) => setAdmyear(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={address}
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Roll No.</Form.Label>
                  <Form.Control
                    value={rollNo}
                    name="rollNo"
                    onChange={(e) => setRollNo(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Gender</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    />
                    <Form.Check
                      type="radio"
                      label="Other"
                      name="gender"
                      value="other"
                      checked={gender === "other"}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              onClick={handlesaveEditStudent}
              type="submit"
              style={{ background: "#394867" }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default StudentList;
