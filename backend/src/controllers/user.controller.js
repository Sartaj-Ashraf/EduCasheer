import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// Validate user inputs 
const validateUserInput = (fullName, username, email, password) => {
    if ([fullName, username, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "Please fill in the required fields");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    if (password.length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long");
    }
};

// Handle file upload for registering User eg avatar and cover photo
const handleFileUpload = async (files) => {
    const avatarLocalPath = files?.avatar?.[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    let coverImageLocalPath;
    if (files?.coverImage?.[0]?.path) {
        coverImageLocalPath = files.coverImage[0].path;
    }

    const [avatar, coverImage] = await Promise.all([
        uploadOnCloudinary(avatarLocalPath),
        coverImageLocalPath ? uploadOnCloudinary(coverImageLocalPath) : null
    ]);

    if (!avatar) {
        throw new ApiError(400, "Error uploading avatar");
    }

    return { avatar, coverImage };
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;

    try {
        // Validate user input
        validateUserInput(fullName, username, email, password);

        // Check for existing user
        const existingUser = await User.findOne({
            $or: [
                { username: username.toLowerCase() },
                { email: email.toLowerCase() }
            ]
        });

        if (existingUser) {
            throw new ApiError(
                409,
                `User with ${existingUser.email === email ? 'email' : 'username'} already exists`
            );
        }

        // Handle file uploads
        const { avatar, coverImage } = await handleFileUpload(req.files);

        // Create user
        const user = await User.create({
            email: email.toLowerCase(),
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            password,
            username: username.toLowerCase()
        });

        // Fetch user without sensitive fields
        const createdUser = await User.findById(user._id)
            .select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(500, "Error creating user account");
        }

        return res.status(201).json(
            new ApiResponse(201, createdUser, "User registered successfully")
        );
    } catch (error) {
        // Clean up uploaded files if registration fails
        // Note: Implement cleanupFiles utility if needed
        throw error;
    }
});

export { registerUser };