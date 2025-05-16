import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
// import { MdKeyboardArrowDown } from "react-icons/md";
import Logo from "../assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";

export const Header = () => {
  const navigate = useNavigate(); // for navigation
  const user = JSON.parse(localStorage.getItem("user"));

  const handleNotificationClick = () => {
    navigate("/notification");
  };

  const handleProfileClick = () => {
    navigate("/userprofile");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="fixed z-50 bg-[#2E1A0F] text-white p-2 pr-20 flex justify-between items-center top-0 w-full shadow-md ">
      <div>
        <img src={Logo} alt="Logo" className="w-60 h-15" />
      </div>

      {/* Icons Section */}
      {user ? (
        <div className="flex items-center gap-6 mr-6">
          {/* Notification Bell */}
          <FaBell
            className="w-6 h-6 cursor-pointer hover:text-[#CFB397] transition duration-300"
            onClick={handleNotificationClick}
            title="Notification"
          />

          {/* User Profile */}
          <div
            className="flex items-center gap-6 cursor-pointer hover:text-[#CFB397] transition duration-300"
            onClick={handleProfileClick}
          >
            <FaCircleUser size={30} title="Profile" />
            {/* <MdKeyboardArrowDown size={24} title="Profile" /> */}
          </div>

          <div
            className="flex items-center gap-6 cursor-pointer hover:text-[#CFB397] transition duration-300"
            onClick={handleProfileClick}
          >
            <RiLogoutCircleRLine
              onClick={handleLogoutClick}
              size={25}
              title="userlogin"
            />
          </div>
        </div>
      ) : (
        <Link
          to="/userlogin"
          className="flex items-center gap-6 cursor-pointer hover:text-[#CFB397] transition duration-300"
        >
          <FaUser size={40} title="userlogin" />
          {/* <MdKeyboardArrowDown size={24} title="userlogin" /> */}
        </Link>
      )}
    </header>
  );
};
