import React, { useState } from "react";
import {
  Link,
  Form,
  useActionData,
  useNavigation,
  redirect,
} from "react-router-dom";
import { FaUserGraduate, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";
import { registerImage } from "../../assets/images";
import { customFetch } from "../../utils/customFetch";

// Constants for validation
const VALIDATION_RULES = {
  MIN_USERNAME_LENGTH: 5,
  MIN_PASSWORD_LENGTH: 8,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MAX_FILE_SIZE: 1024 * 1024, // 1MB
  ALLOWED_FILE_TYPES: ["image/jpeg", "image/png", "image/webp"],
};

// Input field configurations
const INPUT_FIELDS = [
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    icon: FaUserGraduate,
  },
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "johndoe",
    icon: FaUserGraduate,
    minLength: VALIDATION_RULES.MIN_USERNAME_LENGTH,
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    icon: FaEnvelope,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    icon: FaLock,
    minLength: VALIDATION_RULES.MIN_PASSWORD_LENGTH,
  },
];

// Validation function
const validateForm = (formData, avatar) => {
  const errors = {};
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const fullName = formData.get("fullName");

  if (!fullName?.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!username || username.length < VALIDATION_RULES.MIN_USERNAME_LENGTH) {
    errors.username = `Username should be at least ${VALIDATION_RULES.MIN_USERNAME_LENGTH} characters long`;
  }

  if (!email || !VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    errors.email = "Valid email is required";
  }

  if (!password || password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters long`;
  }

  if (avatar) {
    if (!VALIDATION_RULES.ALLOWED_FILE_TYPES.includes(avatar.type)) {
      errors.avatar = "Please upload a valid image file (JPEG, PNG, or WebP)";
    } else if (avatar.size > VALIDATION_RULES.MAX_FILE_SIZE) {
      errors.avatar = "File size should be less than 1MB";
    }
  }

  return Object.keys(errors).length ? errors : null;
};

// Form input component
const FormInput = ({ field, error }) => (
  <div>
    <label
      htmlFor={field.id}
      className="block text-sm font-medium text-[var(--grey-700)]"
    >
      {field.label}
    </label>
    <div className="mt-1 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <field.icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={field.type}
        id={field.id}
        name={field.id}
        className={`pl-10 block w-full border ${
          error ? "border-red-500" : "border-[var(--grey-300)]"
        } rounded-lg py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
        placeholder={field.placeholder}
        minLength={field.minLength}
        required
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Avatar Upload Component
const AvatarUpload = ({ previewUrl, error, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-[var(--grey-700)]">
      Profile Picture
    </label>
    <div className="flex items-center space-x-4">
      <div className="relative w-20 h-20">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Avatar preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaCamera className="h-8 w-8 text-gray-400" />
          )}
        </div>
        <label
          htmlFor="avatar"
          className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition-colors"
        >
          <FaCamera className="h-4 w-4 text-white" />
          <input
            type="file"
            id="avatar"
            name="avatar"
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={onChange}
          />
        </label>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">Upload a profile picture</p>
        <p className="text-xs text-gray-400">JPEG, PNG, or WebP (max. 1MB)</p>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  </div>
);

// Action function for form submission
export async function registerAction({ request }) {
  const formData = await request.formData();
  const avatarFile = formData.get("avatar");

  const errors = validateForm(formData, avatarFile);

  if (errors) {
    return { errors };
  }

  try {
    // Create a new FormData instance for the API call
    const apiFormData = new FormData();
    apiFormData.append("fullName", formData.get("fullName"));
    apiFormData.append("username", formData.get("username"));
    apiFormData.append("email", formData.get("email"));
    apiFormData.append("password", formData.get("password"));
    if (avatarFile && avatarFile.size > 0) {
      apiFormData.append("avatar", avatarFile);
    }

    await customFetch.post("/users/register", apiFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Registration successful!");
    return redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);

    if (error.response?.status === 409) {
      return {
        errors: {
          submit: "Username or email already exists",
        },
      };
    }

    return {
      errors: {
        submit: "Registration failed. Please try again later.",
      },
    };
  }
}

const Register = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!VALIDATION_RULES.ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error("Please upload a valid image file");
        return;
      }
      if (file.size > VALIDATION_RULES.MAX_FILE_SIZE) {
        toast.error("File size should be less than 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left side - Image and Text */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 p-12 flex-col justify-center">
        <div className="space-y-2 text-center mt-16">
          <h1 className="text-4xl font-bold text-[var(--grey-900)]">
            Begin Your Learning{" "}
            <span className="text-[var(--primary)]">Journey</span>
          </h1>
          <p className="text-[var(--grey-600)] text-lg">
            Join our community of learners and unlock your potential
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={registerImage}
            alt="Learning Illustration"
            className="rounded-xl w-[90%] h-[90%] object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--primary)]">
              Create Account
            </h2>
            <p className="mt-2 text-[var(--grey-400)]">
              Start your educational journey today
            </p>
          </div>

          <Form
            method="post"
            className="mt-8 space-y-6"
            encType="multipart/form-data"
          >
            <AvatarUpload
              previewUrl={avatarPreview}
              error={actionData?.errors?.avatar}
              onChange={handleAvatarChange}
            />

            <div className="space-y-4">
              {INPUT_FIELDS.map((field) => (
                <FormInput
                  key={field.id}
                  field={field}
                  error={actionData?.errors?.[field.id]}
                />
              ))}
            </div>

            {actionData?.errors?.submit && (
              <p className="text-red-500 text-center">
                {actionData.errors.submit}
              </p>
            )}

            <button
              type="submit"
              className="w-full btn-outline disabled:opacity-50 transition-opacity duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-[var(--grey-600)]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
