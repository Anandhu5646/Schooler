const jwt = require('jsonwebtoken');
const studentModel = require('../models/studentModel');

const verifyStudent = async(req, res, next) => {
    
        try {
            const token=req.cookies.studentToken
            if(!token){
                return res.json({loggedIn:false,message:"no token"})
            }
            const verifiedJwt= jwt.verify(token, "myjwtsecretkey")
            const student= await studentModel.findById(verifiedJwt.id )
            
            // console.log(student,'dfddd',verifiedJwt.id);
            if(!student){
                return res.json({loggedIn: false})
            }
            req.student=student
           next()
            
            
        } catch (error) {
            console.log(error);
            res.status(500).json({loggedIn:false,error,message:"server error"})
        }
    
}

module.exports= verifyStudent;