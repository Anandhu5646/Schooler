const mongoose= require("mongoose")

const timeTableSchema= new mongoose.Schema({
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true,
      },
      subject: {
        type:String,
        required: true,
      },
      faculty: {
        type: String,
        required: true,
      },
      subjectId: {
        type:String,
        
      },
      facultyId: {
        type: String,
        
      },
      timeSlot: {
        type: String,
        enum: ['9 AM - 10 AM', '10 AM - 11 AM', '11 AM - 12 PM', '1 PM - 2 PM', '2 PM - 3 PM', '3 PM - 4 PM'],
        required: true,
      },
})

const timeTableModel= mongoose.model("timeTable",timeTableSchema)

module.exports= timeTableModel;