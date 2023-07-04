const jwt = require('jsonwebtoken');

const verifyFaculty = async (req, res, next) => {
  try {
    const token = req.cookies.facultyToken;
    if (!token) {
      return res.json({ loggedIn: false, message: "no token" });
    }
    const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
    next();
  } catch (error) {
    console.log(error);
    res.json({ loggedIn: false, error });
  }
};

module.exports = verifyFaculty 
