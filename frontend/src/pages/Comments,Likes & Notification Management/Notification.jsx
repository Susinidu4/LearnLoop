import React from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { Check } from "lucide-react";
import notificationImage from "../../assets/images/notificationImage.png";
import avatar1 from "../../assets/images/male.png";
import avatar2 from "../../assets/images/female.png";

export const Notification = () => {
  const notifications = [
    {
      name: "Kavishka Perera",
      action: "Commented on Your Post",
      time: "1h",
      avatar: avatar1,
    },
    {
      name: "Kavishka Perera",
      action: "Liked on Your Post",
      time: "12h",
      avatar: avatar1,
    },
    {
      name: "Sanduni Nimsara",
      action: "has started following you",
      time: "12h",
      avatar: avatar2,
    },
    {
      name: "Kavishka Perera",
      action: "Commented on Your Post",
      time: "15h",
      avatar: avatar1,
    },
    {
      name: "Kasun Randil",
      action: "Liked on Your Post",
      time: "15h",
      avatar: avatar2,
    },
  ];

  const NotificationCard = ({ name, action, time, avatar }) => (
    <div className={`${GlobalStyle.caseCountBar} m-2 `}>
      <div className="flex items-center justify-between p-1 ">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#AE8456] flex items-center justify-center overflow-hidden">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-xs">Avatar</span>
            )}
          </div>
          <p className="text-sm text-black">
            <span className="font-semibold">{name}</span> {action}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold">{time}</span>
          <div className="bg-[#AE8456] rounded-full p-1 hover:bg-[#543310] transition-colors duration-200">
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
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
          <main className="p-6">
            {/* Right-aligned container */}
            <div className={`${GlobalStyle.cardContainer} w-300 ml-auto`}>
              <div className="h-[550px] overflow-y-auto pr-1 pl-10 scrollbar-thin scrollbar-thumb-[#5e4123] scrollbar-track-transparent ">
                {notifications.map((note, idx) => (
                  <NotificationCard key={idx} {...note} />
                ))}
              </div>
              <img
                src={notificationImage}
                alt="character"
                className="absolute bottom-5 left-20 w-38 md:w-50"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
