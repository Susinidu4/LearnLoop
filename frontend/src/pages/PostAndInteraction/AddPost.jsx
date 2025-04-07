import React, { useState } from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { FaUpload } from "react-icons/fa";
import postGirl from "../../assets/Images/postgirl.png";

export const AddPost = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [balance, setBalance] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      setError("You can upload a maximum of 5 files.");
      return;
    }

    const validFiles = files.filter((file) => {
      if (file.type.startsWith("video")) {
        const videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(file);
        return new Promise((resolve, reject) => {
          videoElement.onloadedmetadata = () => {
            if (videoElement.duration > 30) {
              reject("Video duration must be less than 30 seconds.");
            } else {
              resolve(file);
            }
          };
        });
      }
      return true;
    });

    if (validFiles.length === files.length) {
      setError("");
      setSelectedFiles(files);
    } else {
      setError("Video duration must be less than 30 seconds.");
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
          <main className="p-6">
            {/* Centered container for the form */}
            <div className="relative flex flex-col bg-[#C8A381] p-6 rounded-2xl shadow-lg w-[950px] h-[600px] mx-auto">
              {/* User Info */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#B68B62] rounded-full"></div>
                <span className="ml-3 font-semibold text-[#4A2E16]">Kavishka Perera</span>
              </div>
              <br/>
              {/* Description */}
              <label className="text-[#4A2E16] font-medium mb-1">Description</label>
              <textarea
                className="w-[850px] p-3 rounded-lg border border-[#A57B5B] focus:outline-none mb-4"
                rows="4"
              ></textarea>
              <br/>
              {/* Category Dropdown */}
              <label className="text-[#4A2E16] font-medium mb-1">Category</label>
              <div className="w-[850px] mb-4 h-14">
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full p-3 rounded-lg border-2 border-[#A57B5B] focus:outline-none"
                >
                  <option value="">Select a category</option>
                  <option value="coding">Coding</option>
                  <option value="cooking">Cooking</option>
                  <option value="diyCraft">DIY Craft</option>
                  <option value="photography">Photography</option>
                </select>
              </div>
              <br/>
              {/* Snap Upload */}
              <label className="text-[#4A2E16] font-medium mb-1">Snaps</label>
              <div className="w-[850px] mb-4">
                <label htmlFor="file-upload" className="cursor-pointer w-full">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                  />
                  <div className="flex items-center rounded-[10px] border-2 border-[#A57B5B] overflow-hidden h-14">
                    <div className="px-4 flex-grow truncate">
                      {selectedFiles.length > 0
                        ? `${selectedFiles.length} file(s) selected`
                        : "Select files (max 5 images or 1 video)"}
                    </div>
                    <div className="flex items-center justify-center h-full border-l border-[#A57B5B] px-5">
                      <FaUpload className="text-gray-600" />
                    </div>
                  </div>
                </label>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              </div>
              <br/>
              {/* Post Button */}
                <div className="flex gap-4">
                  <button className={GlobalStyle.buttonPrimary}>Post</button>
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
