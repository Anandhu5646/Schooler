
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
  postStudEditProfile:async(req,res)=>{
    const { id, name, email, mobile, dob, admYear, fatherName, motherName, address, rollNo, gender, age, className } = req.body;

    try {
      const updatedStudent = await studentModel.findByIdAndUpdate(id, {
        name,
        email,
        mobile,
        dob,
        admYear,
        fatherName,
        motherName,
        address,
        rollNo,
        gender,
        age,
        className,
        pic: req.file
      });
  
      return res.json({ success: true, message: 'Student profile updated successfully', student: updatedStudent });
    } catch (error) {
      console.error('Error updating student profile:', error);
      return res.json({ success: false, message: 'Failed to update student profile' });
    }
  
  }   
}

module.exports= studentController