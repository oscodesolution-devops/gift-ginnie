import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

interface Faq {
  title: string;
  content: {
    ques: string;
    ans: string;
    isOpen: boolean;
  }[];
}

const faqsList: Faq[] = [
  {
    title: "Placing an Order",
    content: [
      {
        ques: "How can I search and browse products on the website?",
        ans: "You can search for products using the search bar located at the top of the page or browse through the available product categories on the homepage.",
        isOpen: false,
      },
      {
        ques: "Can I modify or cancel an already placed order?",
        ans: "Unfortunately, we are unable to modify or cancel orders once they have been placed for security and efficiency reasons in order processing. Please contact us as soon as possible if you need assistance.",
        isOpen: false,
      },
      {
        ques: "How can I check the stock of a product?",
        ans: `Product stock availability is displayed on each product page. If a product is in stock, it will be indicated as "In Stock." If it's unavailable, it will be marked as "Out of Stock."`,
        isOpen: false,
      },
    ],
  },
  {
    title: "Shipping and Delivery",
    content: [
      {
        ques: "What delivery options are available and what are the associated costs?",
        ans: "We offer multiple delivery options, including standard, express, or free shipping, depending on your location and order value. Exact costs will be displayed during the checkout process.",
        isOpen: false,
      },
      {
        ques: "Can I avail international delivery?",
        ans: "Yes, we do offer international delivery. Costs and delivery times may vary depending on your exact location.",
        isOpen: false,
      },
    ],
  },
  {
    title: "Returns and Exchanges",
    content: [
      {
        ques: "What is the return policy for products?",
        ans: "We accept returns within 30 days of receiving your order. Products must be in new, unused condition, and have the original packaging intact.",
        isOpen: false,
      },
      {
        ques: "How can I initiate a return or exchange process?",
        ans: "To initiate a return or exchange process, please contact us through our contact page or send an email to [email protected] We will respond with further instructions.",
        isOpen: false,
      },
    ],
  },
  {
    title: "Support and Contact",
    content: [
      {
        ques: "How can I contact our customer service for further questions?",
        ans: "You can contact our customer service team through our contact page or by email at [email protected] We'll be happy to assist you with any questions or concerns you may have.",
        isOpen: false,
      },
      {
        ques: "What are the working hours of our customer service?",
        ans: "Our customer service team is available Monday through Friday, between 9:00 AM and 6:00 PM, to assist you with any issues or inquiries.",
        isOpen: false,
      },
      {
        ques: "How long does it take to receive a response from customer service?",
        ans: `We strive to respond to all inquiries as quickly as possible. Typically, you can expect a response within 24-48 hours during regular business days.`,
        isOpen: false,
      },
      {
        ques: "Is there a phone number I can call for immediate assistance?",
        ans: `Yes, we have a dedicated customer service hotline available during business hours for immediate assistance. You can find our contact number on the "Contact Us" page.`,
        isOpen: false,
      },
      {
        ques: "Do you offer live chat support for real-time assistance?",
        ans: `Yes, we provide live chat support for real-time assistance during specified hours. Look for the chat icon in the bottom corner of the website to start a chat session with one of our representatives.`,
        isOpen: false,
      },
    ],
  },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState<Faq[]>(faqsList);

  const toggleAnswer = (faqIndex: number, contentIndex: number) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[faqIndex].content[contentIndex].isOpen =
      !updatedFaqs[faqIndex].content[contentIndex].isOpen;
    setFaqs(updatedFaqs);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <div className="px-5 md:px-20 lg:px-56 py-16 md:py-20 dark:text-white w-full">
        <Breadcrumbs />
        <div className="uppercase text-3xl md:text-4xl lg:text-5xl font-bold mb-14 mx-auto flex items-center justify-center">
          FAQ
        </div>
        <div className="flex flex-col gap-7">
          {faqs.map((faq, faqIndex) => (
            <div key={faqIndex}>
              <div className="w-full bg-secondary px-6 font-semibold py-6 text-lg dark:text-white dark:bg-[#1C1C1C]">
                {faq.title}
              </div>
              <div className="px-6 mt-5">
                {faq.content.map((content, contentIndex) => (
                  <div key={contentIndex}>
                    <div
                      onClick={() => toggleAnswer(faqIndex, contentIndex)} // Update on click
                      className={`flex ${content.isOpen ? "": "mb-7"} justify-between items-center cursor-pointer w-full`}
                    >
                      <span className="text-lg">{content.ques}</span>
                      <span>
                        {content.isOpen ? <FaAngleUp /> : <FaAngleDown />}
                      </span>
                    </div>
                    {content.isOpen && (
                      <p className="py-5 text-sm">{content.ans}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
