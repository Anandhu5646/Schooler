const adminModel = require("../models/adminModel");
const classModel = require("../models/classModel");
const clubModel = require("../models/clubModel");
const complainModel = require("../models/complainModel");
const facultyModel = require("../models/facultyModel");
const noticeModel = require("../models/noticeModel");
const paymentHistoryModel = require("../models/paymentHistoryModel");
const paymentModel = require("../models/paymentModel");
const studentModel = require("../models/studentModel");
const subjectModel = require("../models/subjectModel");
const bcrypt = require("bcryptjs");
const cloudinary = require("../helper/cloudinary");
const { Pagination } = require("../helper/pagination");
const facEmail = require("../helper/facEmail");
const studEmail = require("../helper/studEmail");

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
      studEmail(req.body.email,req.body.password)
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
      });
      await faculty.save();
      
      
      facEmail(req.body.email,req.body.password)
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
      let { subName, subCode, subCredit } = req.body;
      let subject = new subjectModel({
        subName,
        subCode,
        // subClass,
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
      const existingClass = await classModel.findOne({ className });

      if (existingClass) {
        return res.json({ success: false, message: "Class already exists" });
      }
      let classNam = new classModel({
        className,
      });
      await classNam.save();
      res
        .status(201)
        .json({ success: true, message: "Class registration successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, messag: "Failed to register" });
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
      let { name, description, facultyId, facultyName, date } = req.body;
      let club = new clubModel({
        name,
        description,
        facultyId,
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
      let page = req.query.currentPage || 1;
      let limit = page * 5;
      let skip = (page - 1) * 5;

      let total = await studentModel.countDocuments();
      total = Math.ceil(total / 5);

      let key = "";
      if (req.query.search) {
        key = req.query.search
          .replace(/[^a-zA-Z]/g, "")
          .replace(/[^a-zA-Z]/g, "");
      }
      let students = await studentModel
        .find({ name: new RegExp(key, "i") })
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });

      res.json({ success: true, err: false, students, total });
    } catch (error) {
      console.log(error);
      res.json({ err: true, error, message: "something went wrong" });
    }
  },
  getAdminFaculties: async (req, res) => {
    try {
      let page = req.query.currentPage || 1;
      let limit = page * 5;
      let skip = (page - 1) * 5;
      let total = await facultyModel.countDocuments();
      total = Math.ceil(total / 5);

      let key = "";
      if (req.query.search) {
        key = req.query.search
          .replace(/[^a-zA-Z]/g, "")
          .replace(/[^a-zA-Z]/g, "");
      }

      const faculties = await facultyModel
        .find({ name: new RegExp(key, "i") })
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });

      res.json({ success: true, err: false, faculties, total });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ err: true, error, message: "Something went wrong" });
    }
  },

  getAdminSubjects: async (req, res) => {
    try {
      let { total, skip, limit } = await Pagination(
        req.query.currentPage,
        subjectModel
      );
      let key = "";
      if (req.query.search) {
        key = req.query.search.replace(/[^a-zA-Z]/g, "");
      }
      let subjects = await subjectModel
        .find({ subName: new RegExp(key, "i") })
        .limit(limit)
        .skip(skip)
        .sort({ _id: -1 });
      res.json({ success: true, err: false, subjects, total });
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
      let key = "";
      if (req.query.search) {
        key = req.query.search.replace(/[^a-zA-Z]/g, "");
      }

      let page = req.query.currentPage || 1;
      let limit = page * 3;
      let skip = (page - 1) * 3;
      let total = await clubModel.countDocuments();
      total = Math.ceil(total / 3);

      let clubs = await clubModel
        .find({ name: new RegExp(key, "i") })
        .limit(limit)
        .skip(skip)
        .sort({ _id: -1 });
      res.json({ success: true, err: false, clubs, total });
    } catch (error) {
      console.log(error);
      res.json({ err: true, error, message: "something went wrong" });
    }
  },
  editAdminStudent: async (req, res) => {
    try {
      let id = req.params.id;
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
      res
        .status(200)
        .json({ error: false, success: true, message: "edited successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "server error", error });
      console.log(error);
    }
  },
  deleteFaculty: async (req, res) => {
    try {
      const { id } = req.params;
      await facultyModel.findByIdAndDelete({ _id: id });
      return res
        .status(200)
        .json({ error: false, success: true, message: "deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: true, success: false, message: "Something went wrong" });
      console.log(error);
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const { id } = req.body;
      await studentModel.findByIdAndDelete({ _id: id });
      return res
        .status(200)
        .json({ error: false, success: true, message: "deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: true, success: false, message: "Something went wrong" });
      console.log(error);
    }
  },
  deleteComplain: async (req, res) => {
    try {
      const { id } = req.params;
      await complainModel.findByIdAndDelete({ _id: id });
      return res
        .status(200)
        .json({ error: false, success: true, message: "deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: true, success: false, message: "Something went wrong" });
      console.log(error);
    }
  },
  deleteSubject: async (req, res) => {
    try {
      const { id } = req.body;
      await subjectModel.findByIdAndDelete({ _id: id });
      return res
        .status(200)
        .json({ error: false, success: true, message: "deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: true, success: false, message: "Something went wrong" });
      console.log(error);
    }
  },
  deleteClubs: async (req, res) => {
    try {
      const { id } = req.params;
      await clubModel.findByIdAndDelete({ _id: id });
      return res
       
        .json({ error: false, success: true, message: "deleted successfully" });
    } catch (error) {
      res
       
        .json({ error: true, success: false, message: "Something went wrong" });
      console.log(error);
    }
  },
  deleteNotices: async (req, res) => {
    try {
      const { id } = req.params;
      await noticeModel.findByIdAndDelete({ _id: id });
      return res.json({
        error: false,
        success: true,
        message: "deleted successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: true, success: false, message: "Something went wrong" });
      console.log(error);
    }
  },
  adminDeleteClass:async(req,res)=>{
    try {
      const { id } = req.params;
      await classModel.findByIdAndDelete({ _id: id });
      return res.json({
        error: false,
        success: true,
        message: "deleted successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: true, success: false, message: "Something went wrong" });
      console.log(error);
    }
  },
  postEditAdminFaculty: async (req, res) => {
    try {
      let id = req.params.id;
      const faculty = await facultyModel.findById({ _id: id });
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

      const updatedFaculty = await faculty.save();

      console.log(updatedFaculty, "lllllllllllllllll");
      return res.json({
        success: true,
        message: "faculty details updated successfully",
        faculty: updatedFaculty,
      });
    } catch (error) {
      res.json({ success: false, message: "server error", error });
      console.log(error);
    }
  },

  getClubFaculties: async (req, res) => {
    try {
      const faculty = await facultyModel.find();

      if (!faculty) {
        res.status(404).json({ error: "Faculty not found" });
      } else {
        res.json(faculty);
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ err: true, error, message: "Something went wrong" });
    }
  },

  dashBoard: async (req, res) => {
    try {
      let totalStudents = await studentModel.count();
      let totalFaculties = await facultyModel.count();
      let totalClubs = await clubModel.count();
      res.json({
        success: true,
        student: totalStudents,
        faculty: totalFaculties,
        club: totalClubs,
      });
    } catch (error) {
      res.json({ success: false, error, message: "Server error" });
    }
  },
  getAllcomplaints: async (req, res) => {
    try {
      let key = "";
      if (req.query.search) {
        key = req.query.search.replace(/[^a-zA-Z]/g, "");
      }
      let { total, limit, skip } = await Pagination(
        req.query.currentPage,
        complainModel
      );
      let complaints = await complainModel
        .find({ title: new RegExp(key, "i") })
        .limit(limit)
        .skip(skip)
        .sort({ _id: -1 });
      res.json({ success: true, complaints, total });
    } catch (error) {
      res.json({ success: false, error, message: "Server error" });
      console.log(error);
    }
  },
  getUpdateStudent: async (req, res) => {
    try {
      let id = req.query.id;
      if (id == undefined) {
        res.json({
          name: "",
          email: "",
          mobile: "",
          dob: "",
          admYear: "",
          fatherName: "",
          motherName: "",
          address: "",
          className: "",
          gender: "",
          rollNo: "",
          age: "",
        });
        return;
      }
      let student = await studentModel.findOne({ _id: id });
      res.json({ success: true, student });
    } catch (error) {
      res.json({ success: false, error, message: "Server error" });
    }
  },
  getUpdateFaculty: async (req, res) => {
    try {
      let id = req.query.id;
      if (id == undefined) {
        res.json({
          name: "",
          email: "",
          mobile: "",
          dob: "",
          joiningYear: "",
          qualification: "",
          teachingArea: "",
          address: "",
          className: "",
          gender: "",
          age: "",
        });
        return;
      }
      let faculty = await facultyModel.findOne({ _id: id });
      res.json({ success: true, faculty });
    } catch (error) {
      res.json({ success: false, error, message: "Server error" });
    }
  },
  postAdminUpdateStudent: async (req, res) => {
    try {
      const id = req.body.id;
      const updateStudent = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob,
        admYear: req.body.admYear,
        address: req.body.address,
        fatherName: req.body.fatherName,
        gender: req.body.gender,
        motherName: req.body.motherName,
        rollNo: req.body.rollNo,
        className: req.body.className,
        age: req.body.age,
      };
      await studentModel.updateOne({ _id: id }, updateStudent);

      res.json({ success: true, message: "Sutdent details updated" });

      console.log("updated succesfully");
    } catch (error) {
      console.log("server error");
    }
  },
  postAdminUpdateFaculty: async (req, res) => {
    try {
      const id = req.body.id;
      console.log(req.body, "eeeeeeeee");
      const updateFaculty = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob,
        joiningYear: req.body.joiningYear,
        address: req.body.address,
        teachingArea: req.body.teachingArea,
        gender: req.body.gender,
        qualification: req.body.qualification,
        className: req.body.className,
        age: req.body.age,
      };
      await facultyModel.updateOne({ _id: id }, updateFaculty);
      res.json({ success: true, message: "Faculty details updated" });
    } catch (error) {
      console.log("server error");
    }
  },
  postUploadNotice: async (req, res) => {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.json({
          success: false,
          message: "Please fill in all the fields.",
        });
      }
      const cloudinaryUploadResponse = await cloudinary.uploader.upload(
        content,
        {
          folder: "notices",
        }
      );
      const pdfUrl = cloudinaryUploadResponse.secure_url;
      await noticeModel.create({
        title,
        content: pdfUrl,
        date: new Date().toLocaleDateString(),
      });
      res.json({ success: true, message: "Successfully created notice" });
    } catch (error) {
      res.json({ success: false, error, message: "Server down" });
    }
  },
  postPaymentMsgToStud: async (req, res) => {
    try {
      const { title, amount, lastDate } = req.body.paymentData;
      let currentDate = new Date().toLocaleDateString();
      let payment = new paymentModel({
        title,
        amount,
        currentDate,
        lastDate,
      });
      await payment.save();
      res.json({
        success: true,
        message: "Payment Message send successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({ error, success: false, message: "Server error" });
    }
  },
  getPaymentList: async (req, res) => {
    try {
      let key = "";
      if (req.query.search) {
        key = req.query.search
          .replace(/[^a-zA-Z]/g, "")
         
      }
      let { total, limit, skip } = await Pagination(
        req.query.currentPage,
        paymentModel
      );

      const payment = await paymentModel
        .find({ title: new RegExp(key, "i") })
        .limit(limit)
        .skip(skip)
        .sort({ _id: -1 });
      res.json({ payment, success: true, total });
    } catch (error) {
      res.json({ success: false, error, message: "Server error" });
    }
  },
  deletePaymentList: async (req, res) => {
    try {
      const { id } = req.params;
      await paymentModel.findByIdAndDelete({ _id: id });
      return res.json({ success: true, message: "deleted successfully" });
    } catch (error) {
      res.json({ success: false, message: "Something went wrong" });
      console.log(error);
    }
  },
  getPaymentHistory: async (req, res) => {
    try {
    
      const history = await paymentHistoryModel
        .find({ status: true  })
        .populate("studentId")
        .populate("paymentId")
        .sort({ _id: -1 });
      res.json({ success: true, history });
    } catch (error) {
      res.json({ success: false, error, message: "Server error" });
    }
  },
  viewNotices: async (req, res) => {
    try {
      let key = "";
      if (req.query.search) {
        key = req.query.search.replace(/[^a-zA-Z]/g, "");
      }
      let page = req.query.currentPage || 1;
      let limit = page * 3;
      let skip = (page - 1) * 3;
      let total = await noticeModel.countDocuments();
      total = Math.ceil(total / 3);

      const notice = await noticeModel
        .find({ title: new RegExp(key, "i") })
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });

      res.json({ success: true, notice, total });
    } catch (error) {
      res.json({ success: false, error, message: "Server error" });
    }
  },
};

module.exports = adminController;
