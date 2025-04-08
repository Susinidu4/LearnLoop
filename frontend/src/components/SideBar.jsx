import React, { useState, useRef, useEffect } from "react";
import { FaHome, FaPlus, FaQuestionCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import { GiRead } from "react-icons/gi";
import { TbWorldSearch } from "react-icons/tb";
import { MdInfo, MdPrivacyTip } from "react-icons/md";
import GlobalStyle from "../assets/prototype/GlobalStyle";

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

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(); 

  const handleMenuClick = () => {
    setShowMenu((prev) => !prev);
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

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
        <RxHamburgerMenu size={20} onClick={handleMenuClick} title="Menu" />
        
        {showMenu && (
          <div
            ref={menuRef} 
            className="absolute left-20 bottom-0 mb-4 w-48 bg-[#2F1B06] p-4 rounded-xl shadow-lg space-y-3 z-20"
          >
            <p className={`${GlobalStyle.headingSmall} text-white`}>More Options</p>
            <button
              onClick={() => navigate("/aboutus")}
              className="flex items-center gap-2 w-full bg-[#543310] text-white px-3 py-2 rounded-lg hover:bg-[#CFB397]"
            >
              <MdInfo size={18} />
              About Us
            </button>
            <button
              onClick={() => navigate("/FAQ")}
              className="flex items-center gap-2 w-full bg-[#543310] text-white px-3 py-2 rounded-lg hover:bg-[#CFB397]"
            >
              <FaQuestionCircle size={18} />
              FAQ
            </button>
            <button
              onClick={() => navigate("#")}
              className="flex items-center gap-2 w-full bg-[#543310] text-white px-3 py-2 rounded-lg hover:bg-[#CFB397]"
            >
              <MdPrivacyTip size={18} />
              Privacy Policy
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
