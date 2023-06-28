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
import {
  fetchStudentList,
  addStudent,
  updateStudent,
  // deleteStudent,
} from "../../../api/adminApi";

function StudentList() {
  const [studentList, setStudentList] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
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

  const fetchStudentData = async () => {
    try {
      const students = await fetchStudentList();
      setStudentList(students);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const toggleModal = (student = null) => {
    if (student) {
      setEditStudent(student);
      setFormValue(student);
    } else {
      setEditStudent(null);
      setFormValue({
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
    }
    setShowModal(!showModal);
  };

  const handleAddStudent = async () => {
    try {
      if (editStudent) {
        const response = await updateStudent(editStudent._id, formValue);
        console.log("Student data updated:", response);
      } else {
        const response = await addStudent(formValue);
        console.log("Student data saved:", response);
      }
    } catch (error) {
      console.error("Error saving student data:", error);
    }

    toggleModal();
  };

  // const handleDeleteStudent = async (studentId) => {
  //   try {
  //     await deleteStudent(studentId);
  //     console.log("Student deleted successfully");
  //     fetchStudentData();
  //   } catch (error) {
  //     console.error("Error deleting student:", error);
  //   }
  // };

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
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {studentList.map((student, index) => (
            <tr key={student._id}>
              <th scope="row">{index + 1}</th>
              <td>
                <img
                  src={student.image || avatar}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "50px" }}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.rollNo}</td>
              <td>
                <MDBBtn
                  color="link"
                  rounded
                  size="sm"
                  onClick={() => toggleModal(student)}
                >
                  Edit
                </MDBBtn>
                <MDBBtn
                  color="link"
                  rounded
                  size="sm"
                  // onClick={() => handleDeleteStudent(student._id)}
                >
                  X
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <MDBModal show={showModal} tabIndex="-1">
        <MDBModalDialog className="modal-dialog-centered">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                {editStudent ? "Edit Student" : "Add Student"}
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleModal}
              />
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <MDBInput
                  value={formValue.name || ""}
                  name="name"
                  onChange={onChange}
                  label="Name"
                  required
                />
                <MDBInput
                  value={formValue.motherName || ""}
                  name="motherName"
                  onChange={onChange}
                  label="Mother's Name"
                  required
                />
                <MDBInput
                  value={formValue.fatherName || ""}
                  name="fatherName"
                  onChange={onChange}
                  label="Father's Name"
                  required
                />
                <MDBInput
                  value={formValue.dob || ""}
                  name="dob"
                  onChange={onChange}
                  label="Date of Birth"
                  type="date"
                  required
                />
                <MDBInput
                  value={formValue.age || ""}
                  name="age"
                  onChange={onChange}
                  label="Age"
                  type="number"
                  required
                />
                <MDBInput
                  value={formValue.class || ""}
                  name="class"
                  onChange={onChange}
                  label="Class"
                  required
                />
                <MDBInput
                  value={formValue.gender || ""}
                  name="gender"
                  onChange={onChange}
                  label="Gender"
                  required
                />
                <MDBInput
                  value={formValue.email || ""}
                  name="email"
                  onChange={onChange}
                  label="Email"
                  type="email"
                  required
                />
                <MDBInput
                  value={formValue.password || ""}
                  name="password"
                  onChange={onChange}
                  label="Password"
                  type="password"
                  required
                />
                <MDBInput
                  value={formValue.admissionYear || ""}
                  name="admissionYear"
                  onChange={onChange}
                  label="Admission Year"
                  required
                />
                <MDBInput
                  value={formValue.address || ""}
                  name="address"
                  onChange={onChange}
                  label="Address"
                  required
                />
                <MDBInput
                  value={formValue.mobile || ""}
                  name="mobile"
                  onChange={onChange}
                  label="Mobile"
                  required
                />
                <MDBInput
                  value={formValue.rollNo || ""}
                  name="rollNo"
                  onChange={onChange}
                  label="Roll No."
                  required
                />
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn onClick={toggleModal}>Close</MDBBtn>
              <MDBBtn onClick={handleAddStudent}>
                {editStudent ? "update" : "Save"}
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default StudentList;
