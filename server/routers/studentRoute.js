const express= require("express");
const { getStudProfile, postStudEditProfile, sentOtp } = require("../controllers/studentController");
const verifyStudent = require("../middleware/verifyStudent");
const router= express.Router()
const multer= require("multer")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function (req,file, cb ){
        const uniqueSuffix = Date.now ()+ ".jpg"
        cb(null,file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({storage: storage})



router.get("/" , verifyStudent, getStudProfile)
router.post("/",verifyStudent,upload.single('pic'),postStudEditProfile)
router.post("/sentOtp",verifyStudent,sentOtp)

module.exports = router;