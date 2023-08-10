import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Modal, Form } from "react-bootstrap";
import {
  addClub,
  deleteClub,
  fetchClubList,
  getStudentClubFac,
} from "../../../api/adminApi";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import nodata from "../../../assets/nodata.gif";
import "./ClubList.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClubList = () => {
  const [clubList, setClubList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [faculty, setFaculty] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    description: "",
    facultyName: "",
  });
  const validateForm = () => {
    let errors = {};

    if (!formValue.name) {
      errors.name = "Club name is required.";
    }

    if (!formValue.description) {
      errors.description = "Club description is required.";
    }

    if (!selectedFaculty) {
      errors.facultyName = "Club co-ordinator is required.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const fetchClubData = async () => {
    try {
      const clubs = await fetchClubList(search, currentPage);
      setClubList(clubs.clubs);
      setTotal(clubs.total);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddClub = async () => {
    try {
      if (!selectedFaculty) {
        toast.error("Please select a faculty.", {
          autoClose: 2000,
        });
        return;
      }

      const isFormValid = validateForm();

      if (isFormValid) {
        const clubData = {
          ...formValue,
          facultyId: selectedFaculty._id,
          facultyName: selectedFaculty.name,
        };

        const response = await addClub(clubData);
        toast.success("The club has been created.", {
          autoClose: 2000,
        });

        setFormValue({
          name: "",
          description: "",
        });
        setSelectedFaculty(null);
        setRefresh(true);
        toggleModal();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const fetchFacultyData = async () => {
    try {
      const response = await getStudentClubFac();
      setFaculty(response);
      setRefresh(false);
    } catch (err) {
      console.error("Error fetching faculty data:", err);
    }
  };

  const changePage = (event, page) => {
    setCurrentPage(page);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };
  useEffect(() => {
    fetchClubData();
    fetchFacultyData();
  }, [refresh, search, currentPage]);

  const handleFacultyChange = (e) => {
    const selectedFacultyId = e.target.value;
    const facultyData = faculty.find((f) => f._id === selectedFacultyId);
    setSelectedFaculty(facultyData);
  };

  const handleDeleteClub = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this club. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#212A3E",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await deleteClub(id);
        const updatedClubList = clubList.filter((club) => club._id !== id);
        setClubList(updatedClubList);
        toast.success("The club has been deleted.", {
          autoClose: 2000,
        });
        setRefresh(true);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting the club.", {
        autoClose: 2000,
      });
     
    }
  };

  return (
    <div className="club-container">
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Club List</h1>

        <Button
          className="club-add-btn"
          title="Add Club"
          style={{ background: "#394867" }}
          onClick={toggleModal}
        >
          Add Club
        </Button>
      </div>
      {/* ===================search bar========================= */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search club name..."
          className="form-control"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      {/* ========================================================= */}
      <Row>
        {clubList.length > 0 ? (
          clubList.map((club) => (
            <Col md={12} className="mb-4" key={club._id}>
              <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
                <Card.Body>
                  <Card.Title>{club.name}</Card.Title>
                  <Card.Text>Club Description : {club.description}</Card.Text>
                  <Card.Text>Club Co-ordinator : {club.facultyName}</Card.Text>
                  <div className="p-3 d-flex justify-content-end">
                    <IconButton
                      type="button"
                      style={{ color: "red" }}
                      variant="success"
                      onClick={() => handleDeleteClub(club._id)}
                    >
                      <MdDelete />
                    </IconButton>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <img src={nodata}></img>
          </div>
        )}
      </Row>
      {clubList?.length > 0 ? (
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

      {/* ======================== add club ======================== */}

      <Modal show={showModal} onHide={toggleModal} className="club-add-modal">
        <Modal.Header closeButton style={{ marginTop: "50px" }}>
          <Modal.Title>Add Club</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Club Name</Form.Label>
              <Form.Control
                value={formValue.name}
                name="name"
                onChange={handleChange}
                required
              />
              {fieldErrors.name && (
                <div className="error" style={{ color: "red" }}>
                  {fieldErrors.name}
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Club Description</Form.Label>
              <Form.Control
                value={formValue.description}
                name="description"
                onChange={handleChange}
                required
              />
              {fieldErrors.description && (
                <div className="error" style={{ color: "red" }}>
                  {fieldErrors.description}
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Faculty</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="facultyName"
                onChange={handleFacultyChange}
                value={selectedFaculty ? selectedFaculty._id : ""}
              >
                <option hidden>Select Club Co-ordinator</option>
                {faculty?.length > 0 ? (
                  faculty.map((value) => (
                    <option
                      className="select-fac"
                      key={value._id}
                      value={value._id}
                    >
                      {value.name}
                    </option>
                  ))
                ) : (
                  <option value="">No faculty available</option>
                )}
              </Form.Select>
              {fieldErrors.facultyName && (
                <div className="error" style={{ color: "red" }}>
                  {fieldErrors.facultyName}
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button style={{ background: "#394867" }} onClick={handleAddClub}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ClubList;
