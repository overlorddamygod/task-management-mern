const jwt = require("../lib/jwt");

const isAuthenticated = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  tokenSplit = token.split(" ")
  if (tokenSplit.length !== 2 || tokenSplit[0] !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  token = tokenSplit[1];
  const decoded = jwt.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  req.user = decoded;
  next()
};

module.exports = { isAuthenticated };