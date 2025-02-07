import React, { useState } from "react";
import {
  Link,
  Form,
  useActionData,
  useNavigation,
  redirect,
  useNavigate,
} from "react-router-dom";
import { FaUserGraduate, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";
import { registerImage } from "../../assets/images";
import { customFetch } from "../../utils/customFetch";
import { useUser } from "../../context/userContext";

export const registerAction = async ({ request }) => {
  const result = await request.formData();
  const user = Object.fromEntries(result);
  try {
    const response = await customFetch.post("/users/register", user);
    if (response.status === 201) {
      toast.success("Please check your email for verification");
    }
    return { success: response.data.msg };
  } catch (error) {
    // console.log({ error })
    return { error: error?.response?.data?.error || "An error occurred during registration." };
  }
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
  },
];
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
        className={`pl-10 block w-full border ${error ? "border-red-500" : "border-[var(--grey-300)]"
          } rounded-lg py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
        placeholder={field.placeholder}
        minLength={field.minLength}

      />
    </div>
  </div>
);

const Register = () => {
  const data = useActionData();
  console.log({ data })
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);
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
          >
            <p className="text-red-400 text-center">
              {data?.error && data.error.split(",")[0]}
            </p>
            <div className="space-y-4">
              {INPUT_FIELDS.map((field) => (
                <FormInput
                  key={field.id}
                  field={field}
                />
              ))}
            </div>
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
