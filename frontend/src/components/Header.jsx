import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import Logo from "../assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import NotificationService from "../service/Like-Comment-Notification-Management/Notification";

export const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user?.id) {
        try {
          const notifications = await NotificationService.getUserNotifications(user.id);
          // Count unread notifications (assuming there's a 'read' status field)
          const unreadCount = notifications.filter(n => !n.read).length;
          setNotificationCount(unreadCount);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
    
    // Optional: Set up polling to refresh notifications periodically
    const interval = setInterval(fetchNotifications, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, [user?.id]);

  const handleNotificationClick = () => {
    navigate("/notification");
    // Optionally mark notifications as read when clicked
    setNotificationCount(0);
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
    <header className="fixed z-50 bg-[#2E1A0F] text-white p-2 pr-20 flex justify-between items-center top-0 w-full shadow-md">
      <div>
        <img src={Logo} alt="Logo" className="w-60 h-15" />
      </div>

      {user ? (
        <div className="flex items-center gap-6 mr-6">
          {/* Notification Bell with Count Badge */}
          <div className="relative">
            <FaBell
              className="w-6 h-6 cursor-pointer hover:text-[#CFB397] transition duration-300"
              onClick={handleNotificationClick}
              title="Notification"
            />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </div>

          {/* User Profile */}
          <div
            className="flex items-center gap-6 cursor-pointer hover:text-[#CFB397] transition duration-300"
            onClick={handleProfileClick}
          >
            <FaCircleUser size={30} title="Profile" />
          </div>

          {/* Logout */}
          <div
            className="flex items-center gap-6 cursor-pointer hover:text-[#CFB397] transition duration-300"
            onClick={handleLogoutClick}
          >
            <RiLogoutCircleRLine size={25} title="Logout" />
          </div>
        </div>
      ) : (
        <Link
          to="/userlogin"
          className="flex items-center gap-6 cursor-pointer hover:text-[#CFB397] transition duration-300"
        >
          <FaUser size={40} title="userlogin" />
        </Link>
      )}
    </header>
  );
};