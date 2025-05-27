import { User } from "../models/user.model.js";

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only route.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to authenticate admin",
    });
  }
};

export default isAdmin;
