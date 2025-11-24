import React from "react";
import { Linkedin, X, Facebook, Youtube } from "lucide-react";

const navLinks = [
  "Services",
  "Coverage",
  "About Us",
  "Pricing",
  "Blog",
  "Contact",
];

export default function Footer() {
  return (
    <div className="pb-8 px-4 lg:px-0">
      <div
        className="w-full bg-black text-white pt-12 rounded-4xl pb-10 overflow-hidden"
        style={{
          backgroundImage: 'url("/Frame 2087326230.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-20">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-md flex items-center justify-center bg-[#caeb66]">
                <span className="text-black font-bold">Z</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                ZapShift
              </h1>
            </div>

            <p className="text-gray-300 text-sm lg:text-base max-w-2xl leading-relaxed">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>

          <div className="mt-8 lg:mt-10">
            <div className="border-t border-dashed border-[#123232] opacity-40"></div>
          </div>

          <nav className="mt-6 lg:mt-8">
            <ul className="flex flex-wrap justify-center gap-6 lg:gap-8 text-gray-300">
              {navLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-sm lg:text-base hover:text-[#caeb66] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 lg:mt-8">
            <div className="border-t border-dashed border-[#123232] opacity-40"></div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#0077B5] hover:bg-[#006399] flex items-center justify-center transition-all"
            >
              <Linkedin size={18} className="text-white" />
            </a>

            <a
              href="#"
              aria-label="X"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white hover:opacity-90 flex items-center justify-center transition-all"
            >
              <X size={16} className="text-black" />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#1877F2] hover:bg-[#145DBF] flex items-center justify-center transition-all"
            >
              <Facebook size={18} className="text-white" />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#FF0000] hover:bg-[#CC0000] flex items-center justify-center transition-all"
            >
              <Youtube size={18} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
