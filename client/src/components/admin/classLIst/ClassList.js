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

const ClassList = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState({
    className: "",
  });
  const [classList, setClassList] = useState([
    {
      id: 1,
      className: "Class 1",
    },
    {
      id: 2,
      className: "Class 2",
    },
    {
      id: 3,
      className: "Class 3",
    },
  ]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddClass = () => {
    const newClass = {
      id: classList.length + 1,
      className: formValue.className,
    };
    setClassList([...classList, newClass]);
    toggleModal();
    setFormValue({ className: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Class List</h1>
        <MDBBtn style={{ background: "#394867" }} onClick={toggleModal}>
          Add Class
        </MDBBtn>
      </div>
      <div className="table-responsive">
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Class Name</th>
              <th scope="col" className="d-flex ms-4">
                Action
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {classList.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.className}</td>
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
      </div>

      <MDBModal show={showModal} onHide={toggleModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent className="p-3">
            <MDBModalHeader style={{ marginTop: "50px" }}>
              <MDBModalTitle>Add Class</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="mb-3">
                <MDBInput
                  value={formValue.className}
                  name="className"
                  onChange={handleChange}
                  label="Class Name"
                  required
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleModal}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleAddClass} style={{ background: "#394867" }}>
                Save
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default ClassList;
