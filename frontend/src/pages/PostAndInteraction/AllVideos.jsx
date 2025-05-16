
import { FaSearch } from "react-icons/fa";

import React, { useState, useEffect } from 'react';
import VideoService from '../../service/Post-And-Interaction/VideoService';
import VideoCommentsAndLikeService from '../../service/Like-Comment-Notification-Management/VideoCommentsAndLike';
import { getUserById } from '../../service/Profile & Followers Management/AuthService';
import ProfileService from '../../service/Profile & Followers Management/ProfileService';
import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';


export const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCommentVideoId, setActiveCommentVideoId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const user = JSON.parse(localStorage.getItem("user")); // Replace with your actual user ID management
  const [userDetails, setUserDetails] = useState({});
  const [profileImages, setProfileImages] = useState({});



  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await VideoService.getAllVideos();
        setVideos(data);

        setFilteredVideos(data); // Initially set filtered videos to all videos

        
        // Extract all unique user IDs from comments
        const userIds = new Set();
        data.forEach(video => {
          video.comments?.forEach(comment => {
            userIds.add(comment.userId);
          });
        });

        // Fetch user details and profile images
        const userDetailsPromises = Array.from(userIds).map(async userId => {
          try {
            const userData = await getUserById(userId);
            const profileImage = await ProfileService.getProfileImage(userId);
            return { userId, userData, profileImage };
          } catch (error) {
            console.error(`Error fetching user ${userId}:`, error);
            return { userId, userData: null, profileImage: null };
          }
        });

        const userDetailsResults = await Promise.all(userDetailsPromises);
        
        // Convert to objects for easier access
        const userDetailsMap = {};
        const profileImagesMap = {};
        
        userDetailsResults.forEach(result => {
          if (result.userData) {
            userDetailsMap[result.userId] = result.userData;
          }
          if (result.profileImage) {
            profileImagesMap[result.userId] = result.profileImage;
          }
        });
        
        setUserDetails(userDetailsMap);
        setProfileImages(profileImagesMap);

      } catch (err) {
        setError(err.message || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const filtered = videos.filter((video) =>
      video.userId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [searchTerm, videos]);

  const formatBytes = (bytes, decimals = 2) => {

  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

  const handleLike = async (videoId) => {
    try {
      const updatedVideo = await VideoCommentsAndLikeService.likePost(
        videoId,
        user.id
      );
      setVideos(
        videos.map((video) => (video.id === videoId ? updatedVideo : video))
      );
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const handleUnlike = async (videoId) => {
    try {
      const updatedVideo = await VideoCommentsAndLikeService.unlikePost(
        videoId,
        user.id
      );
      setVideos(
        videos.map((video) => (video.id === videoId ? updatedVideo : video))
      );
    } catch (error) {
      console.error("Error unliking video:", error);
    }
  };

  const handleAddComment = async (videoId) => {
    if (!commentText.trim()) return;

    try {
      const commentData = {
        userId: user.id,
        content: commentText,
      };

      const updatedVideo = await VideoCommentsAndLikeService.addComment(videoId, commentData);
      setVideos(videos.map(video => 
        video.id === videoId ? updatedVideo : video
      ));
      
      // Update user details if this is a new commenter
      if (!userDetails[user.id]) {
        try {
          const userData = await getUserById(user.id);
          const profileImage = await ProfileService.getProfileImage(user.id);
          setUserDetails(prev => ({ ...prev, [user.id]: userData }));
          setProfileImages(prev => ({ ...prev, [user.id]: profileImage }));
        } catch (error) {
          console.error('Error fetching commenter details:', error);
        }
      }
      
      setCommentText('');

      setActiveCommentVideoId(null);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (videoId, commentId) => {
    try {
      const updatedVideo = await VideoCommentsAndLikeService.deleteComment(
        videoId,
        commentId
      );
      setVideos(
        videos.map((video) => (video.id === videoId ? updatedVideo : video))
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const isLiked = (video, userId) => {
    return video.likes?.some((like) => like.userId === userId) || false;
  };

  const renderComments = (video) => (
    <div className="space-y-3 max-h-40 overflow-y-auto">
      {video.comments?.map(comment => {
        const commentUser = userDetails[comment.userId] || {};
        const commentUserImage = profileImages[comment.userId];
        
        return (
          <div key={comment.id} className="p-2 bg-gray-50 rounded-md">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-2">
                {commentUserImage ? (
                  <img 
                    src={commentUserImage} 
                    alt={commentUser.name || 'User'} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-600">
                      {commentUser.name ? commentUser.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-sm">
                    {commentUser.name || 'Unknown User'}
                  </p>
                  <p className="text-gray-700">{comment.content}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.commentedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {comment.userId === user.id && (
                <button
                  onClick={() => handleDeleteComment(video.id, comment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg">Loading videos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (

    <div>
      {/* Search Bar */}
      <div className="flex justify-center items-center my-4">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#402006]"
          />
          <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>
      </div>

      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No videos found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >

              <div className="bg-black">
                <video controls className="w-full h-56 object-cover">
                  <source src={video.url} type={`video/${video.format}`} />
                  Your browser does not support the video tag.
                </video>
              </div>


              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-1">
                  {video.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex">
                    <span className="font-medium w-24">Format:</span>
                    <span className="text-gray-800">
                      {video.format.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-24">Size:</span>
                    <span className="text-gray-800">
                      {formatBytes(video.bytes)}
                    </span>

                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Uploaded by:</span>
                    <span className="text-gray-700">{userDetails[video.userId]?.name || video.userId}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button

                    onClick={() =>
                      isLiked(video, user.id)
                        ? handleUnlike(video.id)
                        : handleLike(video.id)
                    }
                    className={`flex items-center px-3 py-1 rounded-md ${
                      isLiked(video, user.id)
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    } hover:bg-opacity-80 transition-colors`}

                  >
                    ❤️ {video.likes?.length || 0}
                  </button>

                  <button

                    onClick={() =>
                      setActiveCommentVideoId(
                        activeCommentVideoId === video.id ? null : video.id
                      )
                    }
                    className="ml-2 flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-opacity-80 transition-colors"

                  >
                    💬 {video.comments?.length || 0}
                  </button>
                </div>

                {activeCommentVideoId === video.id && (
                  <div className="mt-4">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      rows="3"
                    />
                    <div className="flex justify-end mt-2 space-x-2">
                      <button
                        onClick={() => setActiveCommentVideoId(null)}
                        className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleAddComment(video.id)}
                        className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Post
                      </button>
                    </div>


                    {/* Comments List */}
                    <div className="space-y-3 max-h-40 overflow-y-auto">
                      {video.comments?.map((comment) => (
                        <div
                          key={comment.id}
                          className="p-2 bg-gray-50 rounded-md"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">
                                {comment.userId}
                              </p>
                              <p className="text-gray-700">{comment.content}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(comment.commentedAt).toLocaleString()}
                              </p>
                            </div>
                            {comment.userId === user.id && (
                              <button
                                onClick={() =>
                                  handleDeleteComment(video.id, comment.id)
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                )}

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
                >
                  View on Cloudinary
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>

  );
};
