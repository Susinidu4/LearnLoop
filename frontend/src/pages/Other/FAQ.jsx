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
        "LearnLoop is a web-based Skill Sharing and Learning Platform designed to connect individuals who want to learn or teach skills such as coding, cooking, photography, and DIY crafts. The platform allows users to create posts with media content, track their learning progress, interact with others through likes and comments, and build structured learning plans.",
    },
    {
      question: "Who can use LearnLoop?",
      answer:
        "Anyone interested in teaching or learning skills can use LearnLoop — whether you're a beginner, hobbyist, or expert.",
    },
    {
      question: "Is LearnLoop free to use",
      answer:
        "Yes, LearnLoop is completely free to use. You can browse posts, follow users, create content, and manage your learning plans without any cost.",
    },
    {
      question: "How do I sign up?",
      answer:
        "You can sign up using your existing Google or Facebook account through our secure OAuth 2.0 authentication system.",
    },
    {
      question: "Can I edit or delete my posts and comments?",
      answer:
        "Yes, you can edit or delete your own posts and comments. As a post owner, you can also delete comments made by others on your posts.",
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
                    className={`flex justify-between items-center w-full p-6 text-left hover:bg-[#F0E0D1] transition-colors rounded-2xl ${
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
