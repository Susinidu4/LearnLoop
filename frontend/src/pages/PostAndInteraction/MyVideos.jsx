import React, { useState, useEffect } from 'react';
import VideoService from '../../service/Post-And-Interaction/VideoService';

export const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [newTitle, setNewTitle] = useState('');
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
      const updatedVideo = await VideoService.updateVideoTitle(
        editingVideo.id, 
        newTitle, 
      );
      
      setVideos(videos.map(video => 
        video.id === updatedVideo.id ? updatedVideo : video
      ));
      cancelEditing();
    } catch (err) {
      setError(err.message || 'Failed to update video title');
    }
  };

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
        <button 
          onClick={() => setError(null)} 
          className="mt-2 text-red-700 hover:text-red-900"
        >
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Videos</h1>
      
      {videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No videos found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <div 
              key={video.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="bg-black">
                <video controls className="w-full h-auto">
                  <source src={video.url} type={`video/${video.format}`} />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="p-4">
                {editingVideo?.id === video.id ? (
                  <div className="mb-3">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={handleUpdate}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-1">
                    {video.title}
                  </h3>
                )}
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex">
                    <span className="font-medium w-24">Format:</span>
                    <span className="text-gray-800">{video.format.toUpperCase()}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-24">Size:</span>
                    <span className="text-gray-800">{formatBytes(video.bytes)}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-24">Uploaded by:</span>
                    <span className="text-gray-800">{video.userId}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-24">Public ID:</span>
                    <span className="text-gray-800 font-mono text-xs break-all">{video.publicId}</span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => startEditing(video)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 flex-1"
                  >
                    Delete
                  </button>
                </div>

                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-center w-full"
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