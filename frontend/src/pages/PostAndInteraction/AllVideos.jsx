import React, { useState, useEffect } from 'react';
import VideoService from '../../service/Post-And-Interaction/VideoService';
import VideoCommentsAndLikeService from '../../service/Like-Comment-Notification-Management/VideoCommentsAndLike';
import { getUserById } from '../../service/Profile & Followers Management/AuthService';
import ProfileService from '../../service/Profile & Followers Management/ProfileService';

export const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCommentVideoId, setActiveCommentVideoId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [profileImages, setProfileImages] = useState({});
  const [postOwnerDetails, setPostOwnerDetails] = useState({});
  const [editingComment, setEditingComment] = useState({ videoId: null, commentId: null, content: '' });
  const user = JSON.parse(localStorage.getItem('user'));

  // Utility function to format bytes
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await VideoService.getAllVideos();
        setVideos(data);
        
        // Get unique user IDs from comments and video owners
        const userIds = new Set();
        data.forEach(video => {
          userIds.add(video.userId);
          video.comments?.forEach(comment => {
            userIds.add(comment.userId);
          });
        });

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
        
        const userDetailsMap = {};
        const profileImagesMap = {};
        const postOwnerDetailsMap = {};
        
        userDetailsResults.forEach(result => {
          if (result.userData) {
            userDetailsMap[result.userId] = result.userData;
            if (data.some(video => video.userId === result.userId)) {
              postOwnerDetailsMap[result.userId] = {
                userData: result.userData,
                profileImage: result.profileImage
              };
            }
          }
          if (result.profileImage) {
            profileImagesMap[result.userId] = result.profileImage;
          }
        });
        
        setUserDetails(userDetailsMap);
        setProfileImages(profileImagesMap);
        setPostOwnerDetails(postOwnerDetailsMap);
      } catch (err) {
        setError(err.message || 'Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleLike = async (videoId) => {
    try {
      const updatedVideo = await VideoCommentsAndLikeService.likePost(videoId, user.id);
      setVideos(videos.map(video => 
        video.id === videoId ? updatedVideo : video
      ));
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleUnlike = async (videoId) => {
    try {
      const updatedVideo = await VideoCommentsAndLikeService.unlikePost(videoId, user.id);
      setVideos(videos.map(video => 
        video.id === videoId ? updatedVideo : video
      ));
    } catch (error) {
      console.error('Error unliking video:', error);
    }
  };

  const handleAddComment = async (videoId) => {
    if (!commentText.trim()) return;
    
    try {
      const commentData = {
        userId: user.id,
        content: commentText
      };
      const updatedVideo = await VideoCommentsAndLikeService.addComment(videoId, commentData);
      setVideos(videos.map(video => 
        video.id === videoId ? updatedVideo : video
      ));
      
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
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (videoId, commentId) => {
    try {
      const updatedVideo = await VideoCommentsAndLikeService.deleteComment(videoId, commentId);
      setVideos(videos.map(video => 
        video.id === videoId ? updatedVideo : video
      ));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleStartEditComment = (videoId, commentId, currentContent) => {
    setEditingComment({ videoId, commentId, content: currentContent });
    setActiveCommentVideoId(videoId);
  };

  const handleUpdateComment = async () => {
    if (!editingComment.content.trim()) return;
    
    try {
      const updatedVideo = await VideoCommentsAndLikeService.updateComment(
        editingComment.videoId,
        editingComment.commentId,
        editingComment.content
      );
      
      setVideos(videos.map(video => 
        video.id === editingComment.videoId ? updatedVideo : video
      ));
      
      setEditingComment({ videoId: null, commentId: null, content: '' });
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingComment({ videoId: null, commentId: null, content: '' });
  };

  const isLiked = (video, userId) => {
    return video.likes?.some(like => like.userId === userId) || false;
  };

  const renderComments = (video) => (
    <div className="space-y-3 max-h-40 overflow-y-auto">
      {video.comments?.map(comment => {
        const commentUser = userDetails[comment.userId] || {};
        const commentUserImage = profileImages[comment.userId];
        const isEditing = editingComment.commentId === comment.id;
        
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
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {commentUser.name || 'Unknown User'}
                  </p>
                  
                  {isEditing ? (
                    <div className="mt-1">
                      <textarea
                        value={editingComment.content}
                        onChange={(e) => setEditingComment({
                          ...editingComment,
                          content: e.target.value
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="2"
                      />
                      <div className="flex justify-end mt-2 space-x-2">
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleUpdateComment}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-700">{comment.content}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.commentedAt).toLocaleString()}
                      </p>
                    </>
                  )}
                </div>
              </div>
              
              {comment.userId === user.id && !isEditing && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStartEditComment(video.id, comment.id, comment.content)}
                    className="text-blue-500 hover:text-blue-700"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
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
                </div>
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
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Videos</h1>
        
        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No videos found.</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-8 max-w-3xl mx-auto">
            {videos.map(video => {
              const owner = postOwnerDetails[video.userId];
              
              return (
                <div 
                  key={video.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Post Owner Info Section */}
                  <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
                    {owner?.profileImage ? (
                      <img 
                        src={owner.profileImage} 
                        alt={owner.userData?.name || 'User'} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm text-gray-600">
                          {owner?.userData?.name ? owner.userData.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-800">
                        {owner?.userData?.name || 'Unknown User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Posted on {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : 'Unknown date'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Video Content Section */}
                  <div className="bg-black">
                    <video controls className="w-full h-auto">
                      <source src={video.url} type={`video/${video.format}`} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{video.title}</h3>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex">
                        <span className="font-medium w-24">Format:</span>
                        <span className="text-gray-800">{video.format.toUpperCase()}</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-24">Size:</span>
                        <span className="text-gray-800">{formatBytes(video.bytes)}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center">
                      <button
                        onClick={() => 
                          isLiked(video, user.id) 
                            ? handleUnlike(video.id) 
                            : handleLike(video.id)
                        }
                        className={`flex items-center px-3 py-1 rounded-md ${
                          isLiked(video, user.id)
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-600'
                        } hover:bg-opacity-80 transition-colors`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        {video.likes?.length || 0}
                      </button>
                      
                      <button
                        onClick={() => setActiveCommentVideoId(
                          activeCommentVideoId === video.id ? null : video.id
                        )}
                        className="ml-2 flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-opacity-80 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        {video.comments?.length || 0}
                      </button>
                    </div>

                    {activeCommentVideoId === video.id && (
                      <div className="mt-4">
                        {!editingComment.commentId && (
                          <div className="mb-4">
                            <textarea
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Write a comment..."
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows="2"
                            />
                            <div className="flex justify-end mt-2 space-x-2">
                              <button
                                onClick={() => setActiveCommentVideoId(null)}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleAddComment(video.id)}
                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                              >
                                Post
                              </button>
                            </div>
                          </div>
                        )}
                        
                        {renderComments(video)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};