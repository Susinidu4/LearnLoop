import React from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import GlobalStyle from "../assets/prototype/GlobalStyle";
import homeMan from "../assets/images/homeMan.png";


export const HomeSignOut = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16 bg-[#f5eade] min-h-screen">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} pt-24 px-8`}>
          {/* Welcome Banner */}
          <section className="bg-[#f8ede1] rounded-2xl p-8 flex justify-between items-center shadow-lg border border-[#e2d3c0] transition-all duration-500">
            <div>
              <h1 className="text-3xl font-bold text-[#3d3d3d] mb-2">
                Welcome to <span className="text-[#a97c50]">LearnLoop</span>
              </h1>
              <p className="text-[#6b5c47] text-md">
                Discover new posts, updates, and announcements tailored just for you.
              </p>
            </div>
            <img
              src={homeMan}
              alt="Home Illustration"
              className="h-32 md:h-40 transition-transform hover:scale-105"
            />
          </section>

          {/* Post Grid Section */}
          <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-[#fff7ee] rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between"
              >
                {/* Image Placeholder */}
                <div className="h-28 bg-[#e7d7c4] rounded-xl mb-4"></div>

                {/* Post Info */}
                <h2 className="text-lg font-semibold text-[#3d3d3d] mb-1">
                  Post Title {idx + 1}
                </h2>
                

          
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};
