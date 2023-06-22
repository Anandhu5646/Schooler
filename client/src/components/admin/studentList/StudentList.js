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

function StudentList() {
  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    motherName: "",
    fatherName: "",
    dob: "",
    age: "",
    class: "",
    gender: "",
    email: "",
    password: "",
    admissionYear: "",
    address: "",
    mobile: "",
    rollNo: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddStudent = () => {
    // Handle adding student logic here
    console.log("Student added:", formValue);
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
        <h1>Student List</h1>
        <MDBBtn style={{ background: "#394867" }} onClick={toggleModal}>
          Add student
        </MDBBtn>
      </div>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Class</th>
            <th scope="col">Roll No.</th>
            <th scope="col">Mobile</th>
            <th scope="col">Adm Year</th>
            <th scope="col">Age</th>
            <th scope="col" className="d-flex ms-4">
              Action
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>1</td>
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
                  <p className="fw-bold mb-1">John Doe</p>
                  {/* <p className='text-muted mb-0'>john.doe@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">10</p>
            </td>
            <td>
              <p className="fw-normal mb-1">123</p>
            </td>
            <td>
              <p className="fw-normal mb-1">45561212232</p>
            </td>
            <td>2000</td>
            <td>20</td>
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
            <MDBModalHeader style={{marginTop:"50px"}}>
              <MDBModalTitle>Add Student</MDBModalTitle>
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
                  onChange={onChange}
                  label="Name"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.motherName}
                  name="motherName"
                  onChange={onChange}
                  label="Mother's Name"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.fatherName}
                  name="fatherName"
                  onChange={onChange}
                  label="Father's Name"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.dob}
                  name="dob"
                  onChange={onChange}
                  type="date"
                  label="Date of Birth"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.age}
                  name="age"
                  onChange={onChange}
                  type="number"
                  label="Age"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.class}
                  name="class"
                  onChange={onChange}
                  label="Class"
                  required
                />
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="maleRadio"
                    name="gender"
                    value="male"
                    checked={formValue.gender === "male"}
                    onChange={onChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="maleRadio">
                    Male
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="femaleRadio"
                    name="gender"
                    value="female"
                    checked={formValue.gender === "female"}
                    onChange={onChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="femaleRadio">
                    Female
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="otherRadio"
                    name="gender"
                    value="other"
                    checked={formValue.gender === "other"}
                    onChange={onChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="otherRadio">
                    Other
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <MDBInput
                  value={formValue.email}
                  name="email"
                  onChange={onChange}
                  type="email"
                  label="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.password}
                  name="password"
                  onChange={onChange}
                  type="password"
                  label="Password"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.admissionYear}
                  name="admissionYear"
                  onChange={onChange}
                  label="Admission Year"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.address}
                  name="address"
                  onChange={onChange}
                  label="Address"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.mobile}
                  name="mobile"
                  onChange={onChange}
                  label="Mobile"
                  required
                />
              </div>
              <div className="mb-3">
                <MDBInput
                  value={formValue.rollNo}
                  name="rollNo"
                  onChange={onChange}
                  label="Roll No."
                  required
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleModal}>
                Close
              </MDBBtn>
              <MDBBtn onSubmit={handleAddStudent}>Save</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default StudentList;
