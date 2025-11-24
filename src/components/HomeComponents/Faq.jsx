import React, { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does this posture corrector work?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#03373d] mb-4">
            Frequently Asked Question (FAQ)
          </h2>
          <p className="text-gray-600 text-sm lg:text-base max-w-3xl mx-auto leading-relaxed">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        {/* Accordion */}
        <div className="w-full max-w-4xl mx-auto mb-8 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-3xl overflow-hidden transition-all duration-500 ease-in-out"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full px-6 lg:px-8 py-4 lg:py-5 flex items-center justify-between text-left transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "bg-[#E8F4F5] text-[#03373d]"
                      : "bg-white text-[#03373d] hover:bg-gray-50"
                  }`}
                >
                  <span className="text-base lg:text-lg font-semibold pr-4 flex-1">
                    {faq.question}
                  </span>
                  <span
                    className={`text-xl lg:text-2xl flex-shrink-0 transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "rotate-180 text-[#03373d]"
                        : "rotate-0 text-gray-600"
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 lg:px-8 py-4 lg:py-6 bg-[#E8F4F5]">
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More Button */}
        <div className="flex justify-center">
          <button className="btn bg-[#caeb66] hover:bg-[#b8d955] text-[#03373d] border-none rounded-full px-6 lg:px-8 h-12 lg:h-14 text-base lg:text-lg font-semibold flex items-center gap-2">
            See More FAQ's
            <span className="bg-[#1A1A1A] text-white p-1.5 rounded-full">
              <GoArrowUpRight className="text-sm" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faq;
