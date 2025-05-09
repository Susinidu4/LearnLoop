import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import ProfileService from "../../service/Profile & Followers Management/ProfileService";
import { getUserById } from "../../service/Profile & Followers Management/AuthService";


// Card Component
const Card = ({ title, description, author, cardData, imageUrl, userId, userName }) => {
  return (
    <Link
      to={{
        pathname: `/LearningPlansSelectExcistingUser/${cardData.userId}`,
        state: { cardData },
      }}
    >
      <div className="rounded-2xl overflow-hidden shadow-md bg-[#CFB397]">
        {/* Display the uploaded banner image */}
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${cardData.imageUrl})` }}
        ></div>
        <div className="bg-[#d9d9d9] p-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-sm sm:text-base">{title}</h2>
            <p className="text-xs sm:text-sm text-gray-700 mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#9f7f50]">
              {/* User Image as Avatar */}
              <img
                src={imageUrl}
                alt={userName}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-avatar.jpg";
                }}
              />
            </div>
            <span className="text-sm font-semibold text-black">{userName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Main Component
export const LeraningPlansExistingUser = () => {
  const navigate = useNavigate();
  const [learningPlans, setLearningPlans] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [userImages, setUserImages] = useState({});

  // Fetch learning plans data from the backend
  useEffect(() => {
    const fetchLearningPlans = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/learning-plans");
        const data = await response.json();
        setLearningPlans(data);
      } catch (error) {
        console.error("Error fetching learning plans:", error);
      }
    };

    fetchLearningPlans();
  }, []);

  // Fetch user names and profile images
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const names = {};
        const images = {};
        
        // Process each learning plan to fetch user data
        for (const plan of learningPlans) {
          try {
            // Fetch user name
            const user = await getUserById(plan.userId);
            names[plan.userId] = user.name;
            
            // Fetch profile image
            const imageUrl = await ProfileService.getProfileImage(plan.userId);
            images[plan.userId] = imageUrl || "/default-avatar.jpg";
          } catch (error) {
            console.error(`Error fetching data for user ${plan.userId}:`, error);
            names[plan.userId] = "Unknown User";
            images[plan.userId] = "/default-avatar.jpg";
          }
        }
        
        setUserNames(names);
        setUserImages(images);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (learningPlans.length > 0) {
      fetchUserData();
    }
  }, [learningPlans]);

  const handleClick = () => {
    navigate("/AddLearningPlans");
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
          <main className="p-6">
            <div className="flex">
              <button
                onClick={handleClick}
                className={`${GlobalStyle.buttonSecondary} ml-auto`}
              >
                Add a learning Plan
              </button>
            </div>

            <div className="flex flex-col gap-8 max-w-4xl mx-auto mt-8">
              {learningPlans.map((item, index) => {
                const userName = userNames[item.userId] || "Unknown User";
                const userImage = userImages[item.userId] || "/default-avatar.jpg";
                
                return (
                  <Card
                    key={index}
                    title={item.planTopic}
                    description={item.description}
                    author={userName}
                    cardData={item}
                    imageUrl={userImage}
                    userId={item.userId}

                    userName={userName}

                  />
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};