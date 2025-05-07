import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added useNavigate
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import ProfileService from "../../service/Profile & Followers Management/ProfileService";

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
                alt={author}
                className="w-8 h-8 rounded-full object-cover" // Make it circular
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-avatar.jpg"; // Fallback image if user image not found
                }}
              />
            </div>
            {/* Display user name here */}
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

  const [learningPlans, setLearningPlans] = useState([]); // State to store fetched data
  const [userNames, setUserNames] = useState({}); // State to store fetched user names

  // Fetch learning plans data from the backend
  useEffect(() => {
    const fetchLearningPlans = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/learning-plans"
        ); // Endpoint to get all learning plans
        const data = await response.json(); // Assuming the response is a JSON array
        setLearningPlans(data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching learning plans:", error);
      }
    };

    fetchLearningPlans(); // Call the function to fetch data
  }, []);

  // Fetch user names based on userId
  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};
      for (const plan of learningPlans) {
        const name = await fetchUserName(plan.userId);
        names[plan.userId] = name;
      }
      setUserNames(names); // Store names in state
    };

    if (learningPlans.length > 0) {
      fetchUserNames(); // Fetch names only after learning plans are fetched
    }
  }, [learningPlans]);

  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`); // Endpoint to get user details
      const data = await response.json();
      return data.name; // Assuming the response includes the 'name' field
    } catch (error) {
      console.error("Error fetching user name:", error);
      return "Unknown User"; // Default value in case of error
    }
  };

  const handleClick = () => {
    navigate("/AddLearningPlans");
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
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
                const imageUrl = ProfileService.getProfileImageUrl(item.userId);
                return (
                  <Card
                    key={index}
                    title={item.planTopic}
                    description={item.description}
                    author={item.author}
                    cardData={item}
                    imageUrl={imageUrl}
                    userId={item.userId}
                    userName={userNames[item.userId] || "Loading..."} // Pass user name
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
