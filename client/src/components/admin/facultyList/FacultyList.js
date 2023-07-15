import React, { useEffect, useState } from "react";
import { Badge, Button, Table, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchFacultyList, addFaculty, deleteFac } from "../../../api/adminApi";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import avatar from "../../../assets/avatar.jpg";

function FacultyList() {
  const [refresh, setRefresh] = useState(false);
  const [facultyList, setFacultyList] = useState([]);
//   const [showEditModal, setShowEditModal] = useState(false);
// const [editFaculty, setEditFaculty] = useState(null);

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number().required("Age is required").positive("Age must be a positive number"),
  qualification: Yup.string().required("Qualification is required"),
  dob: Yup.date().required("Date of Birth is required"),
  teachingArea: Yup.string().required("Teaching Area is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  mobile: Yup.string().required("Mobile is required").max(10).min(10),
  joiningYear: Yup.number().required("Joining Year is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  className: Yup.string().required("Class is required"),
});
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(validationSchema),
});
const onSubmit = (data) => {
  console.log(data);
};
  const fetchFacultyData = async () => {
    try {
      const faculties = await fetchFacultyList();
      setFacultyList(faculties);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    age: "",
    qualification: "",
    dob: "",
    teachingArea: "",
    email: "",
    password: "",
    mobile: "",
    joiningYear: "",
    gender: "",
    address: "",
    className: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleAddFaculty = async () => {
    try {
      await validationSchema.validate(formValue, { abortEarly: false });
      const response = await addFaculty(formValue);
      console.log("data saved successfully", response);
      toast.success("Faculty added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setRefresh(true);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Error adding faculty!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const validationErrors = {};
      err.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      console.log(validationErrors);
    }

    toggleModal();
  };

  const deleteFaculty = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this faculty. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#212A3E",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await deleteFac(id);
        const updatedFacultyList = facultyList.filter(
          (faculty) => faculty._id !== id
        );
        setFacultyList(updatedFacultyList);
        Swal.fire("Deleted!", "The faculty has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the faculty.",
        "error"
      );
    }
  };
  const columns = [
    {
      dataField: 'index',
      text: 'No.',
      formatter: (cell, row, rowIndex) => rowIndex + 1,
      classes: 'text-center',
      headerClasses: 'text-center font-weight-bold',
    },
    {
      dataField: 'image',
      text: 'Image',
      formatter: (cell, row) => (
        <img src={avatar} alt='' style={{ width: '45px', height: '45px' }} className='rounded-circle' />
      ),
      classes: 'text-center',
      headerClasses: 'text-center font-weight-bold',
    },
    {
      dataField: 'name',
      text: 'Name',
      formatter: (cell, row) => (
        <div className='d-flex align-items-center'>
          <div className='ms-3'>
            <p className='fw-bold mb-1'>{row.name}</p>
          </div>
        </div>
      ),
      classes: 'text-center',
      headerClasses: 'text-center font-weight-bold',
    },
    {
      dataField: 'joiningYear',
      text: 'Join Year',
      classes: 'text-center',
      headerClasses: 'text-center font-weight-bold',
    },
    {
      dataField: 'teachingArea',
      text: 'Teaching Area',
      classes: 'text-center',
      headerClasses: 'text-center font-weight-bold',
    },
    {
      dataField: 'mobile',
      text: 'Mobile',
      classes: 'text-center',
      headerClasses: 'text-center font-weight-bold',
    },
    {
      dataField: 'dob',
      text: 'DOB',
      classes: 'text-center',
      headerClasses: 'text-center font-weight-bold',
    },
    {
      dataField: 'age',
      text: 'Age',
      classes: 'text-center',
      headerClasses: 'text-center font-weight-bold',
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: (cell, row) => (
        <div className='text-center'>
          <Link to={`/editFacultyList/${row._id}`}>
            <Button variant='link' rounded size='sm'>
              Edit
            </Button>
          </Link>
          <Button
            type='button'
            variant='link'
            onClick={() => deleteFaculty(row._id)}
            rounded
            size='sm'
          >
            X
          </Button>
        </div>
      ),
      classes: 'text-center',
      headerClasses: 'text-center font-weight-bold',
    },
  ];
// ==================== edt fac =====================
// const handleEditFaculty = (faculty) => {
//   setEditFaculty(faculty);
//   setShowEditModal(true);
// };





  useEffect(() => {
    fetchFacultyData();
  }, [refresh]);

  return (
    <div
      className=""
      style={{ width: "80%", marginLeft: "200px", marginTop: "50px" }}
    >
      <div className="d-flex justify-content-between align-items-end mb-5">
        <h1>Faculty List</h1>
        <Link to="">
          <Button style={{ background: "#394867" }} onClick={toggleModal}>
            Add faculty
          </Button>
        </Link>
      </div>
     
      <BootstrapTable
      keyField='_id'
      data={facultyList}
      columns={columns}
      pagination={paginationFactory()}
    />
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header style={{ marginTop: "50px" }}>
          <Modal.Title>Add Faculty</Modal.Title>
          <Button className="btn-close" variant="none" onClick={toggleModal} />
        </Modal.Header>
        <Form>
          <Modal.Body>
            <div className="mb-3">
              <Form.Control
                value={formValue.name}
                name="name"
                onChange={onChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-3">
              <Form.Control
                value={formValue.age}
                name="age"
                onChange={onChange}
                type="number"
                placeholder="Age"
                required
              />
            </div>
            <div className="mb-3">
              <Form.Control
                value={formValue.qualification}
                name="qualification"
                onChange={onChange}
                placeholder="Qualification"
                required
              />
            </div>
            <div className="mb-3">
              <Form.Control
                value={formValue.dob}
                name="dob"
                onChange={onChange}
                type="date"
                placeholder="Date of Birth"
                required
              />
            </div>
            <div className="mb-3">
              <Form.Control
                value={formValue.teachingArea}
                name="teachingArea"
                onChange={onChange}
                placeholder="Teaching Area"
                required
              />
            </div>
            <div className="mb-3">
              <Form.Control
                value={formValue.email}
                name="email"
                onChange={onChange}
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <Form.Control
                value={formValue.password}
                name="password"
                onChange={onChange}
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-3">
              <Form.Control
                value={formValue.mobile}
                name="mobile"
                onChange={onChange}
                placeholder="Mobile"
                required
              />
            </div>
            <div className="mb-3">
              <Form.Control
                value={formValue.joiningYear}
                name="joiningYear"
                onChange={onChange}
                placeholder="Joining Year"
                required
              />
            </div>
            <div className="mb-3">
              <Form.Control
                value={formValue.gender}
                name="gender"
                onChange={onChange}
                as="select"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </div>

            <div className="mb-3">
              <Form.Control
                value={formValue.address}
                name="address"
                onChange={onChange}
                placeholder="Address"
                required
              />
            </div>
            <div className="mb-3">
              <Form.Control
                value={formValue.className}
                name="className"
                onChange={onChange}
                placeholder="Class"
                required
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button
              onClick={handleAddFaculty}
              style={{ background: "#394867" }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default FacultyList;
