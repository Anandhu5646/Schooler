const jwt = require('jsonwebtoken');

const verifyFaculty = async (req, res, next) => {
  try {
            const token=req.cookies.facultyToken
            if(!token){
                return res.json({loggedIn:false,message:"no token"})
            }
            const verifiedJwt= jwt.verify(token, "myjwtsecretkey")
            const faculty= await facultyModel.findById(verifiedJwt.id )
            if(!faculty){
                return res.json({loggedIn: false})
            }
            req.faculty=faculty
            next()
            
        } catch (error) {
            console.log(error);
            res.status(500).json({loggedIn:false,error,message:"server error"})
        }
};

module.exports = verifyFaculty 
