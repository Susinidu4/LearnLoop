import React, { useState } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import GlobalStyle from "../assets/prototype/GlobalStyle";
import { HomePost } from "./PostAndInteraction/HomePost";
import { AllVideos } from "./PostAndInteraction/AllVideos";

export const Home = () => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
          <main className="p-6 space-y-6 flex flex-col items-center">
            {/* Tabs Navigation */}
            <div className="flex justify-center space-x-6  border-gray-300 w-full max-w-4xl">
              <button
                onClick={() => setActiveTab("posts")}
                className={`pb-2 text-lg font-medium ${
                  activeTab === "posts"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Posts
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`pb-2 text-lg font-medium ${
                  activeTab === "videos"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Videos
              </button>
            </div>

            {/* Conditional Rendering */}
            <div className="mt-8 w-full max-w-4xl">
              {activeTab === "posts" && <HomePost />}
              {activeTab === "videos" && <AllVideos />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
