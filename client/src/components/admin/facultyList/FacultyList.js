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
import { fetchFacultyList,addFaculty,deleteFac } from '../../../api/adminApi';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { ToastContainer, toast,ToastProvider } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FacultyList() {
  const {refresh}= useSelector((state)=> state)
  const [facultyList, setFacultyList] = useState([]);
console.log(facultyList);


  const fetchFacultyData = async () => {
  try {
    const faculties = await fetchFacultyList()
    setFacultyList(faculties)
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

  const handleAddFaculty = async () => {
  try {
    const response = await addFaculty(formValue);
    console.log("data saved successfully", response);
    toast.success('Faculty added successfully!', {
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
    toast.error('Error adding faculty!', {
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

  const deleteFaculty = async (id) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this faculty. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#212A3E',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      await deleteFac(id);
      const updatedFacultyList = facultyList.filter((faculty) => faculty._id !== id);
      setFacultyList(updatedFacultyList);
      Swal.fire('Deleted!', 'The faculty has been deleted.', 'success');
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire('Error', 'An error occurred while deleting the faculty.', 'error');
  }
};

useEffect(() => {
    fetchFacultyData();
  }, [refresh]);
 

  return (
    <div className='' style={{ width: '80%', marginLeft: '200px', marginTop: '50px' }}>
      <div className='d-flex justify-content-between align-items-end mb-5'>
        <h1>Faculty List</h1>
        <Link to=''>
          <MDBBtn style={{ background: '#394867' }} onClick={toggleModal}>
            Add faculty
          </MDBBtn>
        </Link>
      </div>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>No.</th>
            <th scope='col'>Image</th>
            <th scope='col'>Name</th>
            <th scope='col'>Join Year</th>
            <th scope='col'>Teaching Area</th>
            <th scope='col'>Mobile</th>
            <th scope='col'>DOB</th>
            <th scope='col'>Age</th>
            <th scope='col' className='d-flex ms-4'>
              Action
            </th>
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {facultyList.map((faculty, index) => (

            <tr key={faculty._id}>
              <td>{index + 1}</td>
              <td>
                <img src={avatar} alt='' style={{ width: '45px', height: '45px' }} className='rounded-circle' />
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{faculty.name}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>{faculty.joiningYear}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{faculty.teachingArea}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{faculty.mobile}</p>
              </td>
              <td>{faculty.dob}</td>
              <td>{faculty.age}</td>
              <td>
                <Link to={`/editFacultyList/${faculty._id}`}>
                  <MDBBtn color='link' rounded size='sm'>
                    Edit
                  </MDBBtn>
                </Link>
                
                  <MDBBtn type='button' color='link' onClick={()=> deleteFaculty(faculty._id)} rounded size='sm'>
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
                <MDBModalTitle>Add Faculty</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleModal} />
              </MDBModalHeader>
              <MDBModalBody>
                <div className='mb-3'>
                  <MDBInput value={formValue.name} name='name' onChange={onChange} label='Name' required />
                </div>
                <div className='mb-3'>
                  <MDBInput value={formValue.age} name='age' onChange={onChange} type='number' label='Age' required />
                </div>
                <div className='mb-3'>
                  <MDBInput
                    value={formValue.qualification}
                    name='qualification'
                    onChange={onChange}
                    label='Qualification'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <MDBInput value={formValue.dob} name='dob' onChange={onChange} type='date' label='Date of Birth' required />
                </div>
                <div className='mb-3'>
                  <MDBInput
                    value={formValue.teachingArea}
                    name='teachingArea'
                    onChange={onChange}
                    label='Teaching Area'
                    required
                  />
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
                    value={formValue.joiningYear}
                    name='joiningYear'
                    onChange={onChange}
                    label='Joining Year'
                    required
                  />
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
                  <MDBInput value={formValue.address} name='address' onChange={onChange} label='Address' required />
                </div>
                <div className='mb-3'>
                  <MDBInput value={formValue.className} name='className' onChange={onChange} label='Class' required />
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleModal}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={handleAddFaculty} style={{ background: '#394867' }}>
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

export default FacultyList;
