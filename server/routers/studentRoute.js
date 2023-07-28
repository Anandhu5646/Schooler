const express= require("express");
const { getStudProfile, postStudEditProfile, sentOtp, 
     changePassword, getStudClubs,
     postClubRequest, getSendReqStatus, postStudComplaint, getStudViewNotice, getStudViewAttendance } = require("../controllers/studentController");
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
router.get("/clubs",verifyStudent, getStudClubs)
router.get("/clubStatus", verifyStudent, getSendReqStatus)
router.get("/notice", verifyStudent, getStudViewNotice)
router.get("/attendance", verifyStudent, getStudViewAttendance)

router.post("/",verifyStudent,upload.single('pic'),postStudEditProfile)
router.post("/sentOtp",verifyStudent,sentOtp)
router.post("/changePass", verifyStudent, changePassword)
router.post("/clubReq", verifyStudent, postClubRequest)
router.post("/saveComplaint", verifyStudent, postStudComplaint)


module.exports = router;