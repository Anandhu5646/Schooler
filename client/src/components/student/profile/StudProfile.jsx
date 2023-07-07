import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { fetchStudent } from '../../../api/studentApi';
import { Link, useParams } from 'react-router-dom';
import { MdEditSquare } from 'react-icons/md';
import { Button } from '@mui/material';
// import jwt from 'jsonwebtoken';

// // Retrieve the token from storage
// const token = localStorage.getItem('studentToken');

// // Decode the token to access the payload
// const decodedToken = jwt.decode(token);

// // Extract the student's ID from the decoded token
// const studentId = decodedToken.id;


function StudProfile() {
  const [student, setStudent] = useState(null);
  const { id } = useParams();
  const fetchStudentData = async () => {
    try {
      const studentData = await fetchStudent(); 
      setStudent(studentData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <section className="">
  {student && (
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="6" className="mb-4 mb-lg-0">
          <MDBCard className="mb-3" style={{ borderRadius: '.5rem', color: "black" }}>
            <MDBRow className="g-0">
              <MDBCol md="4" className="gradient-custom text-center text-black" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                <MDBTypography tag="h5">{student.name}</MDBTypography>
                
                <Button variant="text">Edit Image</Button>
                <MDBIcon far icon="edit mb-5" />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody className="p-4">
                  <div className='d-flex justify-content-between'>
                  <MDBTypography tag="h6">Information</MDBTypography>
                  <Link><MDBTypography tag="h6"><MdEditSquare/></MDBTypography></Link>
                  </div>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Email</MDBTypography>
                      <MDBCardText className="text-muted">{student.email}</MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Phone</MDBTypography>
                      <MDBCardText className="text-muted">{student.mobile}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Mother Name</MDBTypography>
                      <MDBCardText className="text-muted">{student.motherName}</MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Father Name</MDBTypography>
                      <MDBCardText className="text-muted">{student.fatherName}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Date of Birth</MDBTypography>
                      <MDBCardText className="text-muted">{student.dob}</MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Age</MDBTypography>
                      <MDBCardText className="text-muted">{student.age}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Class</MDBTypography>
                      <MDBCardText className="text-muted">{student.className}</MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Admission Year</MDBTypography>
                      <MDBCardText className="text-muted">{student.admYear}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Address</MDBTypography>
                      <MDBCardText className="text-muted">{student.address}</MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Roll No</MDBTypography>
                      <MDBCardText className="text-muted">{student.rollNo}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <Button variant="text" style={{marginLeft:"200px"}}>Change Password?</Button>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )}
</section>

  );
}

export default StudProfile;
