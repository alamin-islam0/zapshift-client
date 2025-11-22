import React from "react";
import CasioLogo from "../../assets/casio-2 1.svg";
import AmazonLogo from "../../assets/logo-amazon 1.svg";
import MoonstarLogo from "../../assets/moonstar 1.svg";
import StartLogo from "../../assets/start--1 1.svg";
import StartPeopleLogo from "../../assets/start-people 1.svg";
import IllustrationSvg from "../../assets/Illustration.svg";
import ServiceSvg from "../../assets/service.svg";
import ParcelSvg from "../../assets/parcel.svg";

const DeliveryPartner = () => {
  const partners = [
    { name: "Casio", logo: CasioLogo },
    { name: "Amazon", logo: AmazonLogo },
    { name: "Moonstar", logo: MoonstarLogo },
    { name: "Star", logo: StartLogo },
    { name: "Start People", logo: StartPeopleLogo },
    { name: "Randstad", logo: StartLogo },
  ];

  const features = [
    {
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: IllustrationSvg,
    },
    {
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: ServiceSvg,
    },
    {
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: ServiceSvg,
    },
  ];

  return (
    <div className="py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Partners Section */}
        <div className="mb-16 lg:mb-24">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#03373d] text-center mb-8 lg:mb-12">
            We've helped thousands of sales teams
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 lg:h-10 object-contain"
                />
              </div>
            ))}
          </div>

          <div className="mt-12 lg:mt-16 border-t-2 border-dashed border-gray-300"></div>
        </div>

        {/* Features Section */}
        <div className="space-y-12 lg:space-y-16 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 bg-white px-4 py-4 rounded-4xl"
            >
              <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center md:justify-start">
                <div className="relative w-40 h-40 lg:w-48 lg:h-48 flex items-center justify-center border-r-2 border-dashed border-gray-300 pr-8">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-32 h-32 lg:w-40 lg:h-40 object-contain"
                  />
                </div>
              </div>

              <div className="w-full md:w-2/3 lg:w-3/4 text-center md:text-left">
                <h3 className="text-xl lg:text-2xl font-bold text-[#03373d] mb-3 lg:mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed max-w-3xl">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 lg:mt-16 border-t-2 border-dashed border-gray-300"></div>
      </div>
    </div>
  );
};

export default DeliveryPartner;
