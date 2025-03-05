const jwt = require("jwt-simple");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("token" ,token , process.env.JWT_SECRET);
  
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    console.log("value of decode" ,decoded);
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
