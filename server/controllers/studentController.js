
const studentModel = require("../models/studentModel");

let studentController={

  getStudProfile: async (req, res) => {
    try {
      return res.status(200).json({ success: true, student:req.student });
    } catch (error) {
        console.log(error)
      res.status(500).json({ success: false, error, message: "Server error" });
    }
  }
  
      
}

module.exports= studentController