import React, { useState, useRef, useEffect } from "react";
import { FaHome, FaPlus, FaQuestionCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import { GiRead } from "react-icons/gi";
import { TbWorldSearch } from "react-icons/tb";
import { MdInfo, MdPrivacyTip } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import GlobalStyle from "../assets/prototype/GlobalStyle";

const SidebarIcon = ({ icon, onClick, isActive, title, showDropdown, children }) => {
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
      {showDropdown && (
        <div className="absolute left-14 top-0 w-48 bg-[#2F1B06] p-2 rounded-xl shadow-lg space-y-2 z-20">
          {children}
        </div>
      )}
    </div>
  );
};

export const SideBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const menuRef = useRef();
  const createMenuRef = useRef();

  const handleMenuClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleCreateClick = () => {
    setShowCreateMenu((prev) => !prev);
  setShowMenu(false); // Close the other menu if open
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (createMenuRef.current && !createMenuRef.current.contains(event.target)) {
        setShowCreateMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside
      className="
      bg-[#2E1A0F] h-screen w-16 
      flex flex-col items-center 
      fixed left-0 top-0 z-10
      pt-6 pb-6
    "
    >
      {/* Spacer to account for header height */}
      <div className="h-22"></div>

      {/* Centered Navigation Icons */}
      <div
        className="
        flex flex-col items-center 
        gap-6 flex-1 justify-center
      "
      >
        <SidebarIcon
          icon={<FaHome size={20} />}
          onClick={() => navigate("/")}
          isActive={location.pathname === "/"}
          title="Home"
        />
        <SidebarIcon
          icon={<TbWorldSearch size={20} />}
          onClick={() => navigate("/Explore")}
          isActive={location.pathname === "/Explore"}
          title="Explore"
        />
        
        {user && (
          <>
            <div ref={createMenuRef}>
              <SidebarIcon
                icon={<FaPlus size={20} />}
                onClick={handleCreateClick}
                isActive={location.pathname === "/addpost" || location.pathname === "/addvideo"}
                title="Create"
                showDropdown={showCreateMenu}
              >
                <button
                  onClick={() => {
                    navigate("/addpost");
                    setShowCreateMenu(false);
                  }}
                  className="flex items-center gap-2 w-full bg-[#543310] text-white px-3 py-2 rounded-lg hover:bg-[#CFB397] text-sm"
                >
                  Add Post
                </button>
                <button
                  onClick={() => {
                    navigate("/addvideo");
                    setShowCreateMenu(false);
                  }}
                  className="flex items-center gap-2 w-full bg-[#543310] text-white px-3 py-2 rounded-lg hover:bg-[#CFB397] text-sm"
                >
                  Add Video
                </button>
              </SidebarIcon>
            </div>
            <SidebarIcon
              icon={<GiRead size={20} />}
              onClick={() => navigate("/LeaningPlansExistingUser")}
              isActive={location.pathname === "/LeaningPlansExistingUser"}
              title="Learning Plans"
              
            />
             
            <SidebarIcon
              icon={<FaUsers size={20} />}
              onClick={() => navigate("/users")}
              isActive={location.pathname === "/users"}
              title="Users"
            />
          </>
        )}
      </div>

      {/* Bottom Menu - stays at bottom */}
      <div
        className="
        text-[#FFFFFF] cursor-pointer 
        hover:text-gray-300 mb-4
      "
      >
        <RxHamburgerMenu size={20} onClick={handleMenuClick} title="Menu" />

        {showMenu && (
          <div
            ref={menuRef}
            className="absolute left-20 bottom-0 mb-4 w-48 bg-[#2F1B06] p-4 rounded-xl shadow-lg space-y-3 z-20"
          >
            <p className={`${GlobalStyle.headingSmall} text-white`}>
              More Options
            </p>
            <button
              onClick={() => navigate("/aboutUs")}
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
              onClick={() => navigate("/privacypolicy")}
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