const facultyModel = require("../models/facultyModel")

let facultyController={

  getFacProfile: async (req, res) => {
    try {
      const facultyList = await facultyModel.findOne({});
      console.log(facultyList);
      return res.status(200).json({ success: true, facultyList });
    } catch (error) {
      res.status(500).json({ success: false, error, message: "Server error" });
    }
  }
  
      
}

module.exports= facultyController