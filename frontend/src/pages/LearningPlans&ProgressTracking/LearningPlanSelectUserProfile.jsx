import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { FaCirclePlus } from "react-icons/fa6";

export const LearningPlansSelectUserProfile = () => {
  const { userId } = useParams();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/learning-plans/user/${userId}`);
        const data = await res.json();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching user plans:", error);
      }
    };

    fetchPlans();
  }, [userId]);

  if (!plans.length) return <div className="p-6">Loading or No Plans Found...</div>;

  const author = plans[0]?.author || "Unknown Author"; // assuming same author for user's plans

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
          <main className="p-6">
            <div className="flex justify-center items-center">
              <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gray-200 p-6 flex items-center">
                  <div className="w-16 h-16 bg-[#D3BBA2] rounded-full"></div>
                  <div className="ml-4">
                    <h1 className={GlobalStyle.headingMedium}>{author}</h1>
                    <p className={`${GlobalStyle.headingSmall} text-gray-600`}>
                      Learning Plans by User: {userId}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <FaCirclePlus className="text-3xl text-[#CFB397] border-2 border-[#74512D] cursor-pointer bg-black rounded-full" />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t-2 border-[#E4D6C3]"></div>

                {/* Content */}
                <div className="p-6 bg-[#D3BBA2]">
                  <ul>
                    {plans.map((plan, index) => (
                      <li
                        key={index}
                        className="mb-4 flex justify-between items-center border-b border-[#E4D6C3] pb-4"
                      >
                        <div>
                          <h2 className={`${GlobalStyle.paragraph} font-semibold`}>
                            {index + 1}. {plan.planTopic}
                          </h2>
                          <p className="text-sm text-gray-700">
                            {plan.description}
                          </p>
                        </div>
                        <span className={GlobalStyle.paragraph}>
                          {plan.duration || "N/A"}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div >
                        {/* Top Right Summary */}
                        <div className="flex justify-end items-center mb-4">
                            <div className="w-16 h-2 bg-white rounded-full mr-2"></div>
                                <span className="text-black text-sm font-medium">1 month</span>
                            </div>

                        {/* Plan List */}
                        <ul className="text-black">
                         {[1, 2, 3, 4].map((num) => (
                        <li key={num} className="mb-4">
                        <h2 className="font-medium">
                            {num}. Professional certificate in Regulatory Compliance
                        </h2>
                        <p className="text-sm italic text-[#422B16]">
                            Resource: <a href="http://udaxmy.com" className="underline">http://udaxmy.com</a>
                        </p>
                        <p className="text-sm font-bold text-right text-[#422B16] mt-1">2 weeks</p>
                        </li>
                        ))}
                    </ul>
                    </div>

                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
