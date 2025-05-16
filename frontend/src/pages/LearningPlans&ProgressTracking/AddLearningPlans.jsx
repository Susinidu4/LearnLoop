import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import avatar1 from "../../assets/images/male.png";
import { ChevronUp, ChevronDown } from "lucide-react";
import axios from "axios";
import ProfileService from "../../service/Profile & Followers Management/ProfileService";

export const AddLearningPlans = () => {
  const [count, setCount] = useState(0);
  const [planTopic, setPlanTopic] = useState("");
  const [description, setDescription] = useState("");
  const [completionDuration, setCompletionDuration] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [userId, setUserId] = useState(user.id);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [steps, setSteps] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const imageUrl = await ProfileService.getProfileImage(userId);
        setProfileImageUrl(imageUrl);
      } catch (err) {
        console.error("Could not load profile image", err);
      }
    };

    if (userId) fetchProfileImage();
  }, [userId]);

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  const handleStepCountChange = (newCount) => {
    if (newCount < 0 || newCount > 5) return;
    setCount(newCount);
    const updatedSteps = [...steps];

    if (newCount > steps.length) {
      for (let i = steps.length; i < newCount; i++) {
        updatedSteps.push({
          topic: "",
          resourceLink: "",
          completionDuration: "",
        });
      }
    } else {
      updatedSteps.length = newCount;
    }

    setSteps(updatedSteps);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("planTopic", planTopic);
    formData.append("description", description);
    formData.append("stepCount", count);
    formData.append("completionDuration", completionDuration);

    steps.forEach((step, index) => {
      formData.append(`steps[${index}].stepNumber`, index + 1);
      formData.append(`steps[${index}].topic`, step.topic);
      formData.append(`steps[${index}].resourceLink`, step.resourceLink);
      formData.append(
        `steps[${index}].completionDuration`,
        step.completionDuration
      );
    });

    if (bannerImage) {
      formData.append("image", bannerImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/learning-plans",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Learning Plan submitted successfully!");
      setPlanTopic("");
      setDescription("");
      setCompletionDuration("");
      setCount(0);
      setSteps([]);
      setBannerImage(null);
    } catch (error) {
      console.error("Error creating learning plan:", error);
      alert("Failed to submit learning plan. Please try again.");
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
          <main className="p-4 sm:p-6 md:p-8 lg:p-12">
            <div
              className={`${GlobalStyle.cardContainer} w-full bg-[#F0E0D1] flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 max-w-3xl mx-auto shadow-lg rounded-lg`}
            >
              <div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-15 h-15 rounded-full bg-[#AE8456] flex items-center justify-center overflow-hidden">
                    <img
                      src={profileImageUrl || avatar1}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-black">
                    <span
                      className={`${GlobalStyle.headingSmall} font-semibold`}
                    >
                      {user.name}
                    </span>
                  </p>
                </div>

                <div className="mb-6 mt-6">
                  <label className={GlobalStyle.remarkTopic}>Plan Topic</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={planTopic}
                    onChange={(e) => setPlanTopic(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Description</label>
                  <textarea
                    value={description}
                    className={`${GlobalStyle.remark} w-[600px]`}
                    rows="5"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>
                    Plan Completion Duration
                  </label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                    value={completionDuration}
                    onChange={(e) => setCompletionDuration(e.target.value)}
                  />
                </div>

                <div className="mb-6 w-[600px]">
                  <label className={GlobalStyle.remarkTopic}>Banner</label>
                  <div className="relative mt-1">
                    <input
                      type="file"
                      accept="image/*"
                      id="bannerUpload"
                      onChange={(e) => setBannerImage(e.target.files[0])}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between border-2 border-[#543310] rounded-lg overflow-hidden">
                      <div className="px-4 py-2 text-[#543310] text-sm w-full">
                        Upload banner image
                      </div>
                      <label
                        htmlFor="bannerUpload"
                        className="flex items-center justify-center w-12 cursor-pointer border-l border-[#543310] hover:bg-[#dbc0a8]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#2e3c2f]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pb-6 flex items-center">
                  <div className={GlobalStyle.textBoxTopic}>Step Count :</div>
                  <div className="w-20 border-[#543310] border-2 rounded-lg p-1 flex justify-center items-center ml-4">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-semibold text-gray-800">
                        {count}
                      </span>
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleStepCountChange(count + 1)}
                          className="hover:bg-[#9b7355] rounded p-0.5 transition-colors"
                        >
                          <ChevronUp className="w-4 h-4 text-gray-800" />
                        </button>
                        <button
                          onClick={() =>
                            handleStepCountChange(Math.max(0, count - 1))
                          }
                          className="hover:bg-[#9b7355] rounded p-0.5 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4 text-gray-800" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {steps.map((step, index) => (
                  <div key={index} className="mb-8">
                    <h3 className={`${GlobalStyle.paragraph} pb-3`}>
                      Step {index + 1}:
                    </h3>

                    <div className="mb-4">
                      <label className={GlobalStyle.remarkTopic}>Topic</label>
                      <input
                        type="text"
                        placeholder="Text here"
                        className={`${GlobalStyle.inputText} w-[600px]`}
                        value={step.topic}
                        onChange={(e) =>
                          handleStepChange(index, "topic", e.target.value)
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label className={GlobalStyle.remarkTopic}>
                        Resource Link
                      </label>
                      <input
                        type="text"
                        placeholder="Text here"
                        className={`${GlobalStyle.inputText} w-[600px]`}
                        value={step.resourceLink}
                        onChange={(e) =>
                          handleStepChange(
                            index,
                            "resourceLink",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label className={GlobalStyle.remarkTopic}>
                        Completion Duration
                      </label>
                      <input
                        type="text"
                        placeholder="Text here"
                        className={`${GlobalStyle.inputText} w-[600px]`}
                        value={step.completionDuration}
                        onChange={(e) =>
                          handleStepChange(
                            index,
                            "completionDuration",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

                <div className="flex gap-4 justify-end w-full">
                  <button
                    onClick={handleSubmit}
                    className={GlobalStyle.buttonSecondary}
                  >
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
