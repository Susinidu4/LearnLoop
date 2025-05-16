import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import GlobalStyle from "../assets/prototype/GlobalStyle/";
import { getUserById } from "../service/Profile & Followers Management/AuthService"

export function LearningPlansDetailCard() {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [createdByName, setCreatedByName] = useState("Loading...");

  useEffect(() => {
    const fetchPlanAndUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/learning-plans/${id}`
        );
        if (!res.ok) {
          console.error("Failed to fetch plan", res.status);
          return;
        }

        const data = await res.json();
        setPlan(data);

        // Fetch the creator's name using plan.createdBy
        if (data.userId) {
          try {
            const user = await getUserById(data.userId);
            setCreatedByName(user.name || "Unknown User");
          } catch (userErr) {
            console.error("Failed to fetch user", userErr);
            setCreatedByName("Unknown User");
          }
        } else {
          setCreatedByName("Unknown User");
        }
      } catch (err) {
        console.error("Fetch error", err);
      }
    };

    fetchPlanAndUser();
  }, [id]);

  const handleMarkCompleted = async (stepNumber) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/learning-plans/${id}/steps/${stepNumber}/status?status=completed`,
        {
          method: "PUT",
        }
      );

      if (res.ok) {
        const updatedSteps = plan.steps.map((step) =>
          step.stepNumber === stepNumber
            ? { ...step, status: "completed" }
            : step
        );
        setPlan({ ...plan, steps: updatedSteps });
      } else {
        console.error("Failed to update step status");
      }
    } catch (error) {
      console.error("Error updating step status", error);
    }
  };

  if (!plan) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24 px-6`}
        >
          <div className="flex justify-center pt-10">
            <div
              className={`${GlobalStyle.cardContainer} bg-[#E2D0BD] bg-opacity-15 w-10/12 max-w-5xl`}
            >
              <div className="flex items-center justify-between bg-gray-200 p-4 rounded-t-2xl shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#9C8259]" />
                  <div>
                    <h2 className="font-bold text-base">{createdByName}</h2>
                    <p className="text-sm text-gray-700 font-semibold">
                      {plan.planTopic}
                    </p>
                    <p className="text-xs text-gray-600">{plan.description}</p>
                  </div>
                </div>
              </div>

              {/* banner */}
              {plan.bannerImageUrl && (
                <div className="w-full h-64 overflow-hidden rounded-t-2xl">
                  <img
                    src={plan.bannerImageUrl}
                    alt="Learning Plan Banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="border-t border-white my-6" />

              {/* Completion Duration */}
              <div className="text-right font-semibold pr-4 text-sm mb-4">
                Duration: {plan.completionDuration}
              </div>

              {/* Learning Steps */}
              <div className="space-y-4 pb-10">
                {plan.steps?.map((step, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-[#D0B692] border-2 border-[#3B2B1D] rounded-2xl shadow"
                  >
                    <div>
                      <h4 className="font-medium text-sm">
                        {index + 1}. {step.topic}
                      </h4>
                      <p className="text-xs font-semibold mt-1">
                        Resource:{" "}
                        <a
                          href={step.resourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="italic underline text-gray-800"
                        >
                          {step.resourceLink}
                        </a>
                      </p>
                    </div>
                    <div className="text-right space-y-2 text-sm font-semibold">
                      <div>{step.completionDuration}</div>
                      {step.status === "not completed" ? (
                        <button
                          className="text-[10px] bg-[#3B2B1D] text-white px-4 py-1 rounded-full hover:opacity-90 transition"
                          onClick={() => handleMarkCompleted(step.stepNumber)}
                        >
                          Mark as Completed
                        </button>
                      ) : (
                        <span className="text-[10px] bg-[#3B2B1D] text-white px-4 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
