import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Modal,
  Form,
} from "react-bootstrap";
import {
  StudentClubAdminGetApi,
  addClub,
  fetchClubList,
} from "../../../api/adminApi";
import axios from "axios";

const ClubList = () => {
  const [clubList, setClubList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [faculty, setFaculty] = useState([]);
  const [clubAdminId, setClubAdminId] = useState("");

  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    facultyName: "",
  });

  const fetchClubData = async () => {
    try {
      const clubs = await fetchClubList();
      setClubList(clubs);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchClubData();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddClub = async () => {
    try {
      const response = await addClub(formValue);
      console.log("Club created ", response);
    } catch (err) {
      console.error("Error:", err);
    }

    toggleModal();
  };

  useEffect(() => {
    axios
      .get("/admin/faculty", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data.data);
        FacultyName(data.data);
      });
  
    const fetchFacultyName = async () => {
      let data = await StudentClubAdminGetApi(clubAdminId);
      FacultyName(data.name);
    };
    fetchFacultyName();
  }, [clubAdminId]);
  

  const [AdminName, setAdminName] = useState("");
  console.log(AdminName);
  const FacultyName = (data) => {
    setFaculty(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  const handleDeleteClub = (id) => {
    const updatedList = clubList.filter((club) => club.id !== id);
    setClubList(updatedList);
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Club List</h1>
        <Button style={{ background: "#394867" }} onClick={toggleModal}>
          Add Club
        </Button>
      </div>
      <Row>
        {clubList.map((club) => (
          <Col md={12} className="mb-4" key={club._id}>
            <Card className="shadow-sm" style={{ background: "#F1F6F9" }}>
              <Card.Body>
                <Card.Title>{club.name}</Card.Title>
                <Card.Text>Club Description :{club.description}</Card.Text>
                <Card.Text>Club Co-ordinator :{club.facultyName}</Card.Text>
                <div className="p-3 d-flex justify-content-end">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClub(club.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={toggleModal}>
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
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Club Description</Form.Label>
              <Form.Control
                value={formValue.description}
                name="description"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Faculty</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="facultyName"
                onChange={(e) => setClubAdminId(e.target.value)}
              >
                <option hidden> Select Club Co-odinator</option>
                {faculty.map((value, index) => (
                  <option key={index} value={value._id}>
                    {value.name}
                  </option>
                ))}
              </Form.Select>
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
    </div>
  );
};

export default ClubList;
