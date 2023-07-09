
const studentModel = require("../models/studentModel");

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
  
      console.log(updatedStudent, 'lllllllllllllllll');
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
      
      res.json({ otpToken ,success:true });
    } catch (error) {
      console.log(error);
      res.status(500).json({success:false,error})
    }
  },
  verifyOtp:async(req,res)=>{
    try {
      const { otp, otpToken } = req.body;

    // Verify the JWT and extract the OTP and email
    const { otp: jwtOTP, email } = jwt.verify(otpToken, "jwtsecretkey");

    // Compare the user-typed OTP with the OTP from the JWT
    if (otp === jwtOTP) {
      // OTP is correct
      res.json({ success: true, email });
    } else {
      // OTP is incorrect
      res.json({ success: false });
    }
    } catch (error) {
      console.log(error);
    }
  }
    
}

module.exports= studentController