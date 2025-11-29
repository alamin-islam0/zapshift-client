import React from "react";
import RiderImage from "../../assets/rider.svg";
import {
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  CreditCard,
  Building2,
  Send,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";

const Rider = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="py-12 mx-4 lg:py-20 lg:mx-0 bg-white rounded-4xl my-10">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header Section */}
        <div className="mb-12 lg:mb-16">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#03373d] mb-4">
            Be a Rider
          </h1>
          <p className="text-gray-600 text-sm lg:text-base max-w-3xl leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#03373d] mb-8">
              Tell us about yourself
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name & Age */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#03373d]">
                    Your Name
                  </label>
                  <div className="flex items-center bg-[#F2F7F6] rounded-full px-4 py-3 border border-transparent focus-within:border-[#CBEAEC]">
                    <FaRegUser className="w-5 h-5 text-gray-500" />
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      placeholder="Your Name"
                      className="ml-3 w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                    />
                  </div>
                  {errors.name && (
                    <small className="text-red-500">Name is required</small>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#03373d]">
                    Your Age
                  </label>
                  <div className="flex items-center bg-[#F2F7F6] rounded-full px-4 py-3 border border-transparent focus-within:border-[#CBEAEC]">
                    <FaRegUser className="w-5 h-5 text-gray-500" />
                    <input
                      {...register("age", { required: true })}
                      type="number"
                      placeholder="Your age"
                      className="ml-3 w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                    />
                  </div>
                  {errors.age && (
                    <small className="text-red-500">Age is required</small>
                  )}
                </div>
              </div>

              {/* Email & District */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#03373d]">
                    Your Email
                  </label>
                  <div className="flex items-center bg-[#F2F7F6] rounded-full px-4 py-3 border border-transparent focus-within:border-[#CBEAEC]">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="Your Email"
                      className="ml-3 w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                    />
                  </div>
                  {errors.email && (
                    <small className="text-red-500">Email is required</small>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#03373d]">
                    Your District
                  </label>
                  <div className="relative flex items-center bg-[#F2F7F6] rounded-full px-4 py-3 border border-transparent focus-within:border-[#CBEAEC]">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <select
                      {...register("district", { required: true })}
                      className="ml-3 w-full bg-transparent outline-none text-sm text-gray-500 cursor-pointer appearance-none"
                    >
                      <option value="">Select your District</option>
                      <option value="dhaka">Dhaka</option>
                      <option value="chittagong">Chittagong</option>
                      <option value="sylhet">Sylhet</option>
                    </select>
                    <ChevronDown className="absolute right-4 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                  {errors.district && (
                    <small className="text-red-500">District is required</small>
                  )}
                </div>
              </div>

              {/* NID & Contact */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#03373d]">
                    NID No
                  </label>
                  <div className="flex items-center bg-[#F2F7F6] rounded-full px-4 py-3 border border-transparent focus-within:border-[#CBEAEC]">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <input
                      {...register("nid", { required: true })}
                      type="text"
                      placeholder="NID"
                      className="ml-3 w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                    />
                  </div>
                  {errors.nid && (
                    <small className="text-red-500">NID is required</small>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#03373d]">
                    Contact
                  </label>
                  <div className="flex items-center bg-[#F2F7F6] rounded-full px-4 py-3 border border-transparent focus-within:border-[#CBEAEC]">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <input
                      {...register("contact", { required: true })}
                      type="tel"
                      placeholder="Contact"
                      className="ml-3 w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                    />
                  </div>
                  {errors.contact && (
                    <small className="text-red-500">Contact is required</small>
                  )}
                </div>
              </div>

              {/* Wire-house Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#03373d]">
                  Which wire-house you want to work?
                </label>
                <div className="relative flex items-center bg-[#F2F7F6] rounded-full px-4 py-3 border border-transparent focus-within:border-[#CBEAEC]">
                  <Building2 className="w-5 h-5 text-gray-500" />
                  <select
                    {...register("warehouse", { required: true })}
                    className="ml-3 w-full bg-transparent outline-none text-sm text-gray-500 cursor-pointer appearance-none"
                  >
                    <option value="">Select wire-house</option>
                    <option value="dhaka-north">Dhaka North</option>
                    <option value="dhaka-south">Dhaka South</option>
                  </select>
                  <ChevronDown className="absolute right-4 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                {errors.warehouse && (
                  <small className="text-red-500">Warehouse is required</small>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#caeb66] hover:bg-[#bfe142] text-[#062014] font-semibold rounded-full py-3.5 mt-4 shadow-md transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                Submit
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src={RiderImage}
              alt="Delivery Rider"
              className="w-full max-w-lg lg:max-w-xl object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;
