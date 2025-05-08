import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SideBar } from '../../components/SideBar';
import ProfileService from '../../service/Profile & Followers Management/ProfileService';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followStatus, setFollowStatus] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/auth/users');
        setUsers(response.data);
        setFilteredUsers(response.data);
        console.log('Fetched users:', response.data);
        
        // Initialize follow status
        const initialFollowStatus = {};
        response.data.forEach(user => {
          initialFollowStatus[user._id] = false;
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

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleFollowToggle = async (userId) => {
    try {
      // In a real app, you would make an API call here to follow/unfollow
      console.log(`Toggling follow status for user ${userId}`);
      
      // Update local state
      setFollowStatus(prev => ({
        ...prev,
        [userId]: !prev[userId]
      }));
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  const UserCard = ({ user }) => {
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
      const loadProfileImage = async () => {
        try {
          const imageUrl = await ProfileService.getProfileImage(user.id);
          setProfileImage(imageUrl);
        } catch (error) {
          console.error('Error loading profile image:', error);
          setProfileImage(null);
        }
      };

      loadProfileImage();
    }, [user._id]);

    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow mb-4">
        <div className="flex-shrink-0 relative">
          {profileImage ? (
            <img
              src={profileImage}
              alt={`${user.name}'s profile`}
              className="h-12 w-12 rounded-full object-cover"
              onError={() => setProfileImage(null)}
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm font-medium">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">{user.name}</h3>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
        
        <button
          onClick={() => handleFollowToggle(user._id)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            followStatus[user._id]
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {followStatus[user._id] ? 'Following' : 'Follow'}
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-8">
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-8">
          <div className="text-center py-8 text-red-500">
            <p>Error loading users:</p>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex m-auto px-20">
      <SideBar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Discover Users</h1>
        
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
        <div className="space-y-3">
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
    </div>
  );
};