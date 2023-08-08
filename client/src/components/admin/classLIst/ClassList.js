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
import { addClass, delClass, fetchClassList } from "../../../api/adminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import './ClassList.css'

const ClassList = () => {
  const [ classList, setClassList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh]=useState(false)
  const [formValue, setFormValue] = useState({
    className: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const fetchClassData = async () => {
    try {
      const response = await fetchClassList()
        setClassList(response);
        setRefresh(false)
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleAddClass = async () => {
    try {
      const response = await addClass(formValue)
      setRefresh(true)
      toggleModal();
    } catch (err) {
      console.error("Error:", err);
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this class. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#212A3E",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });
     
      if (result.isConfirmed) {
        await delClass(id); 
        const updatedclassList = classList.filter(
          (classs) => classs._id !== id
        );
        setClassList(updatedclassList);
        toast.success("The class has been deleted.", {
          autoClose: 2000, 
        });
        }   
    } catch (error) {
      console.error("Error:", error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the student.",
        "error"
      );
    }
  };
  useEffect(() => {
    fetchClassData();
  }, [refresh]); 

  return (
    <div className="class-outer-container" style={{ marginTop: "50px" }}>
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Class List</h1>
        <MDBBtn

        className="class-add-btn"
          style={{ background: "#394867" }}
          title="Add Class"
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
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.className}</td>
                <td>
                  <MDBBtn color="link" rounded size="sm"
                  onClick={()=>handleDelete(item._id)}>
                    X
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>

      <MDBModal show={showModal} onHide={toggleModal} tabIndex="-1" className="modal-outer">
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
              <MDBModalBody className="input-field">
                <div className="mb-3">
                  <MDBInput xs={12}
                    value={formValue.className}
                    name="className"
                    onChange={handleChange}
                    label="Class Name"
                    required
                  />
                </div>
              </MDBModalBody>
              <MDBModalFooter>
             
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
      <ToastContainer />
    </div>
  );
};

export default ClassList;
