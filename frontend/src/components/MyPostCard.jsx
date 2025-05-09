import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from 'lucide-react';
import PostService from '../service/Post-And-Interaction/PostService';
import ProfileService from '../service/Profile & Followers Management/ProfileService';

export function MyPostCard({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImages, setProfileImages] = useState({});

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPosts = await PostService.getPostsByUser(userId);
        setPosts(userPosts);
        
        // Fetch profile images
        const uniqueUserIds = [...new Set(userPosts.map(post => post.userId))];
        const images = {};
        
        for (const id of uniqueUserIds) {
          try {
            const imageUrl = await ProfileService.getProfileImage(id);
            images[id] = imageUrl;
          } catch (err) {
            console.error(`Error fetching profile image for user ${id}:`, err);
            images[id] = null;
          }
        }
        
        setProfileImages(images);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (loading) return <div className="text-center py-8">Loading posts...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  if (posts.length === 0) return <div className="text-center py-8">No posts found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-[#d9c4a3] rounded-lg overflow-hidden shadow-md">
          {/* Image Gallery */}
          {post.mediaUrls?.length > 0 && (
            <div className={`grid ${
              post.mediaUrls.length === 1 ? 'grid-cols-1' : 
              post.mediaUrls.length === 2 ? 'grid-cols-2' : 
              'grid-cols-2 grid-rows-2'
            } gap-1 h-48 bg-[#d9c4a3]`}>
              {post.mediaUrls.map((url, index) => (
                <div 
                  key={index} 
                  className={`relative overflow-hidden ${
                    post.mediaUrls.length === 3 && index === 0 ? 'row-span-2' : ''
                  }`}
                >
                  <img
                    src={url}
                    alt={`${post.description} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Show number indicator if there are more than 4 images */}
                  {post.mediaUrls.length > 4 && index === 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                      +{post.mediaUrls.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="p-4">
            {/* Post Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-medium truncate">
                  {post.description || 'Untitled Post'}
                </h3>
                <p className="text-sm text-gray-700 capitalize">
                  {post.category}
                </p>
              </div>
              
              {/* Edit/Delete Buttons */}
              {post.userId === userId && (
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-[#c19e67] rounded">
                    <PencilIcon size={18} />
                  </button>
                  <button className="p-1 hover:bg-[#c19e67] rounded">
                    <TrashIcon size={18} />
                  </button>
                </div>
              )}
            </div>
            
            {/* Post Stats */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex space-x-4">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
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
                  {post.likes?.length || 0}
                </span>
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
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
                  {post.comments?.length || 0}
                </span>
              </div>
              
              {/* User Avatar */}
              <div className="w-8 h-8 bg-[#c19e67] rounded-full overflow-hidden">
                {profileImages[post.userId] ? (
                  <img
                    src={profileImages[post.userId]}
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-xs">
                    {post.userId?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
            </div>
            
            {/* Post Date */}
            <div className="mt-2 text-xs text-gray-600">
              Posted on {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}