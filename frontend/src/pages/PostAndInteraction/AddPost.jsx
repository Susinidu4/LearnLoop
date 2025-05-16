import React, { useState } from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { FaUpload } from "react-icons/fa";
import postGirl from "../../assets/Images/postgirl.png";
import axios from "axios";
import { useEffect } from "react";
import ProfileService from "../../service/Profile & Followers Management/ProfileService";

export const AddPost = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (user?.id) {
        try {
          const url = await ProfileService.getProfileImage(user.id);
          setProfileImageUrl(url);
        } catch (error) {
          console.error("Failed to load profile image", error);
        }
      }
    };

    fetchProfileImage();
  }, [user]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      setError("You can upload a maximum of 5 files.");
      return;
    }

    // Check video duration for each file
    for (const file of files) {
      if (file.type.startsWith("video")) {
        try {
          const duration = await getVideoDuration(file);
          if (duration > 30) {
            setError("Video duration must be less than 30 seconds.");
            return;
          }
        } catch (err) {
          setError("Error checking video duration.");
          return;
        }
      }
    }

    setError("");
    setSelectedFiles(files);
  };

  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        resolve(video.duration);
        URL.revokeObjectURL(video.src);
      };
    });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !category || selectedFiles.length === 0) {
      setError("Please fill all fields and select at least one file.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("description", description);
      formData.append("category", category);

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await axios.post(
        "http://localhost:5000/api/posts-interaction",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reset form on success
      setDescription("");
      setCategory("");
      setSelectedFiles([]);
      alert("Post created successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
          <main className="p-6">
            <div className="relative flex flex-col bg-[#C8A381] p-6 rounded-2xl shadow-lg w-[950px] h-[600px] mx-auto">
              {/* User Info */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#8B6F5A]"></div>
                  )}
                  <h1 className={GlobalStyle.headingMedium}>
                    {user?.name || "User"}
                  </h1>
                </div>
              </div>
              <br />
              {/* Description */}
              <div className="mb-6 w-[850px]">
                <label className={GlobalStyle.remarkTopic}>Description</label>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Write your post description..."
                  className={`${GlobalStyle.inputText} w-full`}
                  rows="3"
                ></textarea>
              </div>
              <br />
              {/* Category Dropdown */}
              <div className="w-[850px] mb-4">
                <label className={GlobalStyle.remarkTopic}>Category</label>
                <select
                  className={`${GlobalStyle.selectBox} w-full`}
                  value={category}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="coding">Coding</option>
                  <option value="cooking">Cooking</option>
                  <option value="diyCraft">DIY Craft</option>
                  <option value="photography">Photography</option>
                </select>
              </div>
              <br />
              {/* Snap Upload */}
              <div className="w-[850px] mb-4">
                <label className={GlobalStyle.remarkTopic}>Snaps</label>
                <label htmlFor="file-upload" className="cursor-pointer w-full">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                  />
                  <div className="flex items-center rounded-[10px] border-2 border-[#543310] overflow-hidden h-10">
                    <div className="px-4 flex-grow truncate">
                      {selectedFiles.length > 0
                        ? `${selectedFiles.length} file(s) selected`
                        : "Select files (max 5 images or videos under 30s)"}
                    </div>
                    <div className="flex items-center justify-center h-full border-l border-[#543310] px-5">
                      <FaUpload className="text-gray-600" />
                    </div>
                  </div>
                </label>
                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
              </div>
              <br />
              {/* Post Button */}
              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`${GlobalStyle.buttonPrimary} ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </div>

            {/* Image in fixed position */}
            <div className="absolute bottom-[5px] right-[-2px] mb-4 mr-4 z-10">
              <img
                src={postGirl}
                alt="Post Girl"
                className="w-[535px] h-auto"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
