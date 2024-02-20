import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import {
  fetchStudent,
  sentOttp,
  studentSubmitPass,
} from "../../../api/studentApi";

import { MdEditSquare } from "react-icons/md";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import "./StudProfile.css";

function StudProfile() {
  const [student, setStudent] = useState(null);

  const fetchStudentData = async () => {
    try {
      const studentData = await fetchStudent();
      setStudent(studentData);
      setClassName(studentData.className);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [refresh, setRefresh] = useState(false);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [admYear, setAdmyear] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [className, setClassName] = useState("");
  const [pic, setPic] = useState("");
  const [action, setAction] = useState("profile");
  const HandleClickOpen = async () => {
    setOpen(true);
    setName(student.name);
    setEmail(student.email);
    setMobile(student.mobile);
    setDob(student.dob);
    setAdmyear(student.admYear);
    setFatherName(student.fatherName);
    setMotherName(student.motherName);
    setAge(student.age);
    setAddress(student.address);
    setRollNo(student.rollNo);
    setGender(student.gender);
    getClasses();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [classes, setClasses] = useState([]);
  const getClasses = async () => {
    try {
      const data = await axios.get("/admin/viewClasses");
      setClasses(data.data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    getClasses();
    fetchStudentData();
  }, [refresh]);

  const [errmsg, setErrmsg] = useState("");
  const HandleSave = async () => {
    try {
      const response = await axios.post(
        "/student/",
        {
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
          pic,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setRefresh(!refresh);
        setOpen(false);
        setAction("profile");
        return response.data.student;
      } else {
        setErrmsg(response.data.message);
        console.error(
          "Failed to update student profile:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error updating student profile:", error);
    }
  };
  // =====================otp modal=====================

  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [openChangePwdModal, setOpenChangePwdModal] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [text, setText] = useState(
    "Enter your registered email or phone number"
  );
  const [label1, setLabel1] = useState("Email or Phone");
  const [btnText, setBtnText] = useState("Send OTP");

  const [cameOtp, setCameOtp] = useState(0);

  const handleOpenModals = () => {
    setOpenVerifyModal(true);
    setEmailOrPhone("");
    setOtp("");
    setErrMsg("");
    setText("Enter your registered email or phone");
    setLabel1("Email or Phone");
    setBtnText("Send OTP");
  };
  const handleCloseModals = () => {
    setOpenVerifyModal(false);
    setOpenChangePwdModal(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSendOTP = async () => {
    if (!emailOrPhone) {
      Swal.fire({
        icon: "error",
        title: "Oops..!!",
        text: "Email is required",
      });
      return;
    }

    try {
      const data = await sentOttp(emailOrPhone);
      if (data.otp === false) {
        setErrMsg("otp wrong");
      }

      setCameOtp(data.otp);
      setText("Enter your OTP");
      setLabel1("Enter OTP");
      setBtnText("Verify");
      setErrMsg("");
      setAction("otp");

      console.log(data.otp, "otp");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOTP = () => {
    if (otp === "") {
      setErrMsg("OTP is required");
      return;
    }

    if (otp == cameOtp) {
      setErrMsg("");
      handleclickPasOpen();
      setOpenChangePwdModal(true);
    } else {
      setErrMsg("otp incorrect");
    }
  };
  // =====================password change ======================

  const [openPas, setOpenPas] = useState(false);

  const handleclickPasOpen = () => {
    setOpenPas(true);
  };

  const handleCloseModals1 = () => {
    setOpenPas(false);
  };
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (
      newPassword === confirmPassword &&
      newPassword.trim() &&
      confirmPassword.trim()
    ) {
      await studentSubmitPass(newPassword);
      handleCloseModals1();
      handleCloseModals(false);
      setOpenChangePwdModal(false);
      Swal.fire({
        icon: "success",
        title: "Successful",
        text: "Password Updated",
      });
    } else {
      setErrMsg("password not match");
    }
  };
  // ==========================================================

  return (
    <div className="stud-profile-outer">
      {/* ======================================================================= */}
      {/* otp modal */}
      <div>
        <Dialog open={openVerifyModal} onClose={handleCloseModals}>
          <DialogTitle>OTP Verification</DialogTitle>
          <DialogContent>
            <DialogContentText>{text}</DialogContentText>
            {/* <DialogContentText>{errMsg}</DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              label={label1}
              type="text"
              value={btnText === "Verify" ? otp : emailOrPhone}
              onChange={(e) =>
                btnText === "Verify"
                  ? setOtp(e.target.value)
                  : setEmailOrPhone(e.target.value)
              }
              fullWidth
            />
            {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={btnText === "Verify" ? handleVerifyOTP : handleSendOTP}
              autoFocus
            >
              {btnText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* ================================================================= */}

      {/* Change Password Modal */}
      <Dialog open={openPas} onClose={handleCloseModals1}>
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
          <Button onClick={handleCloseModals1}>Cancel</Button>
          <Button onClick={handleChangePassword}>Change Password</Button>
        </DialogActions>
      </Dialog>

      {/*============== student profile ==================== */}
      <section className="">
        {student && (
          <MDBContainer className="py-5 h-100 outside-container">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="6" className="mb-4 mb-lg-0">
                <MDBCard
                  className="mb-3 fac-profile-container custom-card"
                  style={{
                    color: "black",
                    background: "#fff",
                    
                    borderRadius: "10px",
                  }}
                >
                  <MDBRow className="g-0">
                    <MDBCol
                      md="4"
                      className="gradient-custom text-center text-white"
      
                    >
                      <MDBCardImage
                        src={
                          student.pic && student.pic.length > 0
                            ? `https://schooler.asweb.online/images/${student.pic[0].filename}`
                            : `https://lordicon.com/icons/wired/outline/21-avatar.gif`
                        }
                        alt=""
                        className="rounded-circle my-5"
                        style={{
                          width: "120px",
                          height: "120px",
                          border: "4px solid #fff",
                        }}
                        fluid
                      />
                      <MDBTypography tag="h5" className="fw-bold mb-4">
                        {student.name}
                      </MDBTypography>
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <MDBTypography tag="h6" className="fw-bold">
                            Information
                          </MDBTypography>
                          <Button onClick={HandleClickOpen} variant="secondary">
                            <MDBIcon />
                            <MdEditSquare />
                          </Button>
                        </div>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol sm={12} md={6} lg={6} className="mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Email
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {student.email}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol  sm={12} md={6} lg={6} className="mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Phone
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {student.mobile}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1">
                          <MDBCol  sm={12} md={6} lg={6} className="mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Mother Name
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {student.motherName}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol  sm={12} md={6} lg={6} className="mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Father Name
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {student.fatherName}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1">
                          <MDBCol  sm={12} md={6} lg={6} className="mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Date of Birth
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {student.dob}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol  sm={12} md={6} lg={6} className="mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Age
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {student.age}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1">
                          <MDBCol  sm={12} md={6} lg={6} className="mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Class
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {student.className}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol  sm={12} md={6} lg={6} className="mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Admission Year
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {student.admYear}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1">
                          <MDBCol  sm={12} md={6} lg={6} className="mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Address
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {student.address}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol  sm={12} md={6} lg={6} className="mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Roll No
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {student.rollNo}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <Button
                          variant="text"
                          className="mt-4"
                          onClick={handleOpenModals}
                        >
                          Change Password?
                        </Button>
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
          <p style={{ color: "red" }}>{errmsg}</p>
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
            {classes?.length > 0 && (
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
                  <MenuItem key={data._id} value={data.className}>
                    {data.className}
                  </MenuItem>
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
              <MenuItem hidden value={gender}>
                {gender}
              </MenuItem>
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
            onChange={(event) => setMotherName(event.target.value)}
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
            onChange={(event) => setAddress(event.target.value)}
          />
          <TextField
            margin="dense"
            id="address"
            type="file"
            fullWidth
            variant="standard"
            onChange={(event) => setPic(event.target.files[0])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="button" onClick={HandleSave}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StudProfile;
