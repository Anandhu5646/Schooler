const express= require("express");
const { getFacProfile } = require("../controllers/facultyController");
// const verifyFaculty= require("../middleware/verifyFaculty")
const router= express.Router()

router.get("/",getFacProfile)


module.exports = router;