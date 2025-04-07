import React from "react";
import { FaHome, FaPlus} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import { GiRead } from "react-icons/gi";
import { TbWorldSearch } from "react-icons/tb";

const SidebarIcon = ({ icon, onClick, isActive, title }) => {
  return (
    <div className="relative group">
      <div
        className={`
          flex items-center justify-center
          w-10 h-10 rounded-lg cursor-pointer
          transition-colors duration-200
          ${isActive ? "bg-[#CFB397]" : "bg-[#8B5E3C] hover:bg-[#CFB397]"}
        `}
        onClick={onClick}
        title={title}
      >
        {icon}
      </div>
    </div>
  );
};

export const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="
      bg-[#2E1A0F] h-screen w-16 
      flex flex-col items-center 
      fixed left-0 top-0 z-10
      pt-6 pb-6
    ">
      {/* Spacer to account for header height */}
      <div className="h-24"></div>

      {/* Centered Navigation Icons */}
      <div className="
        flex flex-col items-center 
        gap-6 flex-1 justify-center
      ">
        <SidebarIcon
          icon={<FaHome size={20} />}
          onClick={() => navigate("/")}
          isActive={location.pathname === "/"}
          title="Home"
        />
        <SidebarIcon
          icon={<TbWorldSearch size={20} />}
          onClick={() => navigate("/explore")}
          isActive={location.pathname === "/explore"}
          title="Explore"
        />
        <SidebarIcon
          icon={<FaPlus size={20} />}
          onClick={() => navigate("/addpost")}
          isActive={location.pathname === "/addpost"}
          title="Create"
        />
        <SidebarIcon
          icon={<GiRead size={20} />}
          onClick={() => navigate("/help")}
          isActive={location.pathname === "/help"}
          title="Help"
        />
      </div>

      {/* Bottom Menu - stays at bottom */}
      <div className="
        text-[#FFFFFF] cursor-pointer 
        hover:text-gray-300 mb-4
      ">
        <RxHamburgerMenu size={20} title="Menu" />
      </div>
    </aside>
  );
};