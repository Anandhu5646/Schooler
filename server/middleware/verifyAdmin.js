const jwt = require('jsonwebtoken');

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    if (!token) {
      return res.json({ loggedIn: false, message: "no token" });
    }
    const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
    req.admin = verifiedJWT;
    next();
  } catch (error) {
    console.log(error);
    res.json({ loggedIn: false, error });
  }
};

module.exports = verifyAdmin;
