import React from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import GlobalStyle from "../assets/prototype/GlobalStyle";
import { HomePost } from "./PostAndInteraction/HomePost";
import { FaSearch } from "react-icons/fa"; // Import the search icon

export const Home = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
           {/* Page Heading */}
           <h1 className={GlobalStyle.headingLarge}>Welcome to the Home Page</h1>
          <main className="p-6 space-y-6 flex flex-col items-center">
            {/*  Search Bar */}
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#402006]"
              />
              <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600" />
            </div>

            {/* <h1 className={GlobalStyle.headingLarge}></h1> */}
            {/* Your content goes here */}
            <HomePost/>

          </main>
        </div>
      </div>
    </div>
  );
};
