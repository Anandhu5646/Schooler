import React, { useState } from 'react';
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

function FacultyList() {
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

    const handleAddFaculty = () => {
        // Handle adding faculty logic here
        console.log(formValue);
        toggleModal();
    };

    return (
        <div className='' style={{ width: '80%', marginLeft: '200px', marginTop: '50px' }}>
            <div className='d-flex justify-content-between align-items-end mb-5'>
                <h1>Faculty List</h1>
                <MDBBtn style={{ background: '#394867' }} onClick={toggleModal}>
                    Add faculty
                </MDBBtn>
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
                    <tr>
                        <td>1</td>
                        <td>
                            {' '}
                            <img src={avatar} alt='' style={{ width: '45px', height: '45px' }} className='rounded-circle' />
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>John Doe</p>
                                   
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>2000</p>
                    
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>Maths</p>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>45561212232</p>
                        </td>
                       <td>22/3/2333</td>
                        <td>20</td>
                        <td>
                            <MDBBtn color='link' rounded size='sm'>
                                Edit
                            </MDBBtn>
                            <MDBBtn color='link' rounded size='sm'>
                                X
                            </MDBBtn>
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>

            {/* Add Faculty Modal */}
            <MDBModal show={showModal} onHide={toggleModal} tabIndex='-1'  >
                <MDBModalDialog >
                    <MDBModalContent>
                        <MDBModalHeader style={{marginTop:"50px"}}>
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
                            <MDBBtn onClick={handleAddFaculty} style={{background:"#394867"}}>Save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </div>
    );
}

export default FacultyList;
