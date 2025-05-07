import React, { useState } from "react"; // Import useState here
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import avatar1 from "../../assets/images/male.png";
import { ChevronUp, ChevronDown } from "lucide-react";
import axios from "axios"; // Import axios for API requests

export const AddLearningPlans = () => {
  const [count, setCount] = useState(0); // Correct usage of useState
  const [planTopic, setPlanTopic] = useState(""); // State for Plan Topic
  const [description, setDescription] = useState(""); // State for Description
  const [completionDuration, setCompletionDuration] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [userId, setUserId] = useState(user.id);
  
  const [steps, setSteps] = useState([ // State for the steps
    { topic: "", resourceLink: "", completionDuration: "" },
    { topic: "", resourceLink: "", completionDuration: "" },
    { topic: "", resourceLink: "", completionDuration: "" },
  ]);

  // Handle input change for each step dynamically
  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  // Submit the form data to the backend
  const handleSubmit = async () => {
    const learningPlanData = {
      userId,
      planTopic,
      description,
      stepCount: count,
      completionDuration,
      steps: steps.map((step, index) => ({
        stepNumber: index + 1,
        topic: step.topic,
        resourceLink: step.resourceLink,
        completionDuration: step.completionDuration,
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/learning-plans",
        learningPlanData
      );
      console.log("Learning Plan Created:", response.data);
      // Reset the form after successful submission
      setPlanTopic("");
      setDescription("");
      setCompletionDuration("");
      setCount(0);
      setSteps([
        { topic: "", resourceLink: "", completionDuration: "" },
        { topic: "", resourceLink: "", completionDuration: "" },
        { topic: "", resourceLink: "", completionDuration: "" },
      ]);

      // Show success alert
      alert("Learning Plan submitted successfully!");
    } catch (error) {
      console.error("Error creating learning plan:", error);
      alert("Failed to submit learning plan. Please try again.");
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16 ">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
          <main className="p-4 sm:p-6 md:p-8 lg:p-12">
            <div className={`${GlobalStyle.cardContainer} w-full flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 max-w-3xl mx-auto shadow-lg rounded-lg`}>
              <div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-18 h-18 rounded-full bg-[#AE8456] flex items-center justify-center overflow-hidden">
                    <img src={avatar1} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm text-black">
                    <span className={`${GlobalStyle.headingSmall} font-semibold`}>
                      Kavishka Perera
                    </span>
                  </p>
                </div>
                <br />
                <br />

                {/* Plan Topic */}
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Plan Topic</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={planTopic}
                    onChange={(e) => setPlanTopic(e.target.value)} // Update state on input change
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Description</label>
                  <textarea
                    value={description}
                    className={`${GlobalStyle.remark} w-[600px]`}
                    rows="5"
                    onChange={(e) => setDescription(e.target.value)} // Update state on input change
                  ></textarea>
                </div>

                {/* Step Count */}
                <div className="space-y-2 pb-6 flex items-center">
                  <div className={GlobalStyle.textBoxTopic}>Step Count :</div>
                  <div className=" w-20 border-[#543310] border-2 rounded-lg p-1 flex justify-center items-center ml-4">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-semibold text-gray-800">{count}</span>
                      <div className="flex flex-col">
                        <button
                          onClick={() => setCount((prev) => prev + 1)}
                          className="hover:bg-[#9b7355] rounded p-0.5 transition-colors"
                        >
                          <ChevronUp className="w-4 h-4 text-gray-800" />
                        </button>
                        <button
                          onClick={() => setCount((prev) => Math.max(0, prev - 1))}
                          className="hover:bg-[#9b7355] rounded p-0.5 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4 text-gray-800" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plan Completion Duration */}
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Plan Completion Duration</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={completionDuration}
                    onChange={(e) => setCompletionDuration(e.target.value)} // Update state on input change
                  />
                </div>

                {/* Step 1 */}
                <h3 className={`${GlobalStyle.paragraph} pb-3`}>Step 1:</h3>
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Topic</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={steps[0].topic}
                    onChange={(e) => handleStepChange(0, "topic", e.target.value)} // Handle step input
                  />
                </div>

                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Resource Link</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={steps[0].resourceLink}
                    onChange={(e) => handleStepChange(0, "resourceLink", e.target.value)} // Handle step input
                  />
                </div>

                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Completion Duration</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={steps[0].completionDuration}
                    onChange={(e) => handleStepChange(0, "completionDuration", e.target.value)} // Handle step input
                  />
                </div>

                {/* Step 2 */}
                <h3 className={`${GlobalStyle.paragraph} pb-3`}>Step 2:</h3>
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Topic</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={steps[1].topic}
                    onChange={(e) => handleStepChange(1, "topic", e.target.value)} // Handle step input
                  />
                </div>

                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Resource Link</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={steps[1].resourceLink}
                    onChange={(e) => handleStepChange(1, "resourceLink", e.target.value)} // Handle step input
                  />
                </div>

                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Completion Duration</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={steps[1].completionDuration}
                    onChange={(e) => handleStepChange(1, "completionDuration", e.target.value)} // Handle step input
                  />
                </div>

                {/* Step 3 */}
                <h3 className={`${GlobalStyle.paragraph} pb-3`}>Step 3:</h3>
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Topic</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={steps[2].topic}
                    onChange={(e) => handleStepChange(2, "topic", e.target.value)} // Handle step input
                  />
                </div>

                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Resource Link</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={steps[2].resourceLink}
                    onChange={(e) => handleStepChange(2, "resourceLink", e.target.value)} // Handle step input
                  />
                </div>

                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Completion Duration</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={steps[2].completionDuration}
                    onChange={(e) => handleStepChange(2, "completionDuration", e.target.value)} // Handle step input
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 justify-end w-full">
                  <button onClick={handleSubmit} className={GlobalStyle.buttonPrimary}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
