import React from "react";
import { useNavigate } from "react-router";
import ErrorIcon from "../../assets/error.svg";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-6">
      <div className="text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <img
            src={ErrorIcon}
            alt="Error 404"
            className="w-48 h-48 lg:w-64 lg:h-64"
          />
        </div>

        {/* Go Home Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-[#caeb66] hover:bg-[#b8d955] text-[#03373d] font-semibold rounded-full px-8 py-3 text-base lg:text-lg transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Error;
