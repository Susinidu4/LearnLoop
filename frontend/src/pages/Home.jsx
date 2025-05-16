import React from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import GlobalStyle from "../assets/prototype/GlobalStyle";
import { HomePost } from "./PostAndInteraction/HomePost";


export const Home = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
           {/* Page Heading */}
           {/* <h1 className={GlobalStyle.headingLarge}>Welcome to the Home Page</h1> */}
          <main className="p-6 space-y-6 flex flex-col items-center">
            {/*  Search Bar */}
            

            <HomePost/>

          </main>
        </div>
      </div>
    </div>
  );
};
