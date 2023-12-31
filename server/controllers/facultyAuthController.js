const facultyModel = require("../models/facultyModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var salt = bcrypt.genSaltSync(10);

let facultyAuthController = {
  postFacLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const faculty = await facultyModel.findOne({ email });

      if (!faculty) {
        return res.json({ error: true, message1: "You have no faculty access" });
      }

      const isPasswordMatch = await bcrypt.compare(password, faculty.password);
      if (!isPasswordMatch) {
        return res.json({ error: true, message2: "Wrong password" });
      }
      const token = jwt.sign({ id: faculty._id }, process.env.JWT_KEY);

      return res
        .cookie("facultyToken", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: true,
          sameSite: "none",
        })
        .json({ error: false });
    } catch (error) {
      res.status(500).json({ error: error, message: "Server error" });
      console.log(error);
    }
  },

  postFacLogout: async (req, res) => {
    const token = req.cookies.facultyToken;
    res
      .cookie("facultyToken", token, {
        httpOnly: "true",
        expires: new Date(0),
        secure: "true",
        sameSite: "none",
      })
      .status(200)
      .json({ success: true, message: "logged out", error: false });
  },
  checkFacLoggedIn: async (req, res) => {
    try {
      const token = req.cookies.facultyToken;
      if (!token) {
        return res.json({ loggedIn: false, message: "no token" });
      }
      const verifiedJwt = jwt.verify(token, process.env.JWT_KEY);
      const faculty = await facultyModel.findById(verifiedJwt.id);
      if (!faculty) {
        return res.json({ loggedIn: false });
      }
      return res.status(200).json({ faculty, loggedIn: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ loggedIn: false, error, message: "server error" });
    }
  },
};
module.exports = facultyAuthController;
