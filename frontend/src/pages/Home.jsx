import React from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";

export const Home = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16"> 
        <Header />
        <main>
           
        </main>
      </div>
    </div>
  );
};