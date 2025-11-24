import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Most posture correctors are adjustable and fit a wide range of body types; always check sizing guides for the best fit.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "It can reduce strain by improving posture. For chronic issues consult a healthcare professional for tailored advice.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Some models offer vibration reminders—check product specs for feature availability.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "Sign up for back-in-stock notifications via email on the product page and we’ll notify you when it is available.",
  },
];

export default function Faq() {
  const [expanded, setExpanded] = React.useState(0);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="py-16 px-6 lg:px-20 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#03373d] mb-3">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro.
        </p>
      </div>

      {faqs.map((faq, i) => (
        <Accordion
          key={i}
          expanded={expanded === i}
          onChange={handleChange(i)}
          sx={{
            mb: 2,
            borderRadius: "16px",
            border: "2px solid #E6F3F3",
            overflow: "hidden",
            boxShadow: "none",
            "&.Mui-expanded": {
              borderColor: "#CBEAEC",
              backgroundColor: "#E8F4F5",
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: expanded === i ? "#03373d" : "#6b7280",
                  transform: expanded === i ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.3s",
                }}
              />
            }
            sx={{
              px: 3,
              py: 2,
              "& .MuiAccordionSummary-content": {
                margin: 0,
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                color: "#03373d",
                fontSize: { xs: "0.95rem", lg: "1.1rem" },
              }}
            >
              {faq.question}
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              px: 3,
              pb: 3,
              backgroundColor: "#E8F4F5",
            }}
          >
            <Typography
              sx={{
                color: "#4b5563",
                fontSize: { xs: "0.9rem", lg: "1rem" },
                lineHeight: 1.7,
              }}
            >
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
