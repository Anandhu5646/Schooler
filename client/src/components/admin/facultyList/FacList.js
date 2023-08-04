

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Button, Modal, Form, Row, Col, Container } from "react-bootstrap";
import avatar from "../../../assets/avatar.jpg";
import {
  fetchFacultyList,
  addFaculty,
  deleteFac,

  updateFaculty,
  saveUpdateFaculty,
} from "../../../api/adminApi";
import Swal from "sweetalert2";

function FacList() {

  const [refresh, setRefresh] = useState(false);
  const [facultyList, setFacultyList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [filteredFacultyList, setFilteredFacultyList] = useState([]);

  const fetchFacultyData = async () => {
    try {
      const faculties = await fetchFacultyList();
      setFacultyList(faculties);
      setRefresh(true);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    setFilteredFacultyList(facultyList);
  }, [facultyList]);
  const handleSearch = (keyword) => {
    const filteredList = facultyList.filter(
      (faculty) =>
        faculty.name.toLowerCase().includes(keyword) ||
        faculty.className.toLowerCase().includes(keyword)
    );
    setFilteredFacultyList(filteredList);
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

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  // ==================================
  const handleAddFaculty = async () => {
    try {

      const response = await addFaculty(formValue);
      console.log("data saved successfully", response);
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
      console.error("Error:", err);
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
        Swal.fire("Deleted!", "The faculty has been deleted.", "success");
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
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [mobile, setMobile] = React.useState('')
  const [dob, setDob] = React.useState('')
  const [joiningYear, setJoiningYear] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [className, setClassName] = React.useState('')
  const [gender, setGender] = React.useState('')
  const [qualification, setQualification] = React.useState('')
  const [age, setAge] = React.useState('')
  const [teachingArea, setTeachingArea] = React.useState('')
  const [id, setid] = React.useState('')
  const [ErrMsg, setErrmsg] = React.useState('')


  const handleOpenEdit = async (id) => {

    setid(id)
    let response = await updateFaculty(id)

    setOpen(true);
    setName(response.name)
    setEmail(response.email)
    setMobile(response.mobile)
    setDob(response.dob)
    setJoiningYear(response.joiningYear)
    setAddress(response.address)
    setTeachingArea(response.teachingArea)
    setQualification(response.qualification)
    setGender(response.gender)
    setAge(response.age)
    setClassName(response.className)
    

  }
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
        setErrmsg('');
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
  }, [refresh]);
  return (
    <div
      className=""
      style={{ width: "80%", marginLeft: "200px", marginTop: "50px" }}
    >
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Faculty List</h1>
        <Link to="">
          <Button
            variant="primary"
            style={{ background: "#394867" }}
            onClick={toggleModal}
          >
            Add faculty
          </Button>
        </Link>
      </div>
{/* ================== search bar ===================== */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search faculty name or class..."
          className="form-control"
          onChange={(e) => handleSearch(e.target.value.toLowerCase())}
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
            <th>Join Year</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>Age</th>
            <th className=" ms-5">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredFacultyList.map((faculty, index) => (
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
                <Button variant="link" rounded size="sm"
                  onClick={() => handleOpenEdit(faculty._id)}>
                  Edit
                </Button>
                
                <Button
                  type="button"
                  variant="link"
                  onClick={() => deleteFaculty(faculty._id)}
                  rounded
                  size="sm"
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton style={{ marginTop: "50px" }}>
          <Modal.Title>Add Faculty</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Container>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Faculty's Name</Form.Label>
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
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    value={formValue.qualification}
                    name="qualification"
                    onChange={onChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Teaching Area</Form.Label>
                  <Form.Control
                    value={formValue.teachingArea}
                    name="teachingArea"
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
                  <Form.Label>Join Year</Form.Label>
                  <Form.Control
                    value={formValue.joiningYear}
                    name="joiningYear"
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

      <Modal show={open} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ marginTop: "50px" }}>
          <Modal.Title>Edit Faculty</Modal.Title>
          <p style={{ color: 'red' }}>{ErrMsg}</p>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Container>
              <Row className="mb-3">
                <Col>
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
                <Col>
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
                <Col>
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
                <Col>
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
