const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type:String,
    required:true
  },
  studentName: {
    type:String,
    required:true
  },
  date: {
    type: String,
    
  },
  status: {
    type: String,
    required: true,  
  },
  facultyName:{
    type:String,

  },
  facultyId:{
    type:String
  }
});

const attendanceModel = mongoose.model("Attendance", attendanceSchema);

module.exports = attendanceModel;
