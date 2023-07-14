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
router.post("/", verifyFaculty, upload.single("pic"), postFacEditProfile);
router.post("/sentOtp", verifyFaculty, sentOtpFac);
router.post("/changePass", verifyFaculty, changePasswordFac);
router.get('/viewAttendance', verifyFaculty, getStudentAttendance)
router.post('/saveAttendance',verifyFaculty, postFacStudAttendance )
router.get('/viewMarkStatus', verifyFaculty, getStudMark)
router.get('/viewSubjects', verifyFaculty, getAllSubjects)
router.post("/saveMark", verifyFaculty, saveStudentMark)

module.exports = router;
