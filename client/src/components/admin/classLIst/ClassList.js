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
import axios from "axios";

const ClassList = () => {
  const [classList, setClassList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState({
    className: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const fetchClassList = async () => {
    try {
      const response = await axios.get("/admin/viewClasses", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log(response.data);
      if (response.data.success) {
        console.log("list:", response.data.classes);
        setClassList(response.data.classes);
      } else {
        console.error(
          "Error fetching faculty list:",
          response.data.error
        );
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleAddClass = async () => {
    try {
      const response = await axios.post("/admin/addClass", formValue);
      if (response.data.success) {
        console.log("Class data saved:", response.data.class);
        // Fetch the updated class list after adding a new class
        fetchClassList();
      } else {
        console.error(
          "Error saving class data:",
          response.data.error
        );
      }
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

  useEffect(() => {
    fetchClassList();
  }, []);

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Class List</h1>
        <MDBBtn
          style={{ background: "#394867" }}
          onClick={toggleModal}
        >
          Add Class
        </MDBBtn>
      </div>
      <div className="table-responsive">
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Class Name</th>
              <th scope="col" >
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
          <form>
            <MDBModalContent className="p-3">
              <MDBModalHeader style={{ marginTop: "50px" }}>
                <MDBModalTitle>Add Class</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleModal}
                ></MDBBtn>
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
                <MDBBtn
                  onClick={handleAddClass}
                  style={{ background: "#394867" }}
                >
                  Save
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </form>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default ClassList;
