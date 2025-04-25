import React, { useState } from "react"; // Import useState here
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import avatar1 from "../../assets/images/male.png";
import { ChevronUp, ChevronDown } from "lucide-react";
import LearningPlanImg from "../../assets/images/LearningPlanImg.png";

export const AddLearningPlans = () => {
  const [count, setCount] = useState(0); // Correct usage of useState
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
          <main className="p-4 sm:p-6 md:p-8 lg:p-12">
            <div className={`${GlobalStyle.cardContainer} w-full flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 max-w-3xl mx-auto shadow-lg rounded-lg`}>
              <div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-18 h-18 rounded-full bg-[#AE8456] flex items-center justify-center overflow-hidden">
                    <img
                      src={avatar1}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-black">
                    <span
                      className={`${GlobalStyle.headingSmall}font-semibold`}
                    >
                      Kavishka Perera
                    </span>
                  </p>
                </div>
                <br />
                <br />

                {/* textbox 2 */}
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Plan Topic</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                  />
                </div>
                {/* remark box */}
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Description</label>
                  <textarea
                    value=""
                    className={`${GlobalStyle.remark} w-[600px]`}
                    rows="5"
                  ></textarea>
                </div>

                <div className="space-y-2 pb-6 flex items-center">
                  <div className={GlobalStyle.textBoxTopic}>Step Count :</div>

                  <div className=" w-20 border-[#543310] border-2 rounded-lg p-1 flex justify-center items-center ml-4">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-semibold text-gray-800">
                        {count}
                      </span>

                      <div className="flex flex-col">
                        <button
                          onClick={() => setCount((prev) => prev + 1)}
                          className="hover:bg-[#9b7355] rounded p-0.5 transition-colors"
                        >
                          <ChevronUp className="w-4 h-4 text-gray-800" />
                        </button>
                        <button
                          onClick={() =>
                            setCount((prev) => Math.max(0, prev - 1))
                          }
                          className="hover:bg-[#9b7355] rounded p-0.5 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4 text-gray-800" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* textbox 2 */}
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>
                    Plan Completion Duration
                  </label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                  />
                </div>

                <h3 className={`${GlobalStyle.paragraph} pb-3`}>Step 1:</h3>

                {/* textbox 2 */}
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Topic</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                  />
                </div>
                {/* textbox 2 */}
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>
                    Resource Link
                  </label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                  />
                </div>
                {/* textbox 2 */}
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>
                    Completion Duration
                  </label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                  />
                </div>

                <h3 className={`${GlobalStyle.paragraph} pb-3`}>Step 2:</h3>

                {/* textbox 2 */}
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>Topic</label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                  />
                </div>
                {/* textbox 2 */}
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>
                    Resource Link
                  </label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                  />
                </div>
                {/* textbox 2 */}
                <div className="mb-6">
                  <label className={GlobalStyle.remarkTopic}>
                    Completion Duration
                  </label>
                  <input
                    type="text"
                    placeholder="Text here"
                    className={`${GlobalStyle.inputText} w-[600px]`}
                  />
                </div>
                {/* button 1*/}
                <div className="flex gap-4 justify-end w-full">
                  <button className={GlobalStyle.buttonPrimary}>Submit</button>
                </div>
              </div> 
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
