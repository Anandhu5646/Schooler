const express= require("express");
const router= express.Router()
const { postAdminAddStudent, postAdminAddFaculty, postAdminAddSubject, 
    postAdminAddClass, postAdminAddNotice, getAdminStudents,
     getAdminFaculties, getAdminSubjects, getAdminClasses, postAdminAddClub,
      getAdminNotices, getAdminClubs, editAdminStudent, deleteFaculty, deleteStudent, deleteSubject, getFacByid, postEditAdminFaculty, getClubFaculties, deleteClub, deleteClubs} = require("../controllers/adminController");
const verifyAdmin = require("../middleware/verifyAdmin");



// router.use(verifyAdmin)
router.post("/addStudent",verifyAdmin,postAdminAddStudent)
router.post("/addFaculty",verifyAdmin,postAdminAddFaculty)
router.post("/addSubject",verifyAdmin,postAdminAddSubject)
router.post("/addClass",verifyAdmin,postAdminAddClass)
router.post("/addNotice",verifyAdmin,postAdminAddNotice)
router.post("/addClub",verifyAdmin,postAdminAddClub)
router.get("/viewStudents",verifyAdmin,getAdminStudents)
router.get("/viewFaculties",verifyAdmin,getAdminFaculties) 
router.get("/viewSubjects",verifyAdmin, getAdminSubjects)
router.get("/viewClasses",getAdminClasses)
router.get("/viewNotices",verifyAdmin,getAdminNotices)
router.get("/viewClubs",verifyAdmin,getAdminClubs)
router.post("/saveFac/:id",postEditAdminFaculty)
router.get("/viewFaculties/:id", verifyAdmin, getFacByid)
router.post("/deleteFaculty",verifyAdmin,deleteFaculty)
router.post("/deleteStudent",verifyAdmin,deleteStudent)
router.post("/deleteSubject",verifyAdmin,deleteSubject)
router.post("/deleteClub/:id",verifyAdmin,deleteClubs)
router.get("/faculty", verifyAdmin, getClubFaculties)

 
module.exports = router; 