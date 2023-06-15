const express= require("express");
const router= express.Router()
const { postAdminAddStudent, postAdminAddFaculty, postAdminAddSubject } = require("../controllers/adminController");


router.post("/addStudent",postAdminAddStudent)
router.post("/addFaculty",postAdminAddFaculty)
router.post("/addSubject",postAdminAddSubject)

module.exports = router;