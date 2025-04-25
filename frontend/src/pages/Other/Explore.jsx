import React from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { FaSearch } from "react-icons/fa";
import explore from "../../assets/images/explore.png";

export const Explore = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
          <main className="p-6">

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              

              {/* Body */}
              <div className="flex flex-col items-center justify-start mt-10 space-y-10 px-6">
                {/* Search Bar */}
                <div className="relative w-full max-w-2xl">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#402006]"
                  />
                  <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600" />
                </div>

                {/* Category Buttons */}
                <div className="flex flex-wrap gap-6 justify-center">
                  {["Coding", "Cooking", "DIY Craft", "Photography"].map(
                    (category, index) => (
                      <button
                        key={index}
                        className="bg-[#e5d2be] hover:bg-[#d8bfa7] px-8 py-4 rounded-xl shadow-md text-lg font-semibold transition"
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>

                {/* Illustration */}
                <div className="mt-10">
                  <img
                    src={explore} // Replace with your image path
                    alt="Learning Illustration"
                    className="w-80 h-auto"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
