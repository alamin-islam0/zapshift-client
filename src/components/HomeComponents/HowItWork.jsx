import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaMapMarkerAlt } from "react-icons/fa";

const HowItWork = () => {
  const steps = [
    {
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-[#03373d] mb-10">
          How it Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-6 relative w-fit">
                <TbTruckDelivery className="text-4xl text-[#03373d]" />
                <FaMapMarkerAlt className="text-sm text-[#03373d] absolute -top-1 -right-1" />
              </div>
              <h3 className="text-xl font-bold text-[#03373d] mb-3">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
