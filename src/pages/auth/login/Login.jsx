import React from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {

  const { signInUser } = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    // Clear any previous error messages
    setErrorMessage("");

    console.log("after submit", data);
    signInUser(data.email, data.password)
      .then(result => {
        console.log(result)
        navigate(location?.state || '/')
      })
      .catch(error => {
        console.log(error)

        // Handle Firebase authentication errors
        let message = "Login failed. Please try again.";

        if (error.code === "auth/wrong-password") {
          message = "Incorrect password. Please try again.";
        } else if (error.code === "auth/user-not-found") {
          message = "No account found with this email. Please register first.";
        } else if (error.code === "auth/invalid-email") {
          message = "Invalid email address. Please check and try again.";
        } else if (error.code === "auth/user-disabled") {
          message = "This account has been disabled. Please contact support.";
        } else if (error.code === "auth/too-many-requests") {
          message = "Too many failed login attempts. Please try again later.";
        } else if (error.code === "auth/invalid-credential") {
          message = "Invalid email or password. Please check your credentials.";
        }

        setErrorMessage(message);
      })
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-[#E6F3F3]">
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#03373d] mb-2 text-left">
          Welcome Back
        </h2>
        <p className="text-gray-600 mb-8 text-left">
          Login to continue your deliveries
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage("")}
              className="text-red-500 hover:text-red-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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
          Don’t have an account?{" "}
          <Link
            state={location.state}
            to={'/register'}
            className="text-primary font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
        {/* GOOGLE SIGN-IN BUTTON */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
