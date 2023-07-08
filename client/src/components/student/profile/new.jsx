import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './Profile.css'
import { StudentProfileApi, StudentProfileUpdateApi, StudentVerifyMail, studentSubmitpassApi } from '../../api/StudentApi';
import { Button, DialogContentText, FormControl, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ApiViewDepartment, ApiViewSemester } from '../../api/AdminApi';
export default function Profile() {
  const [studetnData, setStudetnData] = useState({})
  const ApiHelper = async () => {
    let data = await StudentProfileApi()
    setStudetnData(data)
  }
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    ApiHelper()
  }, [refresh])



  // =====>MODAL<=======
  const [open, setOpen] = React.useState(false);


  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [mobNumber, setmobNumber] = React.useState('')
  const [dob, setDob] = React.useState('')
  const [admYear, setAdmyear] = React.useState('')
  const [guardianName, setguardianName] = React.useState('')
  const [guardianNumber, setguardianNumber] = React.useState('')
  const [address, setaddress] = React.useState('')
  const [department, setdepartment] = React.useState('')
  const [gender, setgender] = React.useState('')
  const [semester, setsemester] = React.useState('')
  const [pic, setPic] = useState('')

  console.log(studetnData);

  const HandleClickOpen = async () => {

    setOpen(true);
    setName(studetnData.name)
    setEmail(studetnData.email)
    setmobNumber(studetnData.mobNumber)
    setDob(studetnData.DOB)
    setAdmyear(studetnData.admYear)
    setguardianName(studetnData.guardianName)
    setguardianNumber(studetnData.guardianNo)
    setaddress(studetnData.address)
    setdepartment(studetnData.department)
    setgender(studetnData.gender)
    setsemester(studetnData.semester)
    GetDept()
    GetSem()
  }
  const handleClose = () => {
    setOpen(false);
  };
  const [totalDepartment, setDep] = React.useState([])
  const GetDept = async () => {
    let data = await ApiViewDepartment()
    setDep(data)
  }
  const [totalSem, setSem] = React.useState([])
  const GetSem = async () => {
    let data = await ApiViewSemester()
    setSem(data)
  }
  //  console.log(semester);
  const [errmsg, setErrmsg] = useState('')
  const HandlSave = () => {
    if (name.trim() && email.trim() && mobNumber.trim() && dob.trim() && admYear.trim() && guardianName.trim() && guardianNumber.trim()
      && address.trim() && department.trim() && gender.trim() && semester.trim()) {

      StudentProfileUpdateApi(name, email, mobNumber, dob, admYear, guardianName, guardianNumber, address, department,
        gender, semester, pic)
      setRefresh(!refresh)
      setOpen(false);
    } else {
      setErrmsg('Fill the form prperly')
    }

  }
  // ===================


  //   ===========>PASSWORD MODAL<============
  const [openPas, setOpenPas] = React.useState(false);
  const [emailOrPhone, setEmailOrPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [text, setText] = useState(' Enter your Registered email or phone number ')
  const [label1, setLabel1] = useState("Email or Phone")
  const [btnText, setBtnText] = useState("Send OTP")
  const [errMsg, setErrMsg] = useState('')
  const [cameOtp, setcameOtp] = useState(0)
  const handleClickOpenPas = () => {
    setOpenPas(true);
  };

  const handleClosepas = () => {
    setOpenPas(false);
  };

  const handleVerify = async () => {
    let data = await StudentVerifyMail(emailOrPhone)
    if (data.otp === false) {
      setErrMsg(data.text)
    } else {
      setcameOtp(data.otp)
      setText('Enter your OTP')
      setLabel1('Enter OTP')
      setBtnText('Verify')
      setErrMsg('')
    }
  }
  const VerifyOtp = async() => {
    
    if (otp === cameOtp) {
      
      handleClosepas()
      handleClickOpenPas1()
      setErrMsg('')
      
    } else {

      setErrMsg('Enter Currect OTP')
    }

  }
  // ================================================

  // =============================password change==========================
  const [open1, setOpenPas1] = React.useState(false);

  const handleClickOpenPas1 = () => {
    setOpenPas1(true);
  };

  const handleClosepas1 = () => {
    setOpenPas1(false);
  };


  const [newpass, SetNewpass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const SubmitPass = async () => {
    if (newpass === confirmPass &&newpass.trim() && confirmPass.trim()) {
      await studentSubmitpassApi(newpass)
      handleClosepas1()

    } else {
      setErrMsg('password not match')
    }
  }
  // ======================================================================
  return (
    <>


      {/* ========================>CONFIRM PASSWORD MODAL<=============================== */}
      <div>

        <Dialog
          fullScreen={fullScreen}
          open={open1}
          onClose={handleClosepas1}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"OTP Verification"}
          </DialogTitle>
          <p style={{ color: 'red',marginLeft:'10px' }}>{errMsg}</p>
          <DialogContent>
            <DialogContentText>
              Change Password
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label='Enter New password'
              type="text"
              value={newpass}
              onChange={(e) => SetNewpass(e.target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label='Enter Confirm password'
              type="text"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={SubmitPass} autoFocus>
              Save
            </Button>
          </DialogActions>

        </Dialog>
      </div>
      {/* ================================================================================================== */}


      {/* ===================>MODAL OTP=================*/}

      <div>

        <Dialog
          fullScreen={fullScreen}
          open={openPas}
          onClose={handleClosepas}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"OTP Verification"}
          </DialogTitle>
          <p style={{ color: 'red',marginLeft:'10px' }}>{errMsg}</p>
          <DialogContent>
            <DialogContentText>
              {text}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label={label1}
              type="text"
              value={btnText === 'Verify' ? otp : emailOrPhone}
              onChange={btnText === 'Verify' ? (e) => setOtp(e.target.value) : (e) => setEmailOrPhone(e.target.value)}
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={btnText === 'Verify' ? VerifyOtp : handleVerify} autoFocus>
              {btnText}
            </Button>
          </DialogActions>

        </Dialog>
      </div>

      {/* ======================================== */}
      {/* =======>MODAL<======= */}
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update Student Details</DialogTitle>
          <DialogContent>
            <p style={{ color: 'red', }}>{errmsg}</p>
            <TextField
              autoFocus
              margin="dense"
              id="fullname"
              label="Full Name"
              type="text"
              fullWidth
              variant="standard"
              name="names"
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
              id="phonenumber"
              label="Phone Number"
              type="tel"
              fullWidth
              variant="standard"
              name="mobNumber"
              value={mobNumber}
              onChange={(event) => setmobNumber(event.target.value)}
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
              id="admissionyear"
              label="Admission Year"
              type="number"
              fullWidth
              variant="standard"
              name="admYear"
              value={admYear}
              onChange={(event) => setAdmyear(event.target.value)}
            />
            <FormControl margin="dense" fullWidth>
              <InputLabel id="department-label">Select Department</InputLabel>
              <Select
                labelId="department-label"
                id="department"
                variant="standard"
                fullWidth

                value={department}
                onChange={(event) => setdepartment(event.target.value)}
              >
                {totalDepartment.map((data, index) => (

                  <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="dense" fullWidth>
              <InputLabel id="semester-label">Select Semester</InputLabel>
              <Select
                labelId="semester-label"
                id="semester"
                variant="standard"
                fullWidth

                value={semester}
                onChange={(event) => setsemester(event.target.value)
                }
              >
                {totalSem.map((data, index) => (

                  <MenuItem key={index} value={data.semester}>{data.semester}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="dense" fullWidth>
              <InputLabel id="gender-label">Select Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                variant="standard"
                fullWidth

                value={gender}
                onChange={(event) => setgender(event.target.value)}
              >
                <MenuItem hidden value={gender}>{gender}</MenuItem>
                <MenuItem value="m">Male</MenuItem>
                <MenuItem value="f">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="guardianname"
              label="Guardian Name"
              type="text"
              fullWidth
              variant="standard"
              name="guardianName"
              value={guardianName}
              onChange={(event) => setguardianName(event.target.value)}
            />
            <TextField
              margin="dense"
              id="guardiannumber"
              label="Guardian Number"
              type="tel"
              fullWidth
              variant="standard"
              name="guardianNumber"
              value={guardianNumber}
              onChange={(event) => setguardianNumber(event.target.value)

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
              onChange={(event) => setaddress(event.target.value)
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
      {/* ======================= */}
      <section className="" style={{ backgroundColor: '#f4f5f7' }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100 leftarrange">
            <MDBCol lg="6" className="mb-4 mb-lg-0 leftarrange1">
              <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBRow className="g-0">
                  <MDBCol md="4" className="gradient-custom text-center text-black"
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <MDBCardImage src={studetnData.image === 'noImg' ? 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp' : `http://localhost:4000/images/${studetnData.image}`}
                      alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                    <MDBTypography tag="h5">{studetnData.name}</MDBTypography>
                    {/* <MDBCardText>Web Designer</MDBCardText> */}
                    <Button onClick={HandleClickOpen}><MDBIcon far icon="edit mb-5" /></Button> <br />
                    <Button onClick={handleClickOpenPas} className='text-blue psBtn'>Change password?</Button>
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">{studetnData.email}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          <MDBCardText className="text-muted">{studetnData.mobNumber}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">D-O-B</MDBTypography>
                          <MDBCardText className="text-muted">{new Date(studetnData.DOB).toLocaleDateString()}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Gender</MDBTypography>
                          <MDBCardText className="text-muted">{studetnData.gender}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Admission Year</MDBTypography>
                          <MDBCardText className="text-muted">{studetnData.admYear}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Department</MDBTypography>
                          <MDBCardText className="text-muted">{studetnData.department}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Semester</MDBTypography>
                          <MDBCardText className="text-muted">{studetnData.semester}</MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBTypography tag="h6">Personal Info</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Guardian Name</MDBTypography>
                          <MDBCardText className="text-muted">{studetnData.guardianName}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Guardian Number</MDBTypography>
                          <MDBCardText className="text-muted">{studetnData.guardianNo}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">address</MDBTypography>
                          <MDBCardText className="text-muted">{studetnData.address}</MDBCardText>
                        </MDBCol>
                      </MDBRow>


                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}