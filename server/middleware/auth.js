import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ success: false, message: "not authorized" });
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "not authorized" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userid || decoded._id || decoded.id;
    
    if (!userId) {
      return res.json({ success: false, message: "not authorized" });
    }
    
    req.user = await User.findById(userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
