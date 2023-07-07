const express= require("express");
const { getStudProfile } = require("../controllers/studentController");
const verifyStudent = require("../middleware/verifyStudent");
const router= express.Router()

router.get("/" , verifyStudent, getStudProfile)

module.exports = router;