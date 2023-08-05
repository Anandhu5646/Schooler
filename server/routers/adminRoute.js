const express = require("express");
const router = express.Router();
const {
  postAdminAddStudent,
  postAdminAddFaculty,
  postAdminAddSubject,
  postAdminAddClass,
  postAdminAddNotice,
  getAdminStudents,
  getAdminFaculties,
  getAdminSubjects,
  getAdminClasses,
  postAdminAddClub,
  getAdminNotices,
  getAdminClubs,
  deleteFaculty,
  deleteStudent,
  deleteSubject,
  postEditAdminFaculty,
  getClubFaculties,
  deleteClubs,
  dashBoard,
  getAllcomplaints,
  deleteComplain,
  postAdminUpdateStudent,
  getUpdateStudent,
  postUploadNotice,
  postPaymentMsgToStud,
  getPaymentList,
  deletePaymentList,
  getUpdateFaculty,
  postAdminUpdateFaculty,
  getPaymentHistory,
} = require("../controllers/adminController");
const verifyAdmin = require("../middleware/verifyAdmin");

router.get("/", verifyAdmin, dashBoard);
router.get("/viewStudents", verifyAdmin, getAdminStudents);
router.get("/viewFaculties", verifyAdmin, getAdminFaculties);
router.get("/viewSubjects", verifyAdmin, getAdminSubjects);
router.get("/viewClasses", getAdminClasses);
router.get("/viewNotices", verifyAdmin, getAdminNotices);
router.get("/viewClubs", verifyAdmin, getAdminClubs);
router.get("/faculty", verifyAdmin, getClubFaculties);
router.get("/complain", verifyAdmin, getAllcomplaints);
router.get("/updateStudent", verifyAdmin, getUpdateStudent);
router.get("/updateFaculty", verifyAdmin, getUpdateFaculty);
router.get("/payment", verifyAdmin, getPaymentList);
router.get("/paymentHistory", verifyAdmin, getPaymentHistory);

router.post("/addStudent", verifyAdmin, postAdminAddStudent);
router.post("/addFaculty", verifyAdmin, postAdminAddFaculty);
router.post("/addSubject", verifyAdmin, postAdminAddSubject);
router.post("/addClass", verifyAdmin, postAdminAddClass);
router.post("/addNotice", verifyAdmin, postAdminAddNotice);
router.post("/addClub", verifyAdmin, postAdminAddClub);
router.post("/saveFac/:id", postEditAdminFaculty);
router.delete("/deleteFaculty/:id", verifyAdmin, deleteFaculty);
router.post("/deleteStudent", verifyAdmin, deleteStudent);
router.post("/deleteComplain/:id", verifyAdmin, deleteComplain);
router.post("/deleteSubject", verifyAdmin, deleteSubject);
router.post("/deleteClub/:id", verifyAdmin, deleteClubs);
router.post("/updateStudent", verifyAdmin, postAdminUpdateStudent);
router.post("/updateFaculty", verifyAdmin, postAdminUpdateFaculty);
router.post("/saveNotice", verifyAdmin, postUploadNotice);
router.post("/addPayment", verifyAdmin, postPaymentMsgToStud);
router.post("/deletePayment/:id", verifyAdmin, deletePaymentList);

module.exports = router;
