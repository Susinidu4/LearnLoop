import React from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import postGirl from "../../assets/Images/postgirl.png";

export const AddPost = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
          <main className="p-6">

            
            {/* Your content goes here */}
            
          </main>
        </div>
      </div>
    </div>
  );
};
