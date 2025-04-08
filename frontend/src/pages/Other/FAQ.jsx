import React, { useState } from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import faqImage from "../../assets/images/faqImg.png";

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is LearnLoop?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      question: "How do I edit or delete my Web ad?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      question: "How do I create a new course?",
      answer:
        "To create a new course, go to the 'Courses' section in your dashboard and click 'Create New Course'. Fill in the required details and submit the form.",
    },
    {
      question: "Can I invite collaborators to my course?",
      answer:
        "Yes, you can invite collaborators by navigating to the course settings and selecting 'Invite Collaborators'. Enter their email addresses and assign appropriate permissions.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for premium subscriptions and course purchases.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
          <main className="px-60 pb-10">
            <div className="flex justify-center pb-10">
              <table className="w-full max-w-xl">
                {" "}
                {/* Adjust max-w-5xl as needed */}
                <tbody>
                  <tr>
                    <td className="align-middle w-1/2">
                      <div>
                        <h1 className={GlobalStyle.headingLarge}>FAQs</h1>
                        <p
                          className={`${GlobalStyle.headingSmall} text-gray-400`}
                        >
                          Troubleshooting & Support
                        </p>
                      </div>
                    </td>
                    <td className="text-right w-1/2">
                      <img
                        src={faqImage}
                        alt="FAQ"
                        className="ml-auto w-[500px] md:w-[600px] lg:w-[700px]"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`${GlobalStyle.caseCountBar} bg-[#F7EDE5]`}
                >
                  <button
                    className={`flex justify-between items-center w-full p-6 text-left hover:bg-[#CFB397] transition-colors rounded-2xl ${
                      activeIndex === index ? "bg-gray-50" : ""
                    }`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <h2
                      className={`${GlobalStyle.headingSmall} font-medium text-gray-800`}
                    >
                      {faq.question}
                    </h2>
                    <span className="text-gray-500 text-2xl ml-4">
                      {activeIndex === index ? "−" : "+"}
                    </span>
                  </button>
                  {activeIndex === index && (
                    <div className="px-6 pb-6 pt-2 text-gray-600">
                      <p className={GlobalStyle.paragraph}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
