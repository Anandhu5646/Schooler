const jwt = require('jsonwebtoken')
const studentModel = require("../models/studentModel");
const sentOTP = require('../helper/otpVerify')
const bcrypt = require("bcryptjs");
const clubModel = require('../models/clubModel');
const clubRequestModel = require('../models/clubRequestModel');
const complainModel = require('../models/complainModel');
const noticeModel = require('../models/noticeModel');
const attendanceModel = require('../models/attendanceModel');
const markModel = require('../models/markModel');
const timeTableModel = require('../models/timeTableModel');
const paymentModel = require('../models/paymentModel');
const paymentHistoryModel = require('../models/paymentHistoryModel');
require('dotenv')
const stripe = require('stripe')(process.env.STRIP_KEY)


let studentController = {

  getStudProfile: async (req, res) => {
    try {
      return res.status(200).json({ success: true, student: req.student });
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
  sentOtp: async (req, res) => {
    try {
      const { email } = req.body;
      const otp = Math.floor(Math.random() * 1000000);
      const otpToken = jwt.sign({ otp, email }, "jwtsecretkey");
      sentOTP(req.body.email, otp)
      res.json({ otpToken, otp });
      console.log(otp, 'otp')
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error })
    }
  },

  changePassword: async (req, res) => {
    try {
      const { newPassword } = req.body;
      const id = req.student.id;
      console.log(newPassword, 'new pass')
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const updatedStudent = await studentModel.updateOne({ _id: id }, { password: hashedPassword });
      console.log(hashedPassword, 'dfdfdfdfsdsdsd', updatedStudent)
      res.json({ message: 'Password changed successfully', updatedStudent });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error, message: " server error" })
    }
  },
  getStudClubs: async (req, res) => {
    try {
      const clubs = await clubModel.find().sort({ _id: -1 })
      const token = req.cookies.studentToken
      const verifiedJwt = jwt.verify(token, "myjwtsecretkey")
      const student = await studentModel.findById(verifiedJwt.id)


      res.json({ success: true, clubs, student })
    } catch (error) {
      console.log("Something went wrong")
      res.json({ success: false, error, message: "Error occured while fetchig club list" })
    }
  },
  postClubRequest: async (req, res) => {
    try {
      const request = await clubRequestModel.create({
        studentName: req.body.studentName,
        className: req.body.className,
        clubName: req.body.clubName,
        status: req.body.status,
        facultyId: req.body.facultyId,
        facultyName: req.body.facultyName,
        studentId: req.body.studentId,
        clubId: req.body.clubId
      });

      if (request !== null) {
        res.json('Club Request sent successfully...!!');
      } else {
        res.json(false);
      }
    } catch (err) {
      res.json(false);
      console.log(err)
    }
  },
  getSendReqStatus: async (req, res) => {
    try {

      const statuss = await clubRequestModel.find().sort({ _id: -1 })
      res.json({ success: true, statuss })
    } catch (error) {
      res.json({ success: false, error, message: "Server error" })
      console.log(error)
    }

  },
  postStudComplaint: async (req, res) => {
    try {
      const studentId = req.student.id
      const studentName = req.student.name
      const studentClass = req.student.className
      const currentDate = new Date();
      await complainModel.create({
        title: req.body.title,
        content: req.body.content,
        name: studentName,
        complainterId: studentId,
        complainPerson: 'Student',
        className: studentClass,
        date: currentDate.toLocaleDateString()

      })

      res.json({ success: true })
    } catch (error) {
      res.json({ success: false, error, message: "Server error" })
    }
  },
  getStudViewNotice: async (req, res) => {
    try {
      const notice = await noticeModel.find().sort({ _id: -1 })

      res.json({ success: true, notice })
    } catch (error) {
      res.json({ success: false, error, message: "Server error" })
    }
  },
  getStudViewAttendance: async (req, res) => {
    const studentid = req.student.id
    try {
      const attendance = await attendanceModel.find({ studentId: studentid }).sort({ _id: -1 })
      res.json({ success: true, attendance })


    } catch (error) {
      res.json({ success: false, error, message: "Server error" })
    }
  },
  getStudViewMArk: async (req, res) => {
    const studentid = req.student.id;

    try {

      const result = await markModel.find({ student: studentid }).sort({ _id: -1 })
      res.json({ success: true, result });
    } catch (error) {
      res.json({ success: false, error, message: "Server error" });
    }
  },
  viewStudTimetable: async (req, res) => {
    const studClass = req.student.className
    console.log(studClass, 'stdClass')
    try {
      const timetable = await timeTableModel.find({ className: studClass })

      console.log(timetable, 'timetable...............')
      res.json({ success: true, timetable })
    } catch (error) {
      res.json({ success: false, message: "Server error" })
    }
  },
  getStudPayments: async (req, res) => {
    try {
      const payment = await paymentModel.find().sort({ _id: -1 });
      const studentid = req.student.id;
      const history = await paymentHistoryModel.find();


      let arr = []
      if (history) {
        for (let i = 0; i < payment.length; i++) {
          let s = ''
          for (let j = 0; j < history.length; j++) {

            if (payment[i]._id.equals(history[j].paymentId) && history[j].studentId == studentid) {

              s = history[j].status

            }

          }
          let obj = {
            _id: payment[i]._id,
            status: s,
            title: payment[i].title,
            amount: payment[i].amount
          }
          arr.push(obj)

        }
      }

      let updatedArr = [...new Set(arr)]
      console.log(updatedArr, 'uuuuuuuuuu')

      res.json({ success: true, updatedArr })

    } catch (error) {
      res.json({ success: false, message: "Server error" });
    }
  },
  postStudPayment: async (req, res) => {
    const studentid = req.student.id;
    const currentDate = new Date().toLocaleDateString();

    try {
      const { title, amount, id } = req.body;

      let pay = await paymentHistoryModel.create({
        paymentId: id,
        paidDate: currentDate,
        studentId: studentid,
      });

      let amounts = parseInt(amount);
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: title,
              },
              unit_amount: amounts * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.SUCCESS_URL}?id=${pay._id}`,
        cancel_url: `${process.env.FAIL_URL}?id=${pay._id}`,
      });
      res.json({ success: true, url: session.url, id: pay._id });
    } catch (error) {
      res.json({ success: false, error, message: "Server error" });
    }
  },

  getPaymentSuccess: async (req, res) => {
    try {
      const studentid = req.student.id;
      const paymentId = req.query.id;


      let complete = await paymentHistoryModel.updateOne(
        { _id: paymentId },
        { status: true }
      );


      let pending = await paymentHistoryModel.deleteMany({
        status: 'pending',
        studentId: studentid,
      });

      console.log(complete, 'success.........');
      console.log(pending, 'pending');
      res.redirect(process.env.PAYMENT_URL);
    } catch (error) {
      res.redirect(process.env.PAYMENT_URL);
    }
  },
  getPaymentFail: async (req, res) => {
    try {
      const studentid = req.student.id;
      const paymentId = req.query.id;

      let complete = await paymentHistoryModel.updateOne(
        { _id: paymentId },
        { status: false }
      );

      let pending = await paymentHistoryModel.deleteMany({
        status: 'pending',
        studentId: studentid,
      });

      res.redirect(process.env.PAYMENT_URL);
    } catch (error) {
      res.redirect(process.env.PAYMENT_URL);
    }
  }



}
module.exports = studentController