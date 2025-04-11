const jwt = require("../lib/jwt");

const UNAUTHORIZED = (res) => {
  return res.status(401).json({ message: "Unauthorized" })
}

const isAuthenticated = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return UNAUTHORIZED(res);
  }

  tokenSplit = token.split(" ");
  if (tokenSplit.length !== 2 || tokenSplit[0] !== "Bearer") {
    return UNAUTHORIZED(res);
  }

  token = tokenSplit[1];
  try {
    const decoded = jwt.verifyToken(token);
    if (!decoded) {
      return UNAUTHORIZED(res);;
    }
    req.user = decoded;
    next();
  } catch (error) {
    return UNAUTHORIZED(res);
  }
};

module.exports = { isAuthenticated };
