import React, { useEffect, useState } from "react"; 
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { Check } from "lucide-react";
import notificationImage from "../../assets/images/notificationImage.png";
import NotificationService from "../../service/Like-Comment-Notification-Management/Notification";

export const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const receiverUserId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await NotificationService.getUserNotifications(receiverUserId);
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [receiverUserId]);

  // Delete a notification by ID
  const deleteNotification = async (notificationId) => {
    try {
      const response = await NotificationService.deleteNotification(notificationId);
      // Since your backend returns 200 without data, we don’t need to check response.status
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const NotificationCard = ({ senderName, action, time, notificationId }) => (
    <div className={`${GlobalStyle.caseCountBar} m-2`}>
      <div className="flex items-center justify-between p-1">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#AE8456] flex items-center justify-center">
            <span className="text-white text-xs">Avatar</span>
          </div>
          <p className="text-sm text-black">
            <span className="font-semibold">{senderName}</span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm">{time}</span>
          <div
            className="bg-[#AE8456] rounded-full p-1 hover:bg-[#543310] transition-colors duration-200 cursor-pointer"
            onClick={() => deleteNotification(notificationId)}
          >
            <Check className="text-white w-4 h-4 hover:text-[#f0e6d2]" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
          <main className="p-6">
            <div className={`${GlobalStyle.cardContainer} w-300 ml-auto`}>
              <div className="h-[550px] overflow-y-auto pr-1 pl-10 scrollbar-thin scrollbar-thumb-[#5e4123] scrollbar-track-transparent">
                {notifications.length > 0 ? (
                  notifications.map((note) => (
                    <NotificationCard
                      key={note.id}
                      senderName={note.message}
                      time={new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      notificationId={note.id}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-600 mt-10">No notifications available.</p>
                )}
              </div>
              <img
                src={notificationImage}
                alt="character"
                className="absolute bottom-8 left-20 w-35 md:w-55"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
