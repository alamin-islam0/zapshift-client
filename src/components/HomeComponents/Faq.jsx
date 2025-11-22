import React from "react";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { GoArrowUpRight } from "react-icons/go";
import "./Faq.css";

const Faq = () => {
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
        <div className="w-full max-w-4xl mx-auto mb-8">
          <Accordion
            transition
            transitionTimeout={500}
            initialEntered={[0]}
            className="faq-accordion"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} header={faq.question}>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionItem>
            ))}
          </Accordion>
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
