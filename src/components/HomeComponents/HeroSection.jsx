import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import HeroIcon from "../../assets/hero-icon.svg";
import HeroBanner from "../../assets/hero-banner.svg";
import DoorStopDeli from "../../assets/delivery-doorstop.svg";
import DeliveryPick from "../../assets/delivery-pickup.svg";
import { GoArrowUpRight } from "react-icons/go";

const HeroSection = () => {
  const heroSlides = [
    {
      icon: HeroIcon,
      title: "We Make Sure Your",
      highlight: "Parcel Arrives",
      subtitle: "On Time - No Fuss.",
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
      image: HeroBanner,
      buttons: [
        { text: "Track Your Parcel", primary: true },
        { text: "Be A Rider", primary: false },
      ],
    },
    {
      icon: HeroIcon,
      title: "Fast & Reliable",
      highlight: "Delivery Service",
      subtitle: "Across Bangladesh",
      description:
        "We deliver to every corner of Bangladesh with 100% safety guarantee. Express delivery available in major cities within 4-6 hours.",
      image: DoorStopDeli,
      buttons: [
        { text: "Get Started", primary: true },
        { text: "Learn More", primary: false },
      ],
    },
    {
      icon: HeroIcon,
      title: "Your Trusted",
      highlight: "Logistics Partner",
      subtitle: "For Business Growth",
      description:
        "From SME to corporate solutions, we provide customized delivery services with inventory management and real-time tracking support.",
      image: DeliveryPick,
      buttons: [
        { text: "Become a Merchant", primary: true },
        { text: "View Pricing", primary: false },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-6 lg:p-20 bg-white rounded-3xl lg:rounded-4xl mt-5 lg:mt-10">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          el: ".hero-pagination",
          bulletClass: "hero-pagination-bullet",
          bulletActiveClass: "hero-pagination-bullet-active",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="hero-swiper"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left Column */}
              <div className="space-y-8 w-full lg:w-[60%]">
                {/* Hero Icon */}
                <div>
                  <img
                    src={slide.icon}
                    alt="Delivery Icon"
                    className="h-16 lg:h-24"
                  />
                </div>

                {/* Headline */}
                <h1 className="text-4xl lg:text-5xl font-bold text-[#03373d] leading-tight lg:leading-[62px]">
                  {slide.title}{" "}
                  <span className="text-[#caeb66]">{slide.highlight}</span>{" "}
                  {slide.subtitle}
                </h1>

                {/* Subheading */}
                <p className="text-gray-500 text-base lg:text-lg max-w-xl leading-relaxed">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  {slide.buttons.map((button, btnIndex) =>
                    button.primary ? (
                      <button
                        key={btnIndex}
                        className="btn bg-[#caeb66] hover:bg-[#b8d955] text-[#03373d] border-none rounded-full px-6 lg:px-8 h-12 lg:h-14 text-base lg:text-lg font-semibold flex items-center gap-2"
                      >
                        {button.text}
                        <span className="bg-[#1A1A1A] text-white p-1 rounded-full ml-2">
                          <GoArrowUpRight className="text-sm" />
                        </span>
                      </button>
                    ) : (
                      <button
                        key={btnIndex}
                        className="btn btn-outline border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-[#03373d] rounded-full px-6 lg:px-8 h-12 lg:h-14 text-base lg:text-lg font-semibold"
                      >
                        {button.text}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="flex justify-center lg:justify-end w-full lg:w-[40%]">
                <img
                  src={slide.image}
                  alt="Delivery Service"
                  className="w-full max-w-md lg:max-w-2xl"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots - Static at bottom */}
      <div className="hero-pagination flex gap-3 mt-8 g:mt-12"></div>

      <style jsx>{`
        .hero-pagination-bullet {
          height: 6px;
          width: 32px;
          background: #6a7282;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .hero-pagination-bullet-active {
          background: #caeb66;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
