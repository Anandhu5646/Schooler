const studentModel = require("../models/studentModel")
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken")
var salt= bcrypt.genSaltSync(10)

let studentAuthController={
    postStudLogin: async (req, res) => {
        try {
          const { email, password } = req.body;
         
          const student = await studentModel.findOne({email});
      console.log(student,'wwwwwwwwwwwwwwwwwwwwwwwwww')
          if (!student) {
            return res.json({ error: true, message: "You have no student access" });
          }
      
          const isPasswordMatch = await bcrypt.compare(password, student.password);
          
          if (!isPasswordMatch) {
            return res.json({ error: true, message: "Wrong password" });
          }
      
          const token = jwt.sign({ id: student._id }, "myjwtsecretkey");
          return res
            .cookie("studentToken", token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
              secure: true,
              sameSite: "none"
            })
            .json({ error: false });
        } catch (error) {
          res.status(500).json({ error: error, message: "Server error" });
          console.log(error);
        }
      },
  
      postStudLogout:async(req,res)=>{
        const token=req.cookies.studentToken
        res.cookie("studentToken",token,{
            httpOnly:"true",
            expires:new Date(0),
            secure:"true",
            sameSite:"none"
        }).status(200).json({success:true,message:"logged out",error:false})
    },
    checkStudLoggedIn: async(req,res)=>{
        try {
            const token=req.cookies.studentToken
            if(!token){
                return res.json({loggedIn:false,message:"no token"})
            }
            const verifiedJwt= jwt.verify(token, "myjwtsecretkey")
            const student= await studentModel.findById(verifiedJwt.id )
            
            console.log(student,'dfddd',verifiedJwt.id);
            if(!student){
                return res.json({loggedIn: false})
            }
            return res.status(200).json({student, loggedIn : true})
            
            
        } catch (error) {
            console.log(error);
            res.status(500).json({loggedIn:false,error,message:"server error"})
        }
    }
}
module.exports= studentAuthController