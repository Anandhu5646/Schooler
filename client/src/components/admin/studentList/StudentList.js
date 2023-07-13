import React, { useEffect, useState } from 'react';
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from 'mdb-react-ui-kit';

import avatar from '../../../assets/avatar.jpg';
import { Link } from 'react-router-dom';
import { fetchStudentList,addStudent,deleteStudent } from '../../../api/adminApi';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function StudentList() {
  const {refresh}= useSelector((state)=> state)
  const [studentList, setStudentList] = useState([]);



  const fetchStudentData = async () => {
  try {
    const students = await fetchStudentList()
    setStudentList(students)
  } catch (err) {
    console.error('Error:', err);
  }
};


  
  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    age: '',
    qualification: '',
    dob: '',
    teachingArea: '',
    email: '',
    password: '',
    mobile: '',
    joiningYear: '',
    gender: '',
    address: '',
    className: '',
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleAddStudent = async () => {
  try {
    const response = await addStudent(formValue);
    console.log("data saved successfully", response);
    toast.success('student added successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err) {
    console.error('Error:', err);
    toast.error('Error adding student!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  toggleModal();
};

  const deleteStud = async (id) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this student. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#212A3E',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      await deleteStudent(id);
      const updatedStudentList = studentList.filter((student) => student._id !== id);
      setStudentList(updatedStudentList);
      Swal.fire('Deleted!', 'The student has been deleted.', 'success');
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire('Error', 'An error occurred while deleting the student.', 'error');
  }
};

useEffect(() => {
    fetchStudentData();
  }, [refresh]);
 

  return (
    <div className='' style={{ width: '80%', marginLeft: '200px', marginTop: '50px' }}>
      <div className='d-flex justify-content-between align-items-end mb-5'>
        <h1>Student List</h1>
        <Link to=''>
          <MDBBtn style={{ background: '#394867' }} onClick={toggleModal}>
            Add student
          </MDBBtn>
        </Link>
      </div>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>No.</th>
            <th scope='col'>Image</th>
            <th scope='col'>Name</th>
            <th scope='col'>Class</th>
            <th scope='col'>Adm Year</th>
            <th scope='col'>Mobile</th>
            <th scope='col'>DOB</th>
            <th scope='col'>Age</th>
            <th scope='col' className='d-flex ms-4'>
              Action
            </th>
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {studentList.map((student, index) => (

            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>
                <img src={avatar} alt='' style={{ width: '45px', height: '45px' }} className='rounded-circle' />
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{student.name}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>{student.className}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{student.admYear}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{student.mobile}</p>
              </td>
              <td>{student.dob}</td>
              <td>{student.age}</td>
              <td>
                <Link to={`/editstudentList/${student._id}`}>
                  <MDBBtn color='link' rounded size='sm'>
                    Edit
                  </MDBBtn>
                </Link>
                
                  <MDBBtn type='button' color='link' onClick={()=> deleteStud(student._id)} rounded size='sm'>
                    X
                  </MDBBtn>
               
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      
      <MDBModal show={showModal} onHide={toggleModal} tabIndex='-1'>
  <MDBModalDialog>
    <form>
      <MDBModalContent>
        <MDBModalHeader style={{ marginTop: '50px' }}>
          <MDBModalTitle>Add Student</MDBModalTitle>
          <MDBBtn className='btn-close' color='none' onClick={toggleModal} />
        </MDBModalHeader>
        <MDBModalBody>
          <div className='mb-3'>
            <MDBInput value={formValue.name} name='name' onChange={onChange} label="Student's Name" required />
          </div>
          <div className='mb-3'>
            <MDBInput value={formValue.fatherName} name='fatherName' onChange={onChange} label="Father's Name" required />
          </div>
          <div className='mb-3'>
            <MDBInput value={formValue.motherName} name='motherName' onChange={onChange} label="Mother's Name" required />
          </div>
          <div className='mb-3'>
            <MDBInput value={formValue.dob} name='dob' onChange={onChange} type='date' label='Date of Birth' required />
          </div>
          <div className='mb-3'>
            <MDBInput value={formValue.age} name='age' onChange={onChange} type='number' label='Age' required />
          </div>
          <div className='mb-3'>
            <MDBInput value={formValue.className} name='className' onChange={onChange} label='Class' required />
          </div>
          <div className='mb-3'>
            <div className='form-check'>
              <input
                type='radio'
                className='form-check-input'
                id='maleRadio'
                name='gender'
                value='male'
                checked={formValue.gender === 'male'}
                onChange={onChange}
                required
              />
              <label className='form-check-label' htmlFor='maleRadio'>
                Male
              </label>
            </div>

            <div className='form-check'>
              <input
                type='radio'
                className='form-check-input'
                id='femaleRadio'
                name='gender'
                value='female'
                checked={formValue.gender === 'female'}
                onChange={onChange}
                required
              />
              <label className='form-check-label' htmlFor='femaleRadio'>
                Female
              </label>
            </div>

            <div className='form-check'>
              <input
                type='radio'
                className='form-check-input'
                id='otherRadio'
                name='gender'
                value='other'
                checked={formValue.gender === 'other'}
                onChange={onChange}
                required
              />
              <label className='form-check-label' htmlFor='otherRadio'>
                Other
              </label>
            </div>
          </div>
          <div className='mb-3'>
            <MDBInput value={formValue.email} name='email' onChange={onChange} type='email' label='Email' required />
          </div>
          <div className='mb-3'>
            <MDBInput
              value={formValue.password}
              name='password'
              onChange={onChange}
              type='password'
              label='Password'
              required
            />
          </div>
          <div className='mb-3'>
            <MDBInput value={formValue.mobile} name='mobile' onChange={onChange} label='Mobile' required />
          </div>
          <div className='mb-3'>
            <MDBInput
              value={formValue.admYear}
              name='admYear'
              onChange={onChange}
              label='Admission Year'
              required
            />
          </div>
          <div className='mb-3'>
            <MDBInput value={formValue.address} name='address' onChange={onChange} label='Address' required />
          </div>
          <div className='mb-3'>
            <MDBInput value={formValue.rollNo} name='rollNo' onChange={onChange} label='Roll No.' required />
          </div>
        </MDBModalBody>

        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={toggleModal}>
            Close
          </MDBBtn>
          <MDBBtn onClick={handleAddStudent} style={{ background: '#394867' }}>
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
}

export default StudentList;