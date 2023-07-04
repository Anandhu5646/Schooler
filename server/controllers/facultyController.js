const facultyModel = require("../models/facultyModel")

let facultyController={

    getFacProfile: async (req, res) => {
        try {
        //   const { _id } = req.params;
          const faculty = await facultyModel.findOne();
          return res.status(200).json({ success: true, faculty });
        } catch (error) {
          res.status(500).json({ success: false, error, message: "Server error" });
        }
      }
      
}

module.exports= facultyController