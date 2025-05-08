import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';

export const UsersPage = () => {
  // State for users data and UI
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followStatus, setFollowStatus] = useState({}); // Track follow status for each user

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:5000/api/v1/auth/users');
        setUsers(response.data);
        setFilteredUsers(response.data);
        
        // Initialize follow status (in a real app, this would come from the API)
        const initialFollowStatus = {};
        response.data.forEach(user => {
          initialFollowStatus[user._id] = false; // Default to not following
        });
        setFollowStatus(initialFollowStatus);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  // Handle follow/unfollow action
  const handleFollowToggle = (userId) => {
    // In a real app, you would make an API call here
    console.log(`Toggling follow status for user ${userId}`);
    
    // Update local state
    setFollowStatus(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // UserCard component (now defined inside UsersPage)
  const UserCard = ({ user }) => {
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
      const fetchProfileImage = async () => {
        try {
          // Replace with your actual profile image service
          const imageUrl = await axios.get(`http://localhost:5000/api/v1/profiles/${user._id}/image`, {
            responseType: 'blob'
          }).then(response => {
            return URL.createObjectURL(response.data);
          });
          setProfileImage(imageUrl);
        } catch (error) {
          console.error('Error loading profile image:', error);
          setProfileImage(null);
        }
      };

      fetchProfileImage();
      
      // Clean up blob URL when component unmounts
      return () => {
        if (profileImage) {
          URL.revokeObjectURL(profileImage);
        }
      };
    }, [user._id]);

    return (
      <div>
        <SideBar />
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow">
        <div className="flex-shrink-0">
          {profileImage ? (
            <img
              src={profileImage}
              alt={`${user.name}'s profile`}
              className="h-12 w-12 rounded-full object-cover"
              onError={() => setProfileImage(null)} // Fallback if image fails to load
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-xl">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>
        <button
          onClick={() => handleFollowToggle(user._id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            followStatus[user._id]
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {followStatus[user._id] ? 'Following' : 'Follow'}
        </button>
      </div>
      </div>
    );
  };

  // Loading and error states
  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Loading users...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center py-8 text-red-500">
        <p>Error loading users:</p>
        <p className="mt-2">{error}</p>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Discover Users</h1>
      
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search users by name..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Users list */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard key={user._id} user={user} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? (
              `No users found matching "${searchTerm}"`
            ) : (
              'No users available'
            )}
          </div>
        )}
      </div>
    </div>
  );
};

