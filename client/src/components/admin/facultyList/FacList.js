import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FacList.css";
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
  fetchFacultyList,
  addFaculty,
  deleteFac,
  updateFaculty,
  saveUpdateFaculty,
} from "../../../api/adminApi";
import Swal from "sweetalert2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import nodata from "../../../assets/nodata.gif";

function FacList() {
  const [refresh, setRefresh] = useState(false);
  const [facultyList, setFacultyList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchFacultyData = async () => {
    try {
      const faculties = await fetchFacultyList(search, currentPage);
      setFacultyList(faculties.faculties);
      setTotal(faculties.total);
      setRefresh(true);
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
  // ================================
  const [formValue, setFormValue] = useState({
    name: "",
    age: "",
    qualification: "",
    dob: "",
    teachingArea: "",
    email: "",
    password: "",
    mobile: "",
    joiningYear: "",
    gender: "",
    address: "",
    className: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    age: "",
    qualification: "",
    dob: "",
    teachingArea: "",
    email: "",
    password: "",
    mobile: "",
    joiningYear: "",
    gender: "",
    address: "",
    className: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;

    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormValue({ ...formValue, [name]: value });
  };
  // ==================================
  const handleAddFaculty = async () => {
    const newFieldErrors = {};

    if (!formValue.name) {
      newFieldErrors.name = "Name is required";
    }
    if (!formValue.age) {
      newFieldErrors.age = "Age is required";
    }
    if (!formValue.qualification) {
      newFieldErrors.qualification = "Qualification is required";
    }
    if (!formValue.dob) {
      newFieldErrors.dob = "DOB is required";
    }
    if (!formValue.teachingArea) {
      newFieldErrors.teachingArea = "TeachingArea is required";
    }
    if (!formValue.email) {
      newFieldErrors.email = " Email is required";
    }
    if (!formValue.password) {
      newFieldErrors.password = " Password is required";
    }
    if (!formValue.mobile) {
      newFieldErrors.mobile = "Mobile is required";
    } else if (formValue.mobile.length !== 10) {
      newFieldErrors.mobile = "Mobile number must be 10 digits";
    }
    if (!formValue.joiningYear) {
      newFieldErrors.joiningYear = "JoiningYear is required";
    }
    if (!formValue.gender) {
      newFieldErrors.gender = " gender is required";
    }
    if (!formValue.address) {
      newFieldErrors.address = " address is required";
    }
    if (!formValue.className) {
      newFieldErrors.className = "className is required";
    }
    setFieldErrors(newFieldErrors);
    if (Object.keys(newFieldErrors).length === 0) {
      try {
        const response = await addFaculty(formValue);

        toast.success("Faculty added successfully!", {
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
        toast.error("Error adding faculty!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  // ============================================
  const deleteFaculty = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this faculty. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#212A3E",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await deleteFac(id);
        const updatedFacultyList = facultyList.filter(
          (faculty) => faculty._id !== id
        );
        setFacultyList(updatedFacultyList);
        toast.success("The student has been deleted.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the faculty.",
        "error"
      );
    }
  };
  // =================== edit code ==================
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [joiningYear, setJoiningYear] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [className, setClassName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [qualification, setQualification] = React.useState("");
  const [age, setAge] = React.useState("");
  const [teachingArea, setTeachingArea] = React.useState("");
  const [id, setid] = React.useState("");
  const [ErrMsg, setErrmsg] = React.useState("");

  const handleOpenEdit = async (id) => {
    setid(id);
    let response = await updateFaculty(id);

    setOpen(true);
    setName(response.name);
    setEmail(response.email);
    setMobile(response.mobile);
    setDob(response.dob);
    setJoiningYear(response.joiningYear);
    setAddress(response.address);
    setTeachingArea(response.teachingArea);
    setQualification(response.qualification);
    setGender(response.gender);
    setAge(response.age);
    setClassName(response.className);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlesaveEditFaculty = async () => {
    if (
      id.trim() &&
      name.trim() &&
      email.trim() &&
      mobile.trim() &&
      address.trim() &&
      teachingArea.trim() &&
      dob.trim() &&
      qualification.trim() &&
      joiningYear.trim() &&
      gender.trim() &&
      age.trim() &&
      className.trim()
    ) {
      try {
        await saveUpdateFaculty(
          id,
          name,
          email,
          mobile,
          address,
          joiningYear,
          dob,
          teachingArea,
          gender,
          age,
          className,
          qualification
        );

        setRefresh(!refresh);
        setOpen(false);
        setErrmsg("");
      } catch (error) {
        console.error("Error:", error);
        setErrmsg("An error occurred while saving the edited faculty.");
      }
    } else {
      setErrmsg("Fill All The Fields");
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, [refresh, search, currentPage]);
  return (
    <div className="outer-container">
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Faculty List</h1>

        <Button
          className="add-btn"
          variant="primary"
          style={{ background: "#394867" }}
          onClick={toggleModal}
          title="Add Faculty"
        >
          Add faculty
        </Button>
      </div>
      {/* ================== search bar ===================== */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search faculty name..."
          className="form-control"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      {/* ===================================================== */}
      <Table striped bordered hover responsive>
        {facultyList.length > 1 ? (
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Class</th>
              <th>Join Year</th>
              <th>Mobile</th>
              <th>DOB</th>
              <th>Age</th>
              <th className=" ms-5">Action</th>
            </tr>
          </thead>
        ) : (
          ""
        )}

        <tbody>
          {facultyList.length > 0 ? (
            facultyList.map((faculty, index) => (
              <tr key={faculty._id}>
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
                      <p className="fw-bold mb-1">{faculty.name}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{faculty.className}</p>
                </td>
                <td>
                  <p className="fw-normal mb-1">{faculty.joiningYear}</p>
                </td>
                <td>
                  <p className="fw-normal mb-1">{faculty.mobile}</p>
                </td>
                <td>{faculty.dob}</td>
                <td>{faculty.age}</td>
                <td>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => handleOpenEdit(faculty._id)}
                  >
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="link"
                    onClick={() => deleteFaculty(faculty._id)}
                    size="sm"
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <h6>No Faculty Data</h6>
            </div>
          )}
        </tbody>
      </Table>
      {facultyList.length === 0 && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <img src={nodata} alt="No Data" />
        </div>
      )}
      {facultyList?.length > 0 ? (
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

      <Modal
        show={showModal}
        onHide={toggleModal}
        centered
        className="modal-outer"
      >
        <Modal.Header closeButton style={{ marginTop: "50px" }}>
          <Modal.Title>Add Faculty</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Container className="input-field">
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Label>Faculty's Name</Form.Label>
                  <Form.Control
                    value={formValue.name}
                    name="name"
                    onChange={onChange}
                    required
                  />
                  {fieldErrors.name && (
                    <div style={{ color: "red" }} className="error">
                      {fieldErrors.name}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    value={formValue.qualification}
                    name="qualification"
                    onChange={onChange}
                    required
                  />
                  {fieldErrors.qualification && (
                    <div style={{ color: "red" }} className="error">
                      {fieldErrors.qualification}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Label>Teaching Area</Form.Label>
                  <Form.Control
                    value={formValue.teachingArea}
                    name="teachingArea"
                    onChange={onChange}
                    required
                  />
                  {fieldErrors.teachingArea && (
                    <div style={{ color: "red" }} className="error">
                      {fieldErrors.teachingArea}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} lg={4}>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    value={formValue.dob}
                    name="dob"
                    type="date"
                    onChange={onChange}
                    required
                  />
                  {fieldErrors.dob && (
                    <div style={{ color: "red" }} className="error">
                      {fieldErrors.dob}
                    </div>
                  )}
                </Col>
                <Col xs={12} lg={4}>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    value={formValue.age}
                    name="age"
                    type="number"
                    onChange={onChange}
                    required
                  />
                  {fieldErrors.age && (
                    <div style={{ color: "red" }} className="error">
                      {fieldErrors.age}
                    </div>
                  )}
                </Col>
                <Col xs={12} lg={4}>
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    value={formValue.className}
                    name="className"
                    onChange={onChange}
                    required
                  />
                  {fieldErrors.className && (
                    <div style={{ color: "red" }} className="error">
                      {fieldErrors.className}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={formValue.email}
                    name="email"
                    type="email"
                    onChange={onChange}
                    required
                  />
                  {fieldErrors.email && (
                    <div style={{ color: "red" }} className="error">
                      {fieldErrors.email}
                    </div>
                  )}
                </Col>
                <Col xs={12}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={formValue.password}
                    name="password"
                    type="password"
                    onChange={onChange}
                    required
                  />
                  {fieldErrors.password && (
                    <div style={{ color: "red" }} className="error">
                      {fieldErrors.password}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} lg={6}>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    value={formValue.mobile}
                    name="mobile"
                    onChange={onChange}
                    required
                  />
                  {fieldErrors.mobile && (
                    <div style={{ color: "red" }} className="error">
                      {fieldErrors.mobile}
                    </div>
                  )}
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Label>Join Year</Form.Label>
                  <Form.Control
                    value={formValue.joiningYear}
                    name="joiningYear"
                    onChange={onChange}
                    required
                  />
                  {fieldErrors.joiningYear && (
                    <div style={{ color: "red" }} className="error">
                      {fieldErrors.joiningYear}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={formValue.address}
                    name="address"
                    onChange={onChange}
                    required
                  />{" "}
                  {fieldErrors.address && (
                    <div style={{ color: "red" }} className="error">
                      {fieldErrors.address}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
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
                  {fieldErrors.gender && (
                    <div style={{ color: "red" }} className="error">
                      {fieldErrors.gender}
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button
              onClick={handleAddFaculty}
              style={{ background: "#394867" }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* ======================== edit modal ======================= */}

      <Modal show={open} onHide={handleClose} centered className="modal-outer">
        <Modal.Header closeButton style={{ marginTop: "50px" }}>
          <Modal.Title>Edit Faculty</Modal.Title>
          <p style={{ color: "red" }}>{ErrMsg}</p>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Container className="input-field">
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Label>Faculty's Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    value={qualification}
                    name="qualification"
                    onChange={(e) => setQualification(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Label>Teaching Area</Form.Label>
                  <Form.Control
                    value={teachingArea}
                    name="teachingArea"
                    onChange={(e) => setTeachingArea(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} lg={4}>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    value={dob}
                    name="dob"
                    type="date"
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </Col>
                <Col xs={12} lg={4}>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    value={age}
                    name="age"
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </Col>
                <Col xs={12} lg={4}>
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
                <Col xs={12}>
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
                <Col xs={12} lg={6}>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    value={mobile}
                    name="mobile"
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Label>Join Year</Form.Label>
                  <Form.Control
                    value={joiningYear}
                    name="joiningYear"
                    onChange={(e) => setJoiningYear(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={address}
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
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
              onClick={handlesaveEditFaculty}
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

export default FacList;
