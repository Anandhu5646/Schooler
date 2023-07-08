
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
    try {
      await studentModel.findByIdAndUpdate(req.student.id,{
        $set:{
            pic:req.file.filename
        }
    })
    return res.json({error: false})
    } catch (error) {
      res.json({error: true,message:"Something went wrong"}) 
      console.log(error)
    }
  }
  
      
}

module.exports= studentController