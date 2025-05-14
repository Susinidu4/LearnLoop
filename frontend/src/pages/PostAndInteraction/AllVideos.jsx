import React, { useState, useEffect } from 'react';
import VideoService from '../../service/Post-And-Interaction/VideoService';

export const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await VideoService.getAllVideos();
        setVideos(data);
      } catch (err) {
        setError(err.message || 'Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-1">{video.title}</h3>
                
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

                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-center w-full"
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