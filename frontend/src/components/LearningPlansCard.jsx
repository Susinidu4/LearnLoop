import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

export function LearningPlansCard() {
  const [learningPlans, setLearningPlans] = useState([]);
  const userId = "911"; // Replace with the actual userId

  // Fetch user data by userId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/learning-plans/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setLearningPlans(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userId]);

  // Delete the learning plan
  const handleDelete = async (planId) => {
    console.log("Deleting plan with ID:", planId); // Check if this logs the correct ID
    try {
      const response = await fetch(`http://localhost:5000/api/learning-plans/${planId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // Remove the deleted plan from the state to update the UI
        setLearningPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== planId)); // Use `id` here
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
        <p>No learning plans found.</p> // Display a message if no plans are available
      ) : (
        learningPlans.map((plan) => (
          <div key={plan.id} className="max-w-4xl mx-auto bg-[#EFEFEF] rounded-xl shadow-md overflow-hidden">
            {/* Card Content */}
            <div className="bg-[#C0AE95] h-40 relative">
              <div className="absolute top-3 right-3 flex space-x-2">
                <button className="p-2 rounded-full bg-white shadow-md">
                  <MdEdit />
                </button>
                <button
                  className="p-2 rounded-full bg-white shadow-md"
                  onClick={() => handleDelete(plan.id)} // Use `id` here
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
                <div className="w-10 h-10 bg-[#C0AE95] rounded-full"></div>
                <span className="font-semibold text-black">{plan.userId}</span> {/* Replace with an existing field */}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
