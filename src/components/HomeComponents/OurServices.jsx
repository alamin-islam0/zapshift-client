import React from "react";
import { TbTruckDelivery } from "react-icons/tb";

const OurServices = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      highlight: false,
    },
    {
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      highlight: true,
    },
    {
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      highlight: false,
    },
    {
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      highlight: false,
    },
    {
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
      highlight: false,
    },
    {
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      highlight: false,
    },
  ];

  return (
    <div className="py-12 lg:py-20 bg-[#03373d] rounded-4xl">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-gray-300 text-sm lg:text-base max-w-3xl mx-auto leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${
                service.highlight ? "bg-[#caeb66]" : "bg-white"
              } p-8 lg:p-10 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div
                  className={`${
                    service.highlight ? "bg-white" : "bg-gray-100"
                  } w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center`}
                >
                  <TbTruckDelivery
                    className={`text-3xl lg:text-4xl ${
                      service.highlight ? "text-[#03373d]" : "text-[#caeb66]"
                    }`}
                  />
                </div>
              </div>

              {/* Title */}
              <h3
                className={`text-lg lg:text-xl font-bold mb-3 lg:mb-4 text-center ${
                  service.highlight ? "text-[#03373d]" : "text-[#03373d]"
                }`}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className={`text-sm lg:text-base leading-relaxed text-center ${
                  service.highlight ? "text-[#03373d]" : "text-gray-600"
                }`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
