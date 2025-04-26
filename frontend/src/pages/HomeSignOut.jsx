import React from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import GlobalStyle from "../assets/prototype/GlobalStyle";
import hatman from "../assets/images/hatman.png";
import books from "../assets/images/books.png";


export const HomeSignOut = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#f5eade] min-h-screen pt-24`}>
          <main className="p-6">
            {/* Header Section */}
            <div className="bg-[#f8ede1] rounded-xl p-6 flex justify-between items-center shadow-md border border-[#e2d3c0]">
              <div className="text-xl font-semibold text-[#3d3d3d]">
                Welcome to LearnLoop
              </div>
              <div className="flex items-end gap-2">
                <img src={hatman} alt="Hat Man" className="h-28" />
                <img src={books} alt="Books" className="h-20 -ml-4" />
              </div>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-4 gap-6 mt-10">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-40 rounded-xl bg-[#e7d7c4] shadow-sm hover:shadow-lg transition duration-300"
                ></div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};