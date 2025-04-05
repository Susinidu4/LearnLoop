import React from "react";
import { FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import Logo from "../assets/images/logo.png";

export const Header = () => {
  return (
    <header className="fixed z-50 bg-[#2E1A0F] text-white p-2 pr-20 flex justify-between items-center top-0 w-full shadow-md ">
      <div >
        <img src={Logo} alt="Logo" className="w-70 h-20" />
      </div>
      
      {/* Icons Section */}
      <div className="flex items-center gap-6 mr-6">
        {/* Notification Bell */}
        <FaBell className="w-6 h-6 cursor-pointer hover:text-[#CFB397] transition duration-300" title="Notification"/>

        {/* User Profile */}
        <div className="flex items-center gap-6 cursor-pointer hover:text-[#CFB397] transition duration-300">
          <FaCircleUser size={40} title="Profile"/>
          <MdKeyboardArrowDown size={24} title="Profile"/>
        </div>
      </div>

    </header>
  );
};
