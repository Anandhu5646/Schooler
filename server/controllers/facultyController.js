const facultyModel = require("../models/facultyModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sentOTP = require("../helper/otpVerify");
const studentModel = require("../models/studentModel");
const attendanceModel = require("../models/attendanceModel");
const subjectModel = require("../models/subjectModel");
const markModel = require("../models/markModel");
const clubRequestModel = require("../models/clubRequestModel");

let facultyController = {
  getFacProfile: async (req, res) => {
    try {
      return res.status(200).json({ success: true, faculty: req.faculty });
    } catch (error) {
      res.status(500).json({ success: false, error, message: "Server error" });
    }
  },

  postFacEditProfile: async (req, res) => {
    const id = req.faculty.id;
    try {
      const faculty = await facultyModel.findById(id);
      if (!faculty) {
        return res.json({ success: false, message: "faculty not found" });
      }

      faculty.name = req.body.name;
      faculty.email = req.body.email;
      faculty.mobile = req.body.mobile;
      faculty.dob = req.body.dob;
      faculty.joiningYear = req.body.joiningYear;
      faculty.teachingArea = req.body.teachingArea;
      faculty.qualification = req.body.qualification;
      faculty.address = req.body.address;
      faculty.gender = req.body.gender;
      faculty.age = req.body.age;
      faculty.className = req.body.className;
      faculty.pic = req.file;

      const updatedFaculty = await faculty.save();
    
      return res.json({
        success: true,
        message: "faculty profile updated successfully",
        faculty: updatedFaculty,
      });
    } catch (error) {
      console.error("Error updating faculty profile:", error);
      return res.json({
        success: false,
        message: "Failed to update faculty profile",
      });
    }
  },

  sentOtpFac: async (req, res) => {
    try {
      const { email } = req.body;
      const otp = Math.floor(Math.random() * 1000000);
      const otpToken = jwt.sign({ otp, email }, "jwtsecretkey");
      sentOTP(req.body.email, otp);
      res.json({ otpToken, otp });
      console.log(otp, "otp");
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },

  changePasswordFac: async (req, res) => {
    try {
      const { newPassword } = req.body;
      const id = req.faculty.id;
      console.log(newPassword, "new pass");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const updatedFaculty = await facultyModel.updateOne(
        { _id: id },
        { password: hashedPassword }
      );
      res.json({ message: "Password changed successfully", updatedFaculty });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error, message: " server error" });
    }
  },

  getStudentAttendance: async (req, res) => {
    const className = req.faculty.className;

    try {
      const students = await studentModel.find({ className });

      res.json({
        success: true,
        students,
        message: "student data fetched successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch students" });
    }
  },

  postFacStudAttendance: async (req, res) => {
    const attendanceData = req.body;
    
    try {
      await attendanceModel.create(attendanceData);
      res.json({
        success: true,
        message: "Attendance data saved successfully",
      });
    } catch (error) {
      console.error("Failed to save attendance data:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to save attendance data" });
    }
  },

  getStudMark: async (req, res) => {
    const className = req.faculty.className;
    try {
      const students = await studentModel.find({ className });

      res.json({
        success: true,
        students,
        message: "student data fetched successfully",
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, error: "Failed to save attendance data" }); 
    }
  },

  getAllSubjects: async(req,res)=>{
    try {
      const subjects= await subjectModel.find()
      res.json({success:true, subjects})
    } catch (error) {
      res.json({success:false, error, message:"Failed to display subjects"})
    }
  },

  saveStudentMark: async (req,res)=>{
    try {
      const { studentId, subject, marks, grade } = req.body;
      
      const mark = await markModel.create({
        student: studentId,
        subject,
        marks,
        markingDate: new Date().toLocaleDateString(),
        grade,
        status: true
      });
  
      res.status(200).json({ success: true, message: 'Mark data saved successfully' });
    } catch (error) {
      console.error(error)
      res.json({success:false,error, message:"Server error"})
    }
  },
  
  getClubReq:async (req,res)=>{
    try {
      const id = req.faculty.id;
      const request= await clubRequestModel.find({facultyId:id}).sort({_id:-1})
      res.json({success:true, request})
    } catch (error) {
      console.log(error)
      res.json({success:false, error, message:"Server Error"})
    }
  },
  postFacClubReqUpdate:async (req,res)=>{
    try {
      console.log(id,'ererererer',status)
      await clubRequestModel.updateOne({ _id: req.body.id },
         { status: req.body.status })
         console.log("updated status", status)
      res.json({ success: true });
    } catch (error) {
      res.json({success:false,error, message:"Server error"})
    }
  }




};
module.exports = facultyController;
