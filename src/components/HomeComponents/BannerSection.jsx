import React from "react";
import BgSvg from "../../assets/bg.svg";
import VectorSvg from "../../assets/Vector.svg";
import { GoArrowUpRight } from "react-icons/go";

const BannerSection = () => {
  return (
    <div
      className="py-12 lg:py-10 bg-cover bg-center bg-no-repeat rounded-3xl lg:rounded-4xl mt-5 lg:mt-10"
      style={{ backgroundImage: `url(${BgSvg})` }}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-[60%] space-y-6 lg:space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight lg:leading-[50px]">
              Merchant and Customer Satisfaction is Our First Priority
            </h2>

            <p className="text-gray-300 text-sm lg:text-base leading-relaxed max-w-2xl">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="btn bg-[#caeb66] hover:bg-[#b8d955] text-[#03373d] border-none rounded-full px-6 lg:px-8 h-12 lg:h-14 text-base lg:text-lg font-semibold">
                Become a Merchant
              </button>
              <button className="btn btn-outline border-white hover:bg-white/10 hover:border-white text-white rounded-full px-6 lg:px-8 h-12 lg:h-14 text-base lg:text-lg font-semibold">
                Earn with ZapShift Courier
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
            <img
              src={VectorSvg}
              alt="Delivery Illustration"
              className="w-full max-w-sm lg:max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
