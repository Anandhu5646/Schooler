const express= require("express");
const { getFacProfile } = require("../controllers/facultyController");
const verifyFaculty = require("../middleware/verifyFaculty");
const router= express.Router()

router.get("/",verifyFaculty, getFacProfile)


module.exports = router;