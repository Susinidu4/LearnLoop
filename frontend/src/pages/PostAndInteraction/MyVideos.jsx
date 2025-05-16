import React, { useState, useEffect } from 'react';
import VideoService from '../../service/Post-And-Interaction/VideoService';
import { VideoCommentsPopup } from '../../components/VideoCommentsPopup';
import { FiEdit2, FiTrash2, FiMessageSquare, FiExternalLink, FiUser, FiFilm, FiHardDrive, FiHeart, FiMessageCircle } from 'react-icons/fi';

export const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await VideoService.getUserVideos(user.id);
      setVideos(data);
    } catch (err) {
      setError(err.message || 'Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;

    try {
      await VideoService.deleteVideo(videoId, user.id);
      setVideos(videos.filter(video => video.id !== videoId));
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to delete video');
    }
  };

  const startEditing = (video) => {
    setEditingVideo(video);
    setNewTitle(video.title);
  };

  const cancelEditing = () => {
    setEditingVideo(null);
    setNewTitle('');
  };

  const handleUpdate = async () => {
    if (!newTitle.trim()) {
      setError('Title cannot be empty');
      return;
    }

    try {
      const updatedVideo = await VideoService.updateVideoTitle(editingVideo.id, newTitle);
      setVideos(videos.map(video => video.id === updatedVideo.id ? updatedVideo : video));
      cancelEditing();
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to update video title');
    }
  };

  const openComments = (video) => {
    setSelectedVideo(video);
  };

  const closeComments = () => {
    setSelectedVideo(null);
  };

  const refreshComments = async () => {
    try {
      const updatedVideos = await VideoService.getUserVideos(user.id);
      setVideos(updatedVideos);
      const updatedVideo = updatedVideos.find(v => v.id === selectedVideo.id);
      if (updatedVideo) {
        setSelectedVideo(updatedVideo);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to refresh comments');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <span className="text-lg text-gray-700 font-medium">Loading your videos...</span>
        <p className="text-gray-500 mt-2">This may take a moment</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            My Video Library
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Manage and organize your uploaded videos
          </p>
        </div>

        {selectedVideo && (
          <VideoCommentsPopup
            video={selectedVideo}
            user={user}
            onClose={closeComments}
            onCommentDeleted={refreshComments}
          />
        )}

        {videos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No videos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by uploading a new video.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Upload Video
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200"
              >
                <div className="relative pb-[56.25%] bg-black">
                  <video
                    controls
                    className="absolute inset-0 w-full h-full object-cover"
                    poster={`https://res.cloudinary.com/demo/image/upload/w_500,h_500,c_fill,q_auto,f_auto/${video.publicId}.jpg`}
                  >
                    <source src={video.url} type={`video/${video.format}`} />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="p-5">
                  {editingVideo?.id === video.id ? (
                    <div className="mb-4">
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter new title"
                      />
                      <div className="flex space-x-3 mt-3">
                        <button
                          onClick={handleUpdate}
                          className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <FiEdit2 className="mr-2" />
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 truncate">
                      {video.title}
                    </h3>
                  )}

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiFilm className="mr-2 text-gray-500" />
                      <span className="font-medium mr-2">Format:</span>
                      <span className="text-gray-800">{video.format.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center">
                      <FiHardDrive className="mr-2 text-gray-500" />
                      <span className="font-medium mr-2">Size:</span>
                      <span className="text-gray-800">{formatBytes(video.bytes)}</span>
                    </div>
                    <div className="flex items-center">
                      <FiHeart className="mr-2 text-gray-500" />
                      <span className="font-medium mr-2">Likes:</span>
                      <span className="text-gray-800">{video.likes?.length || 0}</span>
                    </div>
                    <div className="flex items-center">
                      <FiMessageCircle className="mr-2 text-gray-500" />
                      <span className="font-medium mr-2">Comments:</span>
                      <span className="text-gray-800">{video.comments?.length || 0}</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <button
                      onClick={() => startEditing(video)}
                      className="flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Edit title"
                    >
                      <FiEdit2 className="sm:mr-1" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => openComments(video)}
                      className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      title="View comments"
                    >
                      <FiMessageSquare className="sm:mr-1" />
                      <span className="hidden sm:inline">Comments</span>
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete video"
                    >
                      <FiTrash2 className="sm:mr-1" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <FiExternalLink className="mr-2" />
                    View Original
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};