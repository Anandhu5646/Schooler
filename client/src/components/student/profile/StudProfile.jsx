import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import  { fetchStudent, sentOttp } from '../../../api/studentApi';
import { Link } from 'react-router-dom';
import { MdEditSquare } from 'react-icons/md';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@mui/material';
import Toaster from '../../toaster/Toaster';
import axios from 'axios';
import { useTheme } from '@emotion/react';


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

  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    fetchStudentData();
  }, [refresh]);

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
      setClasses(data.data.classes)

    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };


  const [errmsg, setErrmsg] = useState('')
  const HandleSave = async () => {
    try {
      const response = await axios.post('/student/', {
        id: student._id,
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
// =====================otp modal=====================

const [openVerifyModal, setOpenVerifyModal] = useState(false);
const [openChangePwdModal, setOpenChangePwdModal] = useState(false);
const [emailOrPhone, setEmailOrPhone] = useState('');
const [otp, setOtp] = useState('');
const [errMsg, setErrMsg] = useState('');
const [text, setText] = useState('Enter your registered email or phone number');
const [label1, setLabel1] = useState('Email or Phone');
const [btnText, setBtnText] = useState('Send OTP');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [cameOtp, setCameOtp]= useState(0)


const handleOpenModals = () => {
  setOpenVerifyModal(true);
  setEmailOrPhone('');
  setOtp('');
  setErrMsg('');
  setText('Enter your registered email or phone');
  setLabel1('Email or Phone');
  setBtnText('Send OTP');
};
const handleCloseModals = () => {
  setOpenVerifyModal(false);
  setOpenChangePwdModal(false);
  setNewPassword('');
  setConfirmPassword('');
};
const handleSendOTP = async() => {
  const resp= await sentOttp(emailOrPhone)
  
  if (emailOrPhone === '') {
    setErrMsg('Email or phone number is required');
    return;
  }
  // Send OTP and handle the response
  // Update the state variables accordingly
  setCameOtp(resp.otp)
  setText('Enter the OTP received on your email or phone');
  setLabel1('OTP');
  setBtnText('Verify');
  setErrMsg('')
};

const handleVerifyOTP = () => {
  // Implement the logic to verify the OTP
  // Handle any error messages
  if (otp === '') {
    setErrMsg('OTP is required');
    return;
  }
  // Verify the OTP and handle the response
  // If OTP is verified successfully, open the change password modal
  setOpenChangePwdModal(true);
};

const handleChangePassword = async () => {
  if (newPassword === '' || confirmPassword === '') {
    setErrMsg('New password and confirm password are required');
    return;
  }

  if (newPassword !== confirmPassword) {
    setErrMsg('New password and confirm password do not match');
    return;
  }

  try {
    const response = await axios.post('/change-password', {
      email: student.email,
      newPassword: newPassword,
    });

    if (response.data.success) {
      setErrMsg('');
      handleCloseModals();
      // Display success message or perform any other actions
    } else {
      setErrMsg(response.data.message);
      console.error('Failed to change password:', response.data.message);
    }
  } catch (error) {
    console.error('Errorchanging password:', error);
  }
};
  return (
    <div>
    {/* ======================================================================= */}
      {/* otp modal */}
      <div>

      <Dialog open={openVerifyModal} onClose={handleCloseModals}>
        <DialogTitle>OTP Verification</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={label1}
            type="text"
            value={btnText === 'Verify' ? otp : emailOrPhone}
            onChange={(e) => (btnText === 'Verify' ? setOtp(e.target.value) : setEmailOrPhone(e.target.value))}
            fullWidth
          />
          {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={btnText === 'Verify' ? handleVerifyOTP : handleSendOTP} autoFocus>
            {btnText}
          </Button>
        </DialogActions>
      </Dialog>
      </div>

      {/* ================================================================= */}



 {/* Change Password Modal */}
 <Dialog open={openChangePwdModal} onClose={handleCloseModals}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModals}>Cancel</Button>
          <Button onClick={handleChangePassword}>Change Password</Button>
        </DialogActions>
      </Dialog>



      {/*============== student profile ==================== */}
      <section className="">

        {student && (
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="6" className="mb-4 mb-lg-0">
                <MDBCard className="mb-3" style={{ borderRadius: '.5rem', color: "black" }}>
                  <MDBRow className="g-0">
                    <MDBCol md="4" className="gradient-custom text-center text-black" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                      <MDBCardImage src={student.pic.length > 0 ? `http://localhost:1800/images/${student.pic[0].filename}`
                        : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'} alt="Avatar" className="rounded-circle my-5" style={{ width: '120px', height: "120px" }} fluid />
                      <MDBTypography tag="h5">{student.name}</MDBTypography>

                      <MDBIcon far icon="edit mb-5" />
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <div className='d-flex justify-content-between'>
                          <MDBTypography tag="h6">Information</MDBTypography>
                          <Button onClick={HandleClickOpen}><MDBIcon /><MdEditSquare /></Button>
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
                        <Button variant="text" style={{ marginLeft: "200px" }} onClick={handleOpenModals}>Change Password?</Button>
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
          <Button type="button" onClick={HandleSave}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StudProfile;
