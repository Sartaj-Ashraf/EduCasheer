import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from frontend
    // Validation
    // Check if user already exists'
    // Check for avatar, image
    // Upload them to cloudiary, avatar
    // Create user object- create entry in db
    // Remove password from user object before sending to FE
    // Check for user creation 
    // Return success response
    const { fullName, username, email, password, avatar } = req.body





})
export { registerUser }