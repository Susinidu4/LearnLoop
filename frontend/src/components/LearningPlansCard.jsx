import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import ProfileService from "../service/Profile & Followers Management/ProfileService";
import GlobalStyle from "../assets/prototype/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { TfiMoreAlt } from "react-icons/tfi";

export function LearningPlansCard() {
  const [learningPlans, setLearningPlans] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editForm, setEditForm] = useState({
    planTopic: "",
    description: "",
    completionDuration: "",
    stepCount: 0,
    steps: [],
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/learning-plans/user/${user.id}`
        );
        if (res.ok) {
          const data = await res.json();
          setLearningPlans(data);
          console.log("Learning plans fetched:", data);
        } else {
          console.error("Failed to fetch learning plans:", res.status);
        }

        const imageUrl = await ProfileService.getProfileImage(user.id);
        if (imageUrl) {
          setProfileImage(imageUrl);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [user?.id]);

  const handleDelete = async (planId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/learning-plans/${planId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setLearningPlans((prev) => prev.filter((plan) => plan.id !== planId));
        alert("Deleted successfully");
      } else {
        console.error("Delete failed:", res.status);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEditClick = (e, plan) => {
    e.stopPropagation(); // Prevent navigation
    setEditingPlanId(plan.id);
    setEditForm({
      planTopic: plan.planTopic,
      description: plan.description,
      completionDuration: plan.completionDuration,
      stepCount: plan.stepCount,
      steps: plan.steps || [],
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...editForm.steps];
    updatedSteps[index][field] = value;
    setEditForm((prev) => ({ ...prev, steps: updatedSteps }));
  };

  const addNewStep = () => {
    setEditForm((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          stepNumber: prev.steps.length + 1,
          topic: "",
          resourceLink: "",
          completionDuration: "",
        },
      ],
      stepCount: prev.steps.length + 1,
    }));
  };

  const removeStep = (index) => {
    const updatedSteps = editForm.steps.filter((_, i) => i !== index);
    const reorderedSteps = updatedSteps.map((step, i) => ({
      ...step,
      stepNumber: i + 1,
    }));
    setEditForm((prev) => ({
      ...prev,
      steps: reorderedSteps,
      stepCount: reorderedSteps.length,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/api/learning-plans/${editingPlanId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editForm,
            userId: user.id,
          }),
        }
      );

      if (res.ok) {
        const updatedPlan = await res.json();
        setLearningPlans((prev) =>
          prev.map((plan) => (plan.id === editingPlanId ? updatedPlan : plan))
        );
        setEditingPlanId(null);
        alert("Updated successfully");
      } else {
        console.error("Update failed:", res.status);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {learningPlans.length === 0 ? (
        <p className="text-center text-gray-600">No learning plans found.</p>
      ) : (
        learningPlans.map((plan) => (
          <div
            key={plan.id}
            className="max-w-4xl mx-auto bg-[#EFEFEF] rounded-xl shadow-md overflow-hidden transition"
          >
           <div className="bg-[#C0AE95] h-40 relative">
  {/* Display the plan image if available */}
  {plan.imageUrl && (
    <img 
      src={plan.imageUrl} 
      alt={plan.planTopic}
      className="w-full h-full object-cover"
    />
  )}
  
  <div
    className="absolute top-3 right-3 flex space-x-2"
    onClick={(e) => e.stopPropagation()} // Stop click bubbling for buttons
  >
    <button
      className="p-2 rounded-full bg-white shadow-md"
      onClick={(e) => handleEditClick(e, plan)}
    >
      <MdEdit />
    </button>
    <button
      className="p-2 rounded-full bg-white shadow-md"
      onClick={(e) => {
        e.stopPropagation();
        handleDelete(plan.id);
      }}
    >
      <MdDelete />
    </button>
    <button
      className="p-2 rounded-full bg-white shadow-md"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/learning-plan/${plan.id}`);
      }}
    >
      <TfiMoreAlt />
    </button>
  </div>
</div>

            {editingPlanId === plan.id ? (
              <form
                onSubmit={handleUpdateSubmit}
                className="bg-[#D3D3D3] p-4 flex flex-col space-y-3"
              >
                <input
                  type="text"
                  name="planTopic"
                  value={editForm.planTopic}
                  onChange={handleEditChange}
                  className={`${GlobalStyle.inputText}`}
                  placeholder="Plan Topic"
                  required
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className={`w-full ${GlobalStyle.remark}`}
                  rows="4"
                  placeholder="Description"
                  required
                />
                <input
                  type="text"
                  name="completionDuration"
                  value={editForm.completionDuration}
                  onChange={handleEditChange}
                  className={`${GlobalStyle.inputText}`}
                  placeholder="Total Duration"
                  required
                />

                <h4 className="font-bold">Steps</h4>
                {editForm.steps.map((step, index) => (
                  <div key={index} className="border p-2 rounded space-y-2">
                    <input
                      type="text"
                      value={step.topic}
                      onChange={(e) =>
                        handleStepChange(index, "topic", e.target.value)
                      }
                      className="p-2 rounded w-full"
                      placeholder={`Step ${index + 1} Topic`}
                      required
                    />
                    <input
                      type="text"
                      value={step.resourceLink}
                      onChange={(e) =>
                        handleStepChange(index, "resourceLink", e.target.value)
                      }
                      className="p-2 rounded w-full"
                      placeholder="Resource Link"
                      required
                    />
                    <input
                      type="text"
                      value={step.completionDuration}
                      onChange={(e) =>
                        handleStepChange(
                          index,
                          "completionDuration",
                          e.target.value
                        )
                      }
                      className="p-2 rounded w-full"
                      placeholder="Step Duration"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="text-red-600 text-sm underline"
                    >
                      Remove Step
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNewStep}
                  className="px-3 py-1 bg-[#8B5E3C] text-white rounded w-fit"
                >
                  + Add Step
                </button>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#6a482e] text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-black border rounded"
                    onClick={() => setEditingPlanId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-[#D3D3D3] p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{plan.planTopic}</h3>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-[#C0AE95]">
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
            )}
          </div>
        ))
      )}
    </div>
  );
}
