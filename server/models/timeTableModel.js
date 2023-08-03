const mongoose= require("mongoose")

const timeTableSchema= new mongoose.Schema({
   
    
      facultyName: {
        type: String,
        required: true,
      },
      facultyId: {
        type: String,
        
      },
      title: {
        type:String,
        required:true
      },
      content: {
        type:String,
        required:true
      },
      date:{
        type:String,

      },
      className:{
        type:String,
        required:true
      }
      
})

const timeTableModel= mongoose.model("timeTable",timeTableSchema)

module.exports= timeTableModel;