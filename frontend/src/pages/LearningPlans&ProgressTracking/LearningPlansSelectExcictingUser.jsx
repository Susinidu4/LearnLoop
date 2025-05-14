import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { getUserById } from "../../service/Profile & Followers Management/AuthService";

export const LearningPlansSelectExcistingUser = () => {
  const { userId } = useParams();
  const [plans, setPlans] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/learning-plans/user/${userId}`
        );
        const data = await res.json();
        setPlans(data);

        const user = await getUserById(userId);
        if (user?.name) setUserName(user.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

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
                <div className="bg-gray-200 p-6">
                  <div className="flex items-center space-x-4">
                    {/* Profile Picture */}
                    <div className="w-12 h-12 bg-[#D3BBA2] rounded-full"></div>

                    {/* Username */}
                    <h1 className={`${GlobalStyle.headingMedium}`}>
                      {userName}
                    </h1>
                  </div>
                  {/* Title and Description */}
                  <div className="mt-4 ml-20">
                    <p className={`font-bold ${GlobalStyle.headingSmall}`}>
                      {plans[0]?.planTopic || "No title available"}
                    </p>
                    <p className={`${GlobalStyle.headingSmall} text-gray-600`}>
                      {plans[0]?.description || "No description available"}
                    </p>
                  </div>
                </div>

                {/* Banner Image for each plan */}
                {plans.length > 0 && (
                  <div
                    className="bg-[#C1A47D] relative h-68 flex items-center justify-center "
                    style={{ backgroundImage: `url(${plans.imageUrl})` }}
                  >
                    {plans[0].imageUrl ? (
                      <img
                        src={plans[0]?.imageUrl}
                        alt="Plan Banner"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-banner.jpg";
                        }}
                      />
                    ) : (
                      <img
                        src="/default-banner.jpg"
                        alt="Default Banner"
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                )}

                {/* Divider */}
                <div className="border-t-2 border-[#E4D6C3]"></div>

                {/* Plans List */}
                <div className="p-6 bg-[#D3BBA2]">
                  <ul>
                    {plans.length ? (
                      plans.map((plan, index) => (
                        <li
                          key={index}
                          className="mb-4 border-b border-[#E4D6C3] pb-4"
                        >

                          {/* All Steps */}
                          <div className="mt-2 space-y-2">
                            {plan.steps?.length ? (
                              plan.steps.map((step, stepIndex) => (
                                <div
                                  key={stepIndex}
                                  className="bg-[#D3BBA2] p-3 rounded-md shadow-sm border border-[#E4D6C3]"
                                >
                                  <p className="font-semibold text-sm text-gray-800">
                                    Step {step.stepNumber}: {step.topic}
                                  </p>
                                  <p className="text-sm text-gray-700">
                                    <span className="font-semibold">
                                      Resource:
                                    </span>{" "}
                                    <a
                                      href={step.resourceLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline"
                                    >
                                      {step.resourceLink}
                                    </a>
                                  </p>
                                  <p className="text-sm text-gray-700">
                                    <span className="font-semibold">
                                      Duration:
                                    </span>{" "}
                                    {step.completionDuration || "N/A"}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-gray-700">
                                No steps available.
                              </p>
                            )}
                          </div>
                        </li>
                      ))
                    ) : (
                      <p className="text-center text-gray-700">
                        No Plans Found
                      </p>
                    )}
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
