const jwt = require("jsonwebtoken");
const BlacklistedToken = require("./../models/BlacklistedToken");
const User = require("./../models/User");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access token not found" });
    }

    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Access token is no longer valid!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Email is not registered" });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = auth;
