import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import ProfileService from "../service/Profile & Followers Management/ProfileService"; // Adjust the path as needed

export function LearningPlansCard() {
  const [learningPlans, setLearningPlans] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.id) return;

        // Load learning plans
        const response = await fetch(`http://localhost:5000/api/learning-plans/user/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setLearningPlans(data);
        } else {
          console.error("Error fetching learning plans");
        }

        // Load profile image
        const imageUrl = await ProfileService.getProfileImage(user.id);
        if (imageUrl) {
          setProfileImage(imageUrl);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [user?.id]);

  const handleDelete = async (planId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/learning-plans/${planId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLearningPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== planId));
        alert("Learning plan deleted successfully");
      } else {
        console.error("Error deleting learning plan", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-6">
      {learningPlans.length === 0 ? (
        <p>No learning plans found.</p>
      ) : (
        learningPlans.map((plan) => (
          <div key={plan.id} className="max-w-4xl mx-auto bg-[#EFEFEF] rounded-xl shadow-md overflow-hidden">
            <div className="bg-[#C0AE95] h-40 relative">
              <div className="absolute top-3 right-3 flex space-x-2">
                <button className="p-2 rounded-full bg-white shadow-md">
                  <MdEdit />
                </button>
                <button
                  className="p-2 rounded-full bg-white shadow-md"
                  onClick={() => handleDelete(plan.id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
            <div className="bg-[#D3D3D3] p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{plan.planTopic}</h3>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#C0AE95]">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xs text-gray-500">No Img</span>
                    </div>
                  )}
                </div>
                <span className="font-semibold text-black">{user.name}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
