import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import StudentProfileUpdateApi, { fetchStudent } from '../../../api/studentApi';
import { Link } from 'react-router-dom';
import { MdEditSquare } from 'react-icons/md';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Toaster from '../../toaster/Toaster';
import axios from 'axios';


function StudProfile() {
  const [student, setStudent] = useState(null);

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


  const [refresh, setRefresh] = useState(false)
  //edit student modal

  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [dob, setDob] = useState('')
  const [admYear, setAdmyear] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [motherName, setMotherName] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [rollNo, setRollNo] = useState('')
  const [className, setClassName] = useState('')
  const [pic, setPic] = useState('')

  const HandleClickOpen = async () => {

    setOpen(true);
    setName(student.name)
    setEmail(student.email)
    setMobile(student.mobile)
    setDob(student.dob)
    setAdmyear(student.admYear)
    setFatherName(student.fatherName)
    setMotherName(student.motherName)
    setAge(student.age)
    setAddress(student.address)
    setRollNo(student.rollNo)
    setGender(student.gender)
    getClasses()
  }

  const handleClose = () => {
    setOpen(false)
  }
  const [classes, setClasses] = useState([])
  const getClasses = async () => {
    try {
      const data = await axios.get('/admin/viewClasses');
      console.log(data.data.classes, 'dddddddddd');
      setClasses(data.data.classes)

    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

 
  const [errmsg, setErrmsg] = useState('')
  const HandlSave = async () => {
    try {
      const response = await axios.post('/student/', {
        id: student.id,
        name,
        email,
        mobile,
        dob,
        admYear,
        fatherName,
        motherName,
        address,
        rollNo,
        gender,
        age,
        className,
        pic
      });

      if (response.data.success) {
        setRefresh(!refresh);
        setOpen(false);
      } else {
        console.error('Failed to update student profile:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating student profile:', error);
    }
  };
  return (
    <div>
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

                      {/* <Button variant="text">Edit Image</Button> */}
                      <MDBIcon far icon="edit mb-5" />
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <div className='d-flex justify-content-between'>
                          <MDBTypography tag="h6">Information</MDBTypography>
                          <Button onClick={HandleClickOpen}><MDBIcon far icon="edit mb-5" /><MdEditSquare /></Button>
                          {/* <Link><MDBTypography tag="h6"><MdEditSquare/></MDBTypography></Link> */}

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
                        <Button variant="text" style={{ marginLeft: "200px" }}>Change Password?</Button>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}

      </section>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Student Details</DialogTitle>
        <DialogContent>
          <p style={{ color: 'red', }}>{errmsg}</p>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            variant="standard"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="dense"
            id="mobile"
            label="Mobile Number"
            type="tel"
            fullWidth
            variant="standard"
            name="mobile"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
          <TextField
            margin="dense"
            id="dob"
            label="Date of Birth"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            name="dob"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
          />
          <TextField
            margin="dense"
            id="admYear"
            label="Admission Year"
            type="number"
            fullWidth
            variant="standard"
            name="admYear"
            value={admYear}
            onChange={(event) => setAdmyear(event.target.value)}
          />

          <FormControl margin="dense" fullWidth>
            <InputLabel id="classname-label">Select Class</InputLabel>
            {(classes.length > 0 &&
              <Select
                labelId="classname-label"
                id="className"
                variant="standard"
                fullWidth
                name="className"
                value={className}
                onChange={(event) => setClassName(event.target.value)}
              >
               {classes.map((data) => (
  <MenuItem key={data._id} value={data.className}>{data.className}</MenuItem>
))}

              </Select>
              )}
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <InputLabel id="gender-label">Select Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              variant="standard"
              fullWidth

              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <MenuItem hidden value={gender}>{gender}</MenuItem>
              <MenuItem value="m">Male</MenuItem>
              <MenuItem value="f">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="fatherName"
            label="Father's Name"
            type="text"
            fullWidth
            variant="standard"
            name="fatherName"
            value={fatherName}
            onChange={(event) => setFatherName(event.target.value)}
          />
          <TextField
            margin="dense"
            id="motherName"
            label="Mother's Name"
            type="tel"
            fullWidth
            variant="standard"
            name="motherName"
            value={motherName}
            onChange={(event) => setMotherName(event.target.value)

            }
          />
          <TextField
            margin="dense"
            id="address"
            label="Full Address"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            name="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)
            }
          />
          <TextField
            margin="dense"
            id="address"
            label="Change Profile Photo"
            type="file"
            fullWidth
            variant="standard"


            onChange={(event) => setPic(event.target.files[0])
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="button" onClick={HandlSave}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StudProfile;
