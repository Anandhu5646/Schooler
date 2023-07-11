const facultyModel = require("../models/facultyModel");
const jwt= require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const sentOTP= require('../helper/otpVerify')


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

      console.log(updatedFaculty, "lllllllllllllllll");
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
      res.json({ message: "Password changed successfully", updatedFaculty});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error, message: " server error" });
    }
  },
};
module.exports = facultyController;
