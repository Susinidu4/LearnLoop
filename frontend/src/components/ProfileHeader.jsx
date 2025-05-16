import React, { useEffect, useState, useRef } from "react";
import { PencilIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileService from "../service/Profile & Followers Management/ProfileService";
import FollowerService from "../service/Profile & Followers Management/FollowService";

import profileBanner from "../assets/images/profileBanner.png"; 

import PostService from "../service/Post-And-Interaction/PostService";


export function ProfileHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [postCount, setPostCount] = useState(0);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.id) {
          // Get followers count
          const followers = await FollowerService.getFollowers(user.id);
          setFollowersCount(followers.length);

          // Get following count
          const following = await FollowerService.getFollowing(user.id);
          setFollowingCount(following.length);

          // Get posts count
          const posts = await PostService.getPostsByUser(user.id);
          setPostCount(posts.length);

          // Load profile image
          await loadProfileImage();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const loadProfileImage = async () => {
    try {
      const imageUrl = await ProfileService.getProfileImage(user.id);
      setProfileImageUrl(imageUrl);
    } catch (error) {
      console.error("Error loading profile image:", error);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const imageUrl = await ProfileService.uploadProfileImage(user.id, file);
      setProfileImageUrl(imageUrl);
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("Failed to upload profile image");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading profile data...</div>;
  }

  return (
    <div className="mb-6 py-28">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Cover image */}
      <div className="h-48 bg-[#d9c4a3] rounded-lg mb-16 relative">
        <img
          src={profileBanner}
          alt="Cover"
          className="w-full h-full object-cover rounded-lg"
        />
        {/* Profile image */}
        <div className="absolute -bottom-28 left-5 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full border-4 border-[#633D2B] overflow-hidden">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>

          {/* User info - now positioned directly below the profile picture */}
          <div className="text-center mt-3 w-full">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">Developer</p>
          </div>
        </div>

        {/* Edit button */}

        <button 
          className="absolute bottom-2 right-2 p-2 rounded-full"

          onClick={handleEditClick}
        >
          <PencilIcon size={20} color="white" />
        </button>
      </div>

      {/* Profile stats */}
      <div className="flex justify-center space-x-8 mb-6">
        <div className="flex flex-col items-center">
          <Link to={`/myfollowers`}>
            <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mb-1">
              <span className="font-bold">{followingCount}</span>
            </div>
          </Link>
          <span className="text-sm">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <Link to={`/myfollowings`}>
            <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mb-1">
              <span className="font-bold">{followersCount}</span>
            </div>
          </Link>
          <span className="text-sm">Following</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mb-1">
            <span className="font-bold">{postCount}</span>
          </div>
          <span className="text-sm">Posts</span>
        </div>
      </div>
    </div>
  );
}
