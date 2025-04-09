import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const secret = process.env.SECRET_KEY;

  if (!secret) {
    console.error("❌ SECRET_KEY is not defined in .env file");
    return res.status(500).json({ success: false, message: "Internal server error" });
  }

  const token = jwt.sign({ userId: user._id }, secret, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,             // Required for cross-site cookies
    sameSite: "none",         // Allows cross-site
    maxAge: 24 * 60 * 60 * 1000
  })
  
    .json({
      success: true,
      message,
      user,
    });
};
