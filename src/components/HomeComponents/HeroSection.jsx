import React from 'react';
import HeroIcon from '../../assets/hero-icon.svg';
import HeroBanner from '../../assets/hero-banner.svg';
import { GoArrowUpRight } from "react-icons/go";

const HeroSection = () => {
    return (
        <div className="container mx-auto p-20 lg:py-20 bg-white rounded-4xl mt-10">
            <div className="flex gap-12 items-center">
                {/* Left Column */}
                <div className="space-y-8 w-[60%]">
                    {/* Hero Icon */}
                    <div>
                        <img src={HeroIcon} alt="Delivery Icon" className="h-24" />
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl lg:text-5xl font-bold text-[#03373d] leading-[62px]">
                        We Make Sure Your <span className="text-[#caeb66]">Parcel Arrives</span> On Time <br/>
                        - No Fuss.
                    </h1>

                    {/* Subheadline */}
                    <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button className="btn bg-[#caeb66] hover:bg-[#b8d955] text-[#03373d] border-none rounded-full px-8 h-14 text-lg font-semibold flex items-center gap-2">
                            Track Your Parcel
                            <span className="bg-[#1A1A1A] text-white p-1 rounded-full ml-2">
                                <GoArrowUpRight className="text-sm" />
                            </span>
                        </button>
                        <button className="btn btn-outline border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-[#03373d] rounded-full px-8 h-14 text-lg font-semibold">
                            Be A Rider
                        </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex gap-3 mt-12">
                        <div className="h-1.5 w-8 bg-[#03373d] rounded-full"></div>
                        <div className="h-1.5 w-8 bg-gray-200 rounded-full"></div>
                        <div className="h-1.5 w-8 bg-gray-200 rounded-full"></div>
                        <div className="h-1.5 w-8 bg-gray-200 rounded-full"></div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex justify-center lg:justify-end w-[40%]">
                    <img src={HeroBanner} alt="Delivery Service" className="w-[100%] max-w-2xl" />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;