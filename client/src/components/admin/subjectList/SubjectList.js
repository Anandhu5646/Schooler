import React, { useState } from "react";
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

function SubjectList() {
  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState({
    subjectName: "",
    subjectCode: "",
    subjectCredit: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddSubject = () => {
    // Handle adding subject logic here
    console.log("Subject added:", formValue);
    toggleModal();
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
        <MDBBtn style={{ background: "#394867" }} onClick={toggleModal}>
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
            <th scope="col" className="d-flex ms-4">
              Action
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>1</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="ms-3">
                  <p className="fw-bold mb-1">Subject 1</p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">ABC123</p>
            </td>
            <td>
              <p className="fw-normal mb-1">3</p>
            </td>
            <td>
              <MDBBtn color="link" rounded size="sm">
                Edit
              </MDBBtn>
              <MDBBtn color="link" rounded size="sm">
                X
              </MDBBtn>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>

      <MDBModal show={showModal} onHide={toggleModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent className="p-3">
            <MDBModalHeader style={{ marginTop: "50px" }}>
              <MDBModalTitle>Add Subject</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="mb-3">
                <MDBInput
                  value={formValue.subjectName}
                  name="subjectName"
                  onChange={onChange}
                  label="Subject Name"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.subjectCode}
                  name="subjectCode"
                  onChange={onChange}
                  label="Subject Code"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.subjectCredit}
                  name="subjectCredit"
                  onChange={onChange}
                  type="number"
                  label="Subject Credit"
                  required
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleModal}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleAddSubject} style={{background:"#394867"}}>Save</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default SubjectList;
