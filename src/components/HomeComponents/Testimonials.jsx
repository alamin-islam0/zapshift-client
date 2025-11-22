import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ParcelSvg from "../../assets/parcel.svg";
import { FaQuoteLeft } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rasel Ahamed",
      position: "CEO",
      quote:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
      avatar: null,
    },
    {
      name: "Awlad Hossin",
      position: "Senior Product Designer",
      quote:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
      avatar: null,
    },
    {
      name: "Nasir Uddin",
      position: "PED",
      quote:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
      avatar: null,
    },
    {
      name: "Awlad Hossain",
      position: "Senior Developer",
      quote:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
      avatar: null,
    },
  ];

  return (
    <div className="py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Illustration */}
        <div className="flex justify-center mb-8">
          <img src={ParcelSvg} alt="Delivery" className="h-16 lg:h-20" />
        </div>

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#03373d] mb-4">
            What our customers are sayings
          </h2>
          <p className="text-gray-600 text-sm lg:text-base max-w-3xl mx-auto leading-relaxed">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-8 lg:p-12 rounded-3xl text-center">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <FaQuoteLeft className="text-4xl lg:text-5xl text-gray-300" />
                  </div>

                  {/* Quote Text */}
                  <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                    {testimonial.quote}
                  </p>

                  {/* Divider */}
                  <div className="border-t-2 border-dashed border-gray-300 mb-8"></div>

                  {/* Author Info */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#03373d] flex items-center justify-center">
                      <span className="text-white text-lg lg:text-xl font-bold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg lg:text-xl font-bold text-[#03373d]">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button className="swiper-button-prev-custom w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-gray-300 hover:border-[#03373d] hover:bg-[#03373d] hover:text-white transition-all duration-300 flex items-center justify-center">
              <IoIosArrowBack className="text-xl" />
            </button>

            {/* Custom Pagination */}
            <div className="swiper-pagination-custom flex gap-2"></div>

            <button className="swiper-button-next-custom w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#caeb66] hover:bg-[#b8d955] text-[#03373d] transition-all duration-300 flex items-center justify-center">
              <IoIosArrowForward className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .swiper-pagination-custom {
          position: static !important;
          display: flex;
          gap: 8px;
        }
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          margin: 0 !important;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #03373d;
          width: 32px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
