import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { fetchFaculty } from '../../../api/facultyApi';
import { Link } from 'react-router-dom';
import { MdEditSquare } from 'react-icons/md';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';

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
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    fetchfacultyData();
  }, [refresh]);
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [dob, setDob] = useState('')
  const [joiningYear, setJoiningYear] = useState('')
  const [teachingArea, setTeachingArea] = useState('')
  const [qualification, setQualification] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [className, setClassName] = useState('')
  const [pic, setPic] = useState('')

  const HandleClickOpen = async () => {

    setOpen(true);
    setName(faculty.name)
    setEmail(faculty.email)
    setMobile(faculty.mobile)
    setDob(faculty.dob)
    setJoiningYear(faculty.joiningYear)
    setTeachingArea(faculty.teachingArea)
    setQualification(faculty.qualification)
    setAge(faculty.age)
    setAddress(faculty.address)
    setGender(faculty.gender)
    getClasses()
  }
  const handleClose = () => {
    setOpen(false)
  }
  const [classes, setClasses] = useState([])
  const getClasses = async () => {
    try {
      const data = await axios.get('/admin/viewClasses');
      setClasses(data.data.classes)

    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };


  const [errmsg, setErrmsg] = useState('')
  const HandleSave = async () => {
    try {
      const response = await axios.post('/faculty/', {
        id: faculty._id,
        name,
        email,
        mobile,
        dob,
        joiningYear,
        teachingArea,
        qualification,
        address,
        gender,
        age,
        className,
        pic
      }, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data.success) {
        setRefresh(!refresh);
        setOpen(false);
        return response.data.student;

      } else {
        setErrmsg(response.data.message);
        console.error('Failed to update student profile:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating student profile:', error);
    }
  };
  return (
    <div>
{/* ======================edit modal================================ */}
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
            value={joiningYear}
            onChange={(event) => setJoiningYear(event.target.value)}
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
            id="teachingArea"
            label="Teaching Area"
            type="text"
            fullWidth
            variant="standard"
            name="teachingArea"
            value={teachingArea}
            onChange={(event) => setTeachingArea(event.target.value)}
          />
          <TextField
            margin="dense"
            id="qualification"
            label="Qualification"
            type="tel"
            fullWidth
            variant="standard"
            name="qualification"
            value={qualification}
            onChange={(event) => setQualification(event.target.value)

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
          <Button type="button" onClick={HandleSave}>Update</Button>
        </DialogActions>
      </Dialog>

{/* ====================================================================== */}
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
    </div>

  );
}

export default FacProfile;
