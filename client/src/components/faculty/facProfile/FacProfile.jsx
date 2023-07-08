import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { fetchFaculty } from '../../../api/facultyApi';
import { Link } from 'react-router-dom';
import { MdEditSquare } from 'react-icons/md';
import { Button } from '@mui/material';

function FacProfile() {
  const [faculty, setFaculty] = useState(null);
  const fetchfacultyData = async () => {
    try {
      const facultyData = await fetchFaculty(); 
      setFaculty(facultyData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchfacultyData();
  }, []);

  return (
    <section className="">
  {faculty && (
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="6" className="mb-4 mb-lg-0">
          <MDBCard className="mb-3" style={{ borderRadius: '.5rem', color: "black" }}>
            <MDBRow className="g-0">
              <MDBCol md="4" className="gradient-custom text-center text-black" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                <MDBTypography tag="h5">{faculty.name}</MDBTypography>
                
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
                      <MDBCardText className="text-muted">{faculty.email}</MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Phone</MDBTypography>
                      <MDBCardText className="text-muted">{faculty.mobile}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Teaching Area</MDBTypography>
                      <MDBCardText className="text-muted">{faculty.teachingArea}</MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Qualification</MDBTypography>
                      <MDBCardText className="text-muted">{faculty.qualification}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Date of Birth</MDBTypography>
                      <MDBCardText className="text-muted">{faculty.dob}</MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Age</MDBTypography>
                      <MDBCardText className="text-muted">{faculty.age}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Class</MDBTypography>
                      <MDBCardText className="text-muted">{faculty.className}</MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Joining Year</MDBTypography>
                      <MDBCardText className="text-muted">{faculty.joiningYear}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Address</MDBTypography>
                      <MDBCardText className="text-muted">{faculty.address}</MDBCardText>
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

export default FacProfile;
