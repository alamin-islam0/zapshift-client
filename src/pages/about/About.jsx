import React, { useState } from "react";
import StoryIcon from "../../assets/Story.svg";
import MissionIcon from "../../assets/Mission.svg";
import SuccessIcon from "../../assets/Success.svg";
import TeamIcon from "../../assets/Team & Others.svg";

const About = () => {
  const [activeTab, setActiveTab] = useState("story");

  const tabs = [
    { id: "story", label: "Story", icon: StoryIcon },
    { id: "mission", label: "Mission", icon: MissionIcon },
    { id: "success", label: "Success", icon: SuccessIcon },
    { id: "team", label: "Team & Others", icon: TeamIcon },
  ];

  const content = {
    story:
      "Our journey began with a clear goal — to make parcel delivery simple, fast, and dependable. Over time, our dedication to real-time tracking, streamlined logistics, and customer-focused service has strengthened our reputation. Whether it’s a heartfelt gift or an urgent business shipment, we ensure it arrives exactly when it should — safely and on schedule.",

    mission:
      "Our mission is rooted in one core idea: delivery should be effortless and trustworthy. With advanced tracking, smart logistics, and an unwavering focus on customer satisfaction, we help individuals and businesses send packages with complete confidence. Whatever the purpose, we make sure every parcel reaches its destination right on time.",

    success:
      "Our progress has been driven by a commitment to speed, reliability, and convenience. By embracing innovation and listening closely to our customers, we’ve grown into a delivery partner people rely on daily. From small personal packages to important commercial shipments, we take pride in delivering success — one parcel at a time.",

    team: "Behind every successful delivery is a dedicated team working with passion and precision. Our professionals collaborate to ensure smooth operations, accurate tracking, and timely arrival of every item. Together, we work toward a shared goal: making every delivery experience seamless, dependable, and stress-free.",
  };

  return (
    <div className="py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#03373d] mb-4">
            About Us
          </h1>
          <p className="text-gray-600 text-sm lg:text-base max-w-2xl leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-wrap gap-4 lg:gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2 lg:py-3 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#caeb66] text-[#03373d] font-semibold"
                    : "bg-transparent text-gray-600 hover:text-[#03373d]"
                }`}
              >
                <span className="text-sm lg:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          <div className="space-y-6">
            {/* Repeat content 3 times as shown in the design */}
            {[1].map((index) => (
              <p
                key={index}
                className="text-gray-600 text-sm lg:text-base leading-relaxed"
              >
                {content[activeTab]}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
