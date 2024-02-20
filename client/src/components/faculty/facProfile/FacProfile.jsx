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
  facultySubmitPass,
  fetchFaculty,
  sentOttpFac,
} from "../../../api/facultyApi";
import "./FacProfile.css";
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
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

function FacProfile() {
  const [faculty, setFaculty] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [joiningYear, setJoiningYear] = useState("");
  const [teachingArea, setTeachingArea] = useState("");
  const [qualification, setQualification] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [className, setClassName] = useState("");
  const [pic, setPic] = useState("");
  const [action, setAction] = useState("profile");
  const HandleClickOpen = async () => {
    setOpen(true);
    setName(faculty.name);
    setEmail(faculty.email);
    setMobile(faculty.mobile);
    setDob(faculty.dob);
    setJoiningYear(faculty.joiningYear);
    setTeachingArea(faculty.teachingArea);
    setQualification(faculty.qualification);
    setAge(faculty.age);
    setAddress(faculty.address);
    setGender(faculty.gender);
    setClassName(faculty.className);
  };
  const fetchfacultyData = async () => {
    try {
      const facultyData = await fetchFaculty();
      setFaculty(facultyData);
      setClassName(facultyData.className);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetchfacultyData();
    getClasses();
  }, [refresh]);
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

  const [errmsg, setErrmsg] = useState("");
  const HandleSave = async () => {
    try {
      const response = await axios.post(
        "/faculty/",
        {
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
        return response.data.faculty;
      } else {
        setErrmsg(response.data.message);
        console.error(
          "Failed to update faculty profile:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error updating faculty profile:", error);
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
      const data = await sentOttpFac(emailOrPhone);
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
      await facultySubmitPass(newPassword);
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

  return (
    <div className="fac-profile-outer">
      {/* =========================== otp modal ======================= */}

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

      {/* ====================== password change ==================== */}

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
      {/* ======================edit modal================================ */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Faculty Details</DialogTitle>
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
            id="joiningYear"
            label="Joining Year"
            type="number"
            fullWidth
            variant="standard"
            name="joiningYear"
            value={joiningYear}
            onChange={(event) => setJoiningYear(event.target.value)}
          />

          <FormControl margin="dense" fullWidth>
            <InputLabel id="classname-label">Select Class</InputLabel>
            {classes.length > 0 && (
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
            onChange={(event) => setQualification(event.target.value)}
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
            // label="Change Profile Photo"
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

      {/* ====================================================================== */}
      <section className="">
        {faculty && (
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
                      className="gradient-customss text-center text-white"
                    >
                      <MDBCardImage
                        src={
                          faculty.pic && faculty.pic.length >0
                            ? `https://schooler.asweb.online/images/${faculty.pic[0].filename}`
                            : `https://lordicon.com/icons/wired/outline/21-avatar.gif`
                        }
                        alt=""
                        className="rounded-circle my-5" 
                        style={{
                          width: "120px",
                          height: "120px",
                          border: "4px solid #fff",
                          padding:"4px"
                        }}
                        fluid
                      />

                      <MDBTypography tag="h5" className="fw-bold mb-4">
                        {faculty.name}
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
                        <div className="row pt-1">
                          <div className="col-12 mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Email
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {faculty.email}
                            </MDBCardText>
                          </div>
                          <div className="col-12 mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Phone
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {faculty.mobile}
                            </MDBCardText>
                          </div>
                          <div className="col-12 mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Teaching Area
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {faculty.teachingArea}
                            </MDBCardText>
                          </div>
                          <div className="col-12 mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Qualification
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {faculty.qualification}
                            </MDBCardText>
                          </div>
                        </div>
                        <div className="row pt-1">
                          <div className="col-md-6 mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Date of Birth
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {faculty.dob}
                            </MDBCardText>
                          </div>
                          <div className="col-md-6 mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Age
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {faculty.age}
                            </MDBCardText>
                          </div>
                          <div className="col-md-6 mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Class
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {faculty.className}
                            </MDBCardText>
                          </div>
                          <div className="col-md-6 mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Joining Year
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {faculty.joiningYear}
                            </MDBCardText>
                          </div>
                        </div>
                        <div className="row pt-1">
                          <div className="col-12 mb-3">
                            <MDBTypography tag="h6" className="fw-bold">
                              Address
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {faculty.address}
                            </MDBCardText>
                          </div>
                        </div>
                        <Button
                          variant="text"
                          className="change-pass"
                          onClick={handleOpenModals}
                          style={{ marginLeft: "200px" }}
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
    </div>
  );
}

export default FacProfile;
