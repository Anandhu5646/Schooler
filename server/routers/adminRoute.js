const express= require("express");
const router= express.Router()
const { postAdminAddStudent, postAdminAddFaculty, postAdminAddSubject, 
    postAdminAddClass, postAdminAddNotice, getAdminStudents,
     getAdminFaculties, getAdminSubjects, getAdminClasses, postAdminAddClub, getAdminNotices, getAdminClubs} = require("../controllers/adminController");


router.post("/addStudent",postAdminAddStudent)
router.post("/addFaculty",postAdminAddFaculty)
router.post("/addSubject",postAdminAddSubject)
router.post("/addClass",postAdminAddClass)
router.post("/addNotice",postAdminAddNotice)
router.post("/addClub",postAdminAddClub)
router.get("/viewStudents",getAdminStudents)
router.get("/viewFaculties",getAdminFaculties)
router.get("/viewSubjects", getAdminSubjects)
router.get("/viewClasses",getAdminClasses)
router.get("/viewNotices",getAdminNotices)
router.get("/viewClubs",getAdminClubs)

module.exports = router;