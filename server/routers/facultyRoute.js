const express = require("express");
const {
  getFacProfile,
  postFacEditProfile,
  sentOtpFac,
  changePasswordFac,
  getStudentAttendance,
  postFacStudAttendance,
  getStudMark,
  getAllSubjects,
  saveStudentMark,
  getClubReq,
  postFacClubReqUpdate,
  postFacComplain,
  getFacViewNotice,
  postFacTimeTable,
  viewTimeTable,
  deleteTImeTable,
  
} = require("../controllers/facultyController");
const verifyFaculty = require("../middleware/verifyFaculty");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });



router.get("/", verifyFaculty, getFacProfile);
router.get('/viewAttendance', verifyFaculty, getStudentAttendance)
router.get('/viewMarkStatus', verifyFaculty, getStudMark)
router.get('/viewSubjects', verifyFaculty, getAllSubjects)
router.get("/viewClubReq", verifyFaculty, getClubReq)
router.get("/notice", verifyFaculty, getFacViewNotice)
router.get("/timeTable", verifyFaculty, viewTimeTable)

router.post("/", verifyFaculty, upload.single("pic"), postFacEditProfile);
router.post("/sentOtp", verifyFaculty, sentOtpFac);
router.post("/changePass", verifyFaculty, changePasswordFac);
router.post('/viewAttendance',verifyFaculty, postFacStudAttendance )
router.post("/saveMark", verifyFaculty, saveStudentMark)
router.post("/saveReq", verifyFaculty, postFacClubReqUpdate)
router.post("/saveComplaint", verifyFaculty, postFacComplain)
router.post("/saveTimeTable", verifyFaculty, postFacTimeTable)
router.post("/deleteTimetable/:id", verifyFaculty, deleteTImeTable)


module.exports = router;
