// const handleAvatarChange = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     if (!VALIDATION_RULES.ALLOWED_FILE_TYPES.includes(file.type)) {
//       toast.error("Please upload a valid image file");
//       return;
//     }
//     if (file.size > VALIDATION_RULES.MAX_FILE_SIZE) {
//       toast.error("File size should be less than 1MB");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setAvatarPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   }
// };

// Avatar Upload Component
// const AvatarUpload = ({ previewUrl, error, onChange }) => (
//   <div className="space-y-2">
//     <label className="block text-sm font-medium text-[var(--grey-700)]">
//       Profile Picture
//     </label>
//     <div className="flex items-center space-x-4">
//       <div className="relative w-20 h-20">
//         <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
//           {previewUrl ? (
//             <img
//               src={previewUrl}
//               alt="Avatar preview"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <FaCamera className="h-8 w-8 text-gray-400" />
//           )}
//         </div>
//         <label
//           htmlFor="avatar"
//           className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition-colors"
//         >
//           <FaCamera className="h-4 w-4 text-white" />
//           <input
//             type="file"
//             id="avatar"
//             name="avatar"
//             className="hidden"
//             accept="image/jpeg,image/png,image/webp"
//             onChange={onChange}
//           />
//         </label>
//       </div>
//       <div className="flex-1">
//         <p className="text-sm text-gray-500">Upload a profile picture</p>
//         <p className="text-xs text-gray-400">JPEG, PNG, or WebP (max. 1MB)</p>
//         {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
//       </div>
//     </div>
//   </div>
// );



// if (avatar) {
//   if (!VALIDATION_RULES.ALLOWED_FILE_TYPES.includes(avatar.type)) {
//     errors.avatar = "Please upload a valid image file (JPEG, PNG, or WebP)";
//   } else if (avatar.size > VALIDATION_RULES.MAX_FILE_SIZE) {
//     errors.avatar = "File size should be less than 1MB";
//   }
// }



// const VALIDATION_RULES = {
//     MIN_USERNAME_LENGTH: 5,
//     MIN_PASSWORD_LENGTH: 8,
//     EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//     MAX_FILE_SIZE: 1024 * 1024, // 1MB
//     ALLOWED_FILE_TYPES: ["image/jpeg", "image/png", "image/webp"],
//   };


{/* <AvatarUpload
              previewUrl={avatarPreview}
              error={actionData?.errors?.avatar}
              onChange={handleAvatarChange}
            />
            */}

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

    return Object.keys(errors).length ? errors : null;
};



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
        // if (avatarFile && avatarFile.size > 0) {
        //   apiFormData.append("avatar", avatarFile);
        // }

        await customFetch.post("/users/register", apiFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast.success("Registration successful!");
        return redirect("/login");
    } catch (error) {
        console.error("Registration error:", error);
        return error
    }
}