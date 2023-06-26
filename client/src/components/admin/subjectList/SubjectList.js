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

function SubjectList() {
  const [subjectList, setSubjectList] = useState([]);

  const fetchSubjectList = async () => {
    try {
      const response = await axios.get('/admin/viewSubjects', {
        headers: { "Content-Type": "application/json" }, withCredentials: true
      });

      console.log(response.data);
      if (response.data.success) {
        console.log('Faculty list:', response.data.subjects);
        setSubjectList(response.data.subjects);
      } else {
        console.error('Error fetching faculty list:', response.data.error);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };


  useEffect(() => {
    fetchSubjectList();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState({
    subjectName: "",
    subjectCode: "",
    subjectCredit: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddSubject = async () => {
    try {
      const response = await axios.post('/admin/addSubject', formValue);
      if (response.data.success) {
        console.log('Faculty data saved:', response.data.subject);
      } else {
        console.error('Error saving faculty data:', response.data.error);
      }
    } catch (err) {
      console.error('Error:', err);
    }

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
            <th scope="col">Subject Class</th>
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
      <p className="fw-normal mb-1">{subject.subClass}</p>
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
))}

        </MDBTableBody>
      </MDBTable>

      <MDBModal show={showModal} onHide={toggleModal} tabIndex="-1">
        <MDBModalDialog>
          <form >
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
                <div className="mb-3">
                  <MDBInput
                    value={formValue.subClass}
                    name="subClass"
                    onChange={onChange}
                    type="number"
                    label="Subject Class"
                    required
                  />
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleModal}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={handleAddSubject} style={{ background: "#394867" }}>Save</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </form>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default SubjectList;
