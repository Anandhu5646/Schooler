const jwt= require('jsonwebtoken')
const studentModel = require("../models/studentModel");
const sentOTP= require('../helper/otpVerify')
const bcrypt = require("bcryptjs");
const clubModel = require('../models/clubModel');

let studentController={

  getStudProfile: async (req, res) => {
    try {
      return res.status(200).json({ success: true, student:req.student });
    } catch (error) {
        console.log(error)
      res.status(500).json({ success: false, error, message: "Server error" });
    }
  },
  postStudEditProfile: async (req, res) => {
    const id = req.student.id;
    try {
      const student = await studentModel.findById(id);
      if (!student) {
        return res.json({ success: false, message: 'Student not found' });
      }
  
      student.name = req.body.name;
      student.email = req.body.email;
      student.mobile = req.body.mobile;
      student.dob = req.body.dob;
      student.admYear = req.body.admYear;
      student.fatherName = req.body.fatherName;
      student.motherName = req.body.motherName;
      student.address = req.body.address;
      student.rollNo = req.body.rollNo;
      student.gender = req.body.gender;
      student.age = req.body.age;
      student.className = req.body.className;
      student.pic = req.file;
  
      const updatedStudent = await student.save();
  
      
      return res.json({ success: true, message: 'Student profile updated successfully', student: updatedStudent });
    } catch (error) {
      console.error('Error updating student profile:', error);
      return res.json({ success: false, message: 'Failed to update student profile' });
    }
  }
  ,
  sentOtp:async(req,res)=>{
    try {
      const { email } = req.body;
      const otp = Math.floor(Math.random() * 1000000);
      const otpToken = jwt.sign({ otp, email }, "jwtsecretkey");
      sentOTP(req.body.email, otp)
      res.json({ otpToken ,otp});
      console.log(otp,'otp')
    } catch (error) {
      console.log(error);
      res.status(500).json({success:false,error})
    }
  },

  changePassword:async(req,res)=>{
    try {
        const { newPassword } = req.body;
        const id = req.student.id;
        console.log(newPassword,'new pass')
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const updatedStudent = await studentModel.updateOne({_id:id}, { password: hashedPassword });
        console.log(hashedPassword, 'dfdfdfdfsdsdsd' ,updatedStudent)
          res.json({ message: 'Password changed successfully', updatedStudent });
        
    }catch(error) {
      console.log(error);
      res.status(500).json({error, message:" server error"})
    }
  },
  getStudClubs: async(req,res)=>{
    try {
      const  clubs= await clubModel.find().sort({_id:-1})
      const token=req.cookies.studentToken
      const verifiedJwt= jwt.verify(token, "myjwtsecretkey")
      const student= await studentModel.findById(verifiedJwt.id )

     
    res.json({success:true, clubs, student})
    } catch (error) {
      console.log("Something went wrong")
      res.json({success:false, error, message:"Error occured while fetchig club list"})
    }
  },
  
    
}

module.exports= studentController