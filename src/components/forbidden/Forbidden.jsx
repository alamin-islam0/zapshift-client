import React from "react";
import { ShieldOff, Home, ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 text-center">
          {/* SVG Illustration */}
          <div className="mb-8 flex justify-center">
            <svg
              className="w-64 h-64 md:w-80 md:h-80"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Gradient Circle */}
              <circle
                cx="200"
                cy="200"
                r="160"
                fill="url(#bgGradient)"
                opacity="0.2"
                className="animate-pulse"
              />

              {/* Outer Ring */}
              <circle
                cx="200"
                cy="200"
                r="120"
                stroke="#EF4444"
                strokeWidth="12"
                fill="none"
                opacity="0.3"
              />

              {/* Main Forbidden Circle */}
              <circle
                cx="200"
                cy="200"
                r="100"
                stroke="#DC2626"
                strokeWidth="16"
                fill="none"
                className="drop-shadow-lg"
              />

              {/* Diagonal Slash Line */}
              <line
                x1="130"
                y1="130"
                x2="270"
                y2="270"
                stroke="#DC2626"
                strokeWidth="20"
                strokeLinecap="round"
                className="drop-shadow-lg"
              />

              {/* Inner Glow Circle */}
              <circle
                cx="200"
                cy="200"
                r="80"
                fill="#FEE2E2"
                opacity="0.4"
                className="animate-pulse"
              />

              {/* Decorative Geometric Shapes */}
              <rect
                x="60"
                y="60"
                width="30"
                height="30"
                rx="6"
                fill="#FCD34D"
                opacity="0.6"
                className="animate-bounce"
                style={{ animationDelay: "0s", animationDuration: "2s" }}
              />
              <circle
                cx="340"
                cy="90"
                r="15"
                fill="#A78BFA"
                opacity="0.6"
                className="animate-bounce"
                style={{ animationDelay: "0.3s", animationDuration: "2.3s" }}
              />
              <polygon
                points="80,330 95,360 65,360"
                fill="#34D399"
                opacity="0.6"
                className="animate-bounce"
                style={{ animationDelay: "0.6s", animationDuration: "2.6s" }}
              />
              <rect
                x="310"
                y="310"
                width="35"
                height="35"
                rx="8"
                fill="#F472B6"
                opacity="0.5"
                className="animate-bounce"
                style={{ animationDelay: "0.9s", animationDuration: "2.9s" }}
              />

              {/* Small Accent Circles */}
              <circle
                cx="150"
                cy="80"
                r="6"
                fill="#60A5FA"
                opacity="0.7"
                className="animate-pulse"
              />
              <circle
                cx="320"
                cy="200"
                r="8"
                fill="#FB923C"
                opacity="0.7"
                className="animate-pulse"
              />
              <circle
                cx="80"
                cy="200"
                r="7"
                fill="#C084FC"
                opacity="0.7"
                className="animate-pulse"
              />
              <circle
                cx="250"
                cy="340"
                r="9"
                fill="#4ADE80"
                opacity="0.7"
                className="animate-pulse"
              />

              {/* Gradient Definitions */}
              <defs>
                <linearGradient
                  id="bgGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FCA5A5" />
                  <stop offset="50%" stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Error Code Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-4">
            <ShieldOff className="w-5 h-5 text-red-600" />
            <span className="text-sm font-semibold text-red-700">
              Error 403
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Access Forbidden
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-2 max-w-md mx-auto">
            Sorry, you don't have permission to access this resource.
          </p>
          <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
            If you believe this is a mistake, please contact your administrator
            or try logging in with appropriate credentials.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all font-semibold shadow-sm hover:shadow-md w-full sm:w-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-lime-400 hover:from-primary/90 hover:to-lime-400/90 text-gray-900 rounded-lg transition-all font-semibold shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>
                This page is protected and requires special permissions
              </span>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a
              href="/contact"
              className="text-primary hover:underline font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
