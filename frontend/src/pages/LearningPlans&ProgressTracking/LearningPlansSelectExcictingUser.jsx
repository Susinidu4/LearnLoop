import React from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const LearningPlansSelectExcistingUser = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClick = () => {
    navigate("/AddLearningPlans"); // Navigate to the desired page
  };

  const data = [
    {
      title: "Professional certificate in Regulatory Compliance",
      duration: "1 month",
      resource: "http://udemy.com",
    },
    {
      title: "Professional certificate in Regulatory Compliance",
      duration: "2 weeks",
      resource: "http://udemy.com",
    },
    {
      title: "Professional certificate in Regulatory Compliance",
      duration: "2 weeks",
      resource: "http://udemy.com",
    },
    {
      title: "Professional certificate in Regulatory Compliance",
      duration: "2 weeks",
      resource: "http://udemy.com",
    },
  ];
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
          <main className="p-6">
            <div className="flex justify-center items-center">
              <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gray-200 p-6 flex items-center">
                  {/* Left Section */}
                  <div className="w-16 h-16 bg-[#D3BBA2] rounded-full"></div>

                  {/* Center Section */}
                  <div className="ml-4">
                    <h1 className={GlobalStyle.headingMedium}>
                      Kavishka Perera
                    </h1>
                    <p className={`${GlobalStyle.headingSmall} text-gray-600`}>
                      Boost Your Skills : Explore and Learn more coding skills
                    </p>
                  </div>

                  {/* Right Section: "+" Icon */}
                  <div className="ml-auto">
                    <FaCirclePlus
                      onClick={handleClick}
                      className="text-3xl text-[#CFB397] border-2 border-[#74512D] cursor-pointer bg-black rounded-full"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t-2 border-[#E4D6C3]"></div>

                {/* Content */}
                <div className="p-6 bg-[#D3BBA2]">
                  <h2 className="pb-65"></h2>
                  <hr className="border-1 border-white my-4" />

                  <ul>
                    {data.map((item, index) => (
                      <li
                        key={index}
                        className="mb-4 flex justify-between items-center border-b border-[#E4D6C3] pb-4"
                      >
                        <div>
                          <h2
                            className={`${GlobalStyle.paragraph} font-semibold`}
                          >
                            {index + 1}. {item.title}
                          </h2>
                          <p className="text-sm text-gray-700">
                            Resource:{" "}
                            <a href={item.resource} className="text-blue-500">
                              {item.resource}
                            </a>
                          </p>
                        </div>
                        <span className={GlobalStyle.paragraph}>
                          {item.duration}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
