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
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { addClub, fetchClubList } from "../../../api/adminApi";

const ClubList = () => {
  const [clubList, setClubList] = useState([]);


  const fetchClubData = async () => {
    try {
     const clubs= await fetchClubList()
     setClubList(clubs)
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchClubData();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    facultyName: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddClub = async () => {
    try {
      const response = await addClub(formValue)
      console.log("Club created ",response);
       
     
    } catch (err) {
      console.error("Error:", err);
    }

    toggleModal();
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
        <MDBBtn
          style={{ background: "#394867" }}
          onClick={toggleModal}
        >
          Add Club
        </MDBBtn>
      </div>
      <div className="row">
        {clubList.map((club) => (
          <div className="col-md-12 mb-4" key={club.id}>
            <MDBCard className="shadow-sm" style={{ background: "#F1F6F9" }}>
              <MDBCardBody>
                <MDBCardTitle>{club.name}</MDBCardTitle>
                <MDBCardText>{club.description}</MDBCardText>
                <MDBCardText>{club.facultyName}</MDBCardText>
                <div className="p-3 d-flex justify-content-end">
                  <MDBBtn
                    color="danger"
                    rounded
                    size="sm"
                    onClick={() => handleDeleteClub(club.id)}
                  >
                    Delete
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>

      <MDBModal show={showModal} onHide={toggleModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent className="p-3">
            <MDBModalHeader style={{ marginTop: "50px" }}>
              <MDBModalTitle>Add Club</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="mb-3">
                <MDBInput
                  value={formValue.name}
                  name="name"
                  onChange={handleChange}
                  label="Club Name"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.description}
                  name="description"
                  onChange={handleChange}
                  label="Club Description"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.facultyName}
                  name="facultyName"
                  onChange={handleChange}
                  label="Faculty Name"
                  required
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleModal}>
                Close
              </MDBBtn>
              <MDBBtn
                onClick={handleAddClub}
                style={{ background: "#394867" }}
              >
                Save
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default ClubList;
