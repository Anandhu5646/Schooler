import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import avatar from '../../../assets/avatar.jpg';

function StudentList() {
    return (
        
        <div className='' style={{width:"80%", marginLeft:"150px",marginTop:"150px"}}>
        <div className='d-flex justify-content-between align-items-end mb-5'><h1>Student List</h1>
        <MDBBtn style={{background:"#265C5C"}}>Add student</MDBBtn>
        </div>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>No.</th>
                        <th scope='col'>Image</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Class</th>
                        <th scope='col'>Roll No.</th>
                        <th scope='col'>Mobile</th>
                        <th scope='col'>Adm Year</th>
                        <th scope='col'>Age</th>
                        <th scope='col' className='d-flex ms-4'>Action </th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>1</td>
                        <td> <img
                            src={avatar}
                            alt=''
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                        />
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>

                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>John Doe</p>
                                    {/* <p className='text-muted mb-0'>john.doe@gmail.com</p> */}
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>10</p>
                            {/* <p className='text-muted mb-0'>IT department</p> */}
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>123</p>
                           
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>45561212232</p>
                           
                        </td>
                        {/* <td>
                            <MDBBadge color='success' pill>
                                Active
                            </MDBBadge>
                        </td> */}
                        <td>2000</td>
                        <td>20</td>
                        <td>
                            <MDBBtn color='link'  rounded size='sm'>
                                Edit
                            </MDBBtn>
                            <MDBBtn color='link' rounded size='sm'>
                                X
                            </MDBBtn>
                        </td>
                    </tr>

                </MDBTableBody>
            </MDBTable>
        </div>
    );
}
export default StudentList