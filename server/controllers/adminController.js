const adminModel = require("../models/adminModel");
const classModel = require("../models/classModel");
const clubModel = require("../models/clubModel");
const facultyModel = require("../models/facultyModel");
const noticeModel = require("../models/noticeModel");
const studentModel = require("../models/studentModel");
const subjectModel = require("../models/subjectModel");
const bcrypt = require("bcryptjs");

let salt = bcrypt.genSaltSync(10);

let adminController = {
  postAdminAddStudent: async (req, res) => {
    try {
      let {
        name,
        motherName,
        fatherName,
        dob,
        age,
        gender,
        className,
        admYear,
        email,
        password,
        mobile,
        rollNo,
        address,
      } = req.body;
      let hashPassword = bcrypt.hashSync(password, salt);
      let student = new studentModel({
        name,
        motherName,
        fatherName,
        email,
        password: hashPassword,
        dob,
        age,
        gender,
        className,
        admYear,
        rollNo,
        address,
        mobile,
      });
      await student.save();
      res
        .status(201)
        .json({ success: true, message: "Student registered successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Failed to register" });
    }
  },

  postAdminAddFaculty: async (req, res) => {
    try {
      let {
        name,
        dob,
        age,
        gender,
        joiningYear,
        teachingArea,
        email,
        password,
        qualification,
        mobile,
        address,
        className,
        employeeId,
      } = req.body;
      let hashPassword = bcrypt.hashSync(password, salt);
      let faculty = new facultyModel({
        name,
        dob,
        age,
        gender,
        joiningYear,
        teachingArea,
        mobile,
        email,
        password: hashPassword,
        qualification,
        address,
        className,
        employeeId,
      });
      await faculty.save();
      res
        .status(201)
        .json({ success: true, message: "Faculty registration successful" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Failed to register" });
    }
  },

  postAdminAddSubject: async (req, res) => {
    try {
      let { subName, subCode, subClass, subCredit } = req.body;
      let subject = new subjectModel({
        subName,
        subCode,
        subClass,
        subCredit,
      });
      await subject.save();
      res
        .status(201)
        .json({ success: true, message: "Subject registration successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Failed to register" });
    }
  },

  postAdminAddClass: async (req, res) => {
    try {
      let { className } = req.body;
      let classNam = new classModel({
        className,
      });
      await classNam.save();
      res
        .status(201)
        .json({ success: true, message: "Class registration successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Failed to register" });
    }
  },
  postAdminAddNotice: async (req, res) => {
    try {
      let { title, content, date } = req.body;

      await new noticeModel({
        title,
        content,
        date,
      }).save();
      res
        .status(201)
        .json({ success: true, message: "Notice created successfully" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to create notice" });
    }
  },
  postAdminAddClub: async (req, res) => {
    try {
      let { name, description, facultyName, date } = req.body;
      let club = new clubModel({
        name,
        description,
        facultyName,
        date,
      });
      await club.save();
      res
        .status(201)
        .json({ success: true, message: "Club registration successful" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to create club" });
    }
  },
  getAdminStudents: async (req, res) => {
    try {
      let students = await studentModel.find();
      res.json({ success: true, err: false, students });
      console.log(students);
    } catch (error) {
      console.log(error);
      res.json({ err: true, error, message: "something went wrong" });
    }
  },
  getAdminFaculties: async (req, res) => {
    try {
      const faculties = await facultyModel.find();
      res.json({ success: true, err: false, faculties });
      console.log(faculties);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ err: true, error, message: "Something went wrong" });
    }
  },

  getAdminSubjects: async (req, res) => {
    try {
      let subjects = await subjectModel.find();
      res.json({ success: true, err: false, subjects });
    } catch (error) {
      console.log(error);
      res.json({ err: true, error, message: "something went wrong" });
    }
  },
  getAdminClasses: async (req, res) => {
    try {
      let classes = await classModel.find();
      res.json({ success: true, err: false, classes });
    } catch (error) {
      console.log(error);
      res.json({ err: true, error, message: "something went wrong" });
    }
  },
  getAdminNotices: async (req, res) => {
    try {
      let notices = await noticeModel
        .find({
          _id: req.body._id,
        })
        .lean();
      res.json({ err: false, notices });
    } catch (error) {
      console.log(error);
      res.json({ err: true, error, message: "something went wrong" });
    }
  },
  getAdminClubs: async (req, res) => {
    try {
      let clubs = await clubModel.find();
      res.json({ success: true, err: false, clubs });
    } catch (error) {
      console.log(error);
      res.json({ err: true, error, message: "something went wrong" });
    }
  },
  editAdminStudent: async (req, res) => {
    try {
      let id=req.params.id
      let {
        name,
        motherName,
        fatherName,
        dob,
        age,
        gender,
        className,
        admYear,
        email,
        password,
        mobile,
        rollNo,
        address,
        
      } = req.body;
      console.log(id);
      
      await studentModel.findByIdAndUpdate(id, {
        $set: {
            name,
            motherName,
            fatherName,
            dob,
            age,
            gender,
            className,
            admYear,
            email,
            password,
            mobile,
            rollNo,
            address,
        },
      });
       res.status(200).json({ error: false ,success:true, message:"edited successfully"});
    } catch (error) {
      res.status(500).json({ success: false, message: "server error", error });
      console.log(error);
    }
  },
  
};

module.exports = adminController;
