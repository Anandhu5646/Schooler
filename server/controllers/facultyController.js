const facultyModel = require("../models/facultyModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sentOTP = require("../helper/otpVerify");
const studentModel = require("../models/studentModel");
const attendanceModel = require("../models/attendanceModel");
const subjectModel = require("../models/subjectModel");
const markModel = require("../models/markModel");
const clubRequestModel = require("../models/clubRequestModel");
const complainModel = require("../models/complainModel");
const noticeModel = require("../models/noticeModel");
const moment = require('moment');
const { default: mongoose } = require("mongoose");

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
    const clasName = req.faculty.className;
    let currentDate = new Date().toLocaleDateString();
    try {
      let previous = await attendanceModel
        .find({
          $and: [
            { date: currentDate },
            { facultyId: req.faculty.id },
            { className: clasName },
          ],
        })
        .lean();
      if (previous.length == 0) {
        let student = await studentModel.find({ className: clasName }).lean();
        let studentArr = [];
        if (student.length == 0) {
          res.json({ success: true, studentArr });
        } else {
          for (let i = 0; i < student.length; i++) {
            let students = {
              date: new Date().toLocaleDateString(),
              studentName: student[i].name,
              studentId: student[i]._id,
              facultyName: req.faculty.name,
              facultyId: req.faculty.id,
              className: clasName,
              status: "Not uploaded",
            };
            studentArr.push(students);
          }

          res.json({ success: true, studentArr });
        }
      } else {
        let student = await studentModel.find({ className: clasName }).lean();
        let studentArr = [];
        if (student.length == 0) {
          res.json({ success: true, studentArr });
        } else {
          for (let i = 0; i < student.length; i++) {
            let status = "Not uploaded";
            let students = {
              date: new Date().toLocaleDateString(),
              studentName: student[i].name,
              studentId: student[i]._id,
              facultyName: req.faculty.name,
              facultyId: req.faculty.id,
              className: clasName,
              status: status,
            };
            studentArr.push(students);
          }
          for (let j = 0; j < previous.length; j++) {
            for (let k = 0; k < studentArr.length; k++) {
              if (previous[j].studentId == studentArr[k].studentId) {
                studentArr[k].status = previous[j].status;
              }
            }
          }
        }

        res.json({ success: true, studentArr });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "Failed to fetch students" });
    }
  },

  postFacStudAttendance: async (req, res) => {
    try {
      const attendanceData = req.body.attendanceData;
      let previous = await attendanceModel
        .findOne({
          $and: [
            { date: req.body.attendanceData.date }, 
            { studentId: req.body.attendanceData.studentId } 
          ],
        })
        .lean();
  
      if (!previous) {
        
        let data = await attendanceModel.create(attendanceData);
        console.log("created", data);
      } else {
       
        let updatedList = await attendanceModel.updateOne(
          { _id: previous._id }, 
          {
            date: req.body.attendanceData.date,
            studentName: req.body.attendanceData.studentName,
            studentId: req.body.attendanceData.studentId,
            facultyName: req.body.attendanceData.facultyName,
            facultyId: req.body.attendanceData.facultyId,
            className: req.body.attendanceData.className,
            status: req.body.attendanceData.status,
          }
        );
        console.log("updated", updatedList);
      }
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

  getAllSubjects: async (req, res) => {
    try {
      const subjects = await subjectModel.find();
      res.json({ success: true, subjects });
    } catch (error) {
      res.json({
        success: false,
        error,
        message: "Failed to display subjects",
      });
    }
  },
 
  saveStudentMark: async (req, res) => {
    try {
      let faculName=req.faculty.name
      let faculid= req.faculty.id
      const { studentId, subjectId, subjectName, marks, grade } = req.body;

      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ success: false, message: "Invalid studentId" });
      }
  
      let previousMark = await markModel.findOne({
        $and: [
          {markingDate: new Date().toLocaleDateString()},
          {student: studentId },
          {subjectName:subjectName},
        ],
      });
  
      if (!previousMark) {
       
        await markModel.create({
          student: studentId,
          subjectId,
          marks,
          markingDate: new Date().toLocaleDateString(),
          grade,
          status: "Uploaded",
          subjectName: subjectName,
          facultyId:faculid,
          facultyName:faculName
        });
        res.status(200).json({ success: true, message: "Mark data saved successfully" });
      } else {
        
        await markModel.updateOne(
          { _id: previousMark._id },
          {
            student: studentId,
            subjectId,
            marks,
            markingDate: new Date().toLocaleDateString(),
            grade,
            status: "Uploaded",
            subjectName: subjectName,
            facultyId:faculid,
            facultyName:faculName
          }
        );
        res.status(200).json({ success: true, message: "Mark data updated successfully" });
      }
    } catch (error) {
      console.error(error);
      res.json({ success: false, error, message: "Server error" });
    }
  },
  
  getClubReq: async (req, res) => {
    try {
      const id = req.faculty.id;
      const request = await clubRequestModel
        .find({ facultyId: id })
        .sort({ _id: -1 });
      res.json({ success: true, request });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error, message: "Server Error" });
    }
  },
  postFacClubReqUpdate: async (req, res) => {
    try {
      await clubRequestModel.updateOne(
        { _id: req.body.id },
        { status: req.body.status }
      );
      console.log("updated status", status);
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, error, message: "Server error" });
    }
  },
  postFacComplain: async (req, res) => {
    try {
      const facultyName = req.faculty.name;
      const facultyId = req.faculty.id;
      const facultyClass = req.faculty.className;
      const currentDate = new Date();
      await complainModel.create({
        title: req.body.title,
        content: req.body.content,
        name: facultyName,
        className: facultyClass,
        date: currentDate.toLocaleDateString(),
        complainterId: facultyId,
        complainPerson: "Faculty",
      });
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, error, message: "Server error" });
    }
  },
  getFacViewNotice:async(req,res)=>{
    try {
      const notice= await noticeModel.find().sort({_id:-1})
     
      res.json({success:true, notice})
    } catch (error) {
      res.json({success:false, error, message:"Server error"})
    }
  }
};
module.exports = facultyController;
