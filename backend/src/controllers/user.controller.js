import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// Generate tokens
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");

    }

}
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
                // { username: username.toLowerCase() },
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



const loginUser = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    if (!email && !password) {
        throw new ApiError(400, "Email and password are required");
    }
    const user = await User.findOne({
        $or: [
            { email: email.toLowerCase() },
            // { username: username.toLowerCase() }
        ]
    });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(new ApiResponse(200, {
            user: loggedInUser,
            accessToken,
            refreshToken,
            message: "Logged in successfully"
        }
        ));
})


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req?.user?._id,
        {
            $set:
                { refreshToken: undefined }
        },
        { new: true });

    return res.status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new ApiResponse(200, "Logged out successfully"))
        .json(new ApiResponse(200, "Logged out successfully"));
})

export { registerUser, loginUser, logoutUser };