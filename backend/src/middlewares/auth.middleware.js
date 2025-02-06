import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
export const varifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid user request");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Unauthorized user request");
  }
});

// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   console.log("Headers received:", req.headers); // Log headers
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     console.log("No token provided");
//     return res.status(401).json({ message: "" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); // Log decoded token data
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.log("Token verification failed:", error.message);
//     return res
//       .status(403)
//       .json({ message: "Invalid token", error: error.message });
//   }
// };

// module.exports = authMiddleware;
