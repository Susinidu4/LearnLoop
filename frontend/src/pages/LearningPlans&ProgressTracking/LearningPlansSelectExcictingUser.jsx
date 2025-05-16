import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { getUserById } from "../../service/Profile & Followers Management/AuthService";
import ProfileService from "../../service/Profile & Followers Management/ProfileService";

export const LearningPlansSelectExcistingUser = () => {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [userName, setUserName] = useState("Unknown User");
  const [userImage, setUserImage] = useState("/default-avatar.jpg");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the learning plan by ID
        const res = await fetch(
          `http://localhost:5000/api/learning-plans/${planId}`
        );
        const data = await res.json();
        setPlan(data);

        // Fetch user data
        if (data?.userId) {
          const user = await getUserById(data.userId);
          if (user?.name) setUserName(user.name);

          const image = await ProfileService.getProfileImage(data.userId);
          if (image) setUserImage(image);
        }
      } catch (error) {
        console.error("❌ Error fetching learning plan or user data:", error);
      }
    };

    fetchData();
  }, [planId]);

  if (!plan) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
          <main className="p-6 flex justify-center">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gray-200 p-6">
                <div className="flex items-center space-x-4">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={userName}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        setUserImage(""); // fallback to the circle
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#C1A47D] flex items-center justify-center text-white text-sm">
                      {/* Optional Initials or icon */}
                      {userName ? userName.charAt(0).toUpperCase() : ""}
                    </div>
                  )}
                  <h1 className={`${GlobalStyle.headingMedium}`}>{userName}</h1>
                </div>

                <div className="mt-4 ml-16">
                  <p className={`font-bold ${GlobalStyle.headingSmall}`}>
                    {plan.planTopic || "No Title"}
                  </p>
                  <p className={`${GlobalStyle.headingSmall} text-gray-600`}>
                    {plan.description || "No Description"}
                  </p>
                </div>
              </div>

              {/* Banner */}
              <div className="relative h-64 bg-[#C1A47D]">
                <img
                  src={plan.imageUrl || "/default-banner.jpg"}
                  alt="Banner"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-banner.jpg";
                  }}
                />
              </div>

              {/* Divider */}
              <div className="border-t-2 border-[#E4D6C3]"></div>

              {/* Steps */}
              <div className="p-6 bg-[#D3BBA2]">
                {plan.steps?.length ? (
                  plan.steps.map((step, index) => (
                    <div
                      key={index}
                      className=" p-4 rounded-md shadow-sm border border-[#E4D6C3] mb-4"
                    >
                      <p className="font-semibold text-gray-800 text-sm">
                        Step {step.stepNumber}: {step.topic}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-semibold">Resource:</span>{" "}
                        <a
                          href={step.resourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {step.resourceLink}
                        </a>
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-semibold">Duration:</span>{" "}
                        {step.completionDuration || "N/A"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700 text-sm">No steps available.</p>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
