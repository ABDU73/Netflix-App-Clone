import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  if (!ENV_VARS.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // Log the environment to check if it's set correctly
  console.log("Current NODE_ENV:", ENV_VARS.NODE_ENV);
  
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  // Log the token creation for debugging purposes (avoid logging token in production)
  console.log("Generated Token:", token);

  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // prevent XSS (cross-site scripting attacks)
    sameSite: "strict", // prevent CSRF (cross-site request forgery attacks)
    secure: ENV_VARS.NODE_ENV !== "development", // Only true in production
  });

  return token;
};
