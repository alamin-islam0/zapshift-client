import React from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  console.log('in register', location)

  const handleRegister = (data) => {
    console.log("after register", data.photo[0]);

    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        //Store the img and get photo url
        const formData = new FormData();
        formData.append("image", profileImg);

        const imageApiURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key}`;
        axios.post(imageApiURL, formData)
        .then((res) => {
          console.log("After image upload", res.data.data.url);

          //Update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url
          }
          updateUserProfile(userProfile)
          .then(result => {
            console.log('User profile updated done', result)
            navigate(location.state || '/')
          })
          .catch(error => {
            console.log(error)
          })
        });

        //
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-[#E6F3F3]">
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#03373d] mb-2 text-left">
          Create an Account
        </h2>
        <p className="text-gray-600 mb-8 text-left">Register with ZapShift</p>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-[#03373d]">Name</label>
            <div className="mt-2 flex items-center bg-[#F2F7F6] rounded-full px-4 py-3 border border-transparent focus-within:border-[#CBEAEC]">
              <FaRegUser className="w-5 h-5 text-gray-500" />
              <input
                {...register("name", { required: true })}
                type="Name"
                placeholder="Name"
                className="ml-3 w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
              />
            </div>
            {errors.name?.type === "required" && (
              <small className="text-red-500">Enter your name</small>
            )}
          </div>
          {/* Photo */}
          <div>
            <label className="text-sm font-medium text-[#03373d]">Photo</label>
            <div className="file-input w-full mt-2 flex items-center bg-[#F2F7F6] rounded-full px-4 py-3 border border-transparent focus-within:border-[#CBEAEC]">
              <FaRegUser className="w-5 h-5 text-gray-500" />
              <input
                {...register("photo", { required: true })}
                type="file"
                placeholder="file"
                className="w-full ml-3 bg-transparent outline-none text-sm placeholder:text-gray-400"
              />
            </div>
            {errors.photo?.type === "required" && (
              <small className="text-red-500">Enter your photo</small>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-[#03373d]">Email</label>
            <div className="mt-2 flex items-center bg-[#F2F7F6] rounded-full px-4 py-3 border border-transparent focus-within:border-[#CBEAEC]">
              <Mail className="w-5 h-5 text-gray-500" />
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email"
                className="ml-3 w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
              />
            </div>
            {errors.email?.type === "required" && (
              <small className="text-red-500">Email is required </small>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-[#03373d]">
              Password
            </label>
            <div className="mt-2 flex items-center bg-[#F2F7F6] rounded-full px-4 py-3 border border-transparent focus-within:border-[#CBEAEC]">
              <Lock className="w-5 h-5 text-gray-500" />
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="ml-3 w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
              />

              {/* Toggle icon */}
              {showPassword ? (
                <EyeOff
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {errors.password?.type === "required" && (
              <small className="text-red-500">Password is required </small>
            )}
            {errors.password?.type === "minLength" && (
              <small className="text-red-500">
                Password must be 6 character or longer{" "}
              </small>
            )}
            {errors.password?.type === "pattern" && (
              <small className="text-red-500">
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, and one special character.{" "}
              </small>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-[#03373d] hover:underline font-medium"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#caeb66] hover:bg-[#bfe142] text-[#062014] font-semibold rounded-full py-3 shadow-md transition-all"
          >
            <LogIn className="w-5 h-5" />
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            state={location.state}
            to={'/login'}
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
        {/* GOOGLE SIGN-IN BUTTON */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
