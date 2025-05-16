import React, { useState, useEffect } from "react";
import axios from "axios";
import { SideBar } from "../../components/SideBar";
import { Header } from "../../components/Header";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import ProfileService from "../../service/Profile & Followers Management/ProfileService";
import FollowerService from "../../service/Profile & Followers Management/FollowService";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followStatus, setFollowStatus] = useState({});
  const [followLoading, setFollowLoading] = useState({}); // Track loading state per user
  const myData = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/auth/users"
        );

        // Filter out the current user's account
        const otherUsers = response.data.filter(
          (user) => user.id !== myData?.id
        );

        setUsers(otherUsers);
        setFilteredUsers(otherUsers);

        // Initialize follow status and loading states
        const initialFollowStatus = {};
        const initialLoadingStates = {};

        // Check follow status for each user
        await Promise.all(
          otherUsers.map(async (user) => {
            initialFollowStatus[user.id] = false;
            initialLoadingStates[user.id] = false;

            try {
              const isFollowing = await FollowerService.checkIsFollowing(
                user.id,
                myData.id
              );
              initialFollowStatus[user.id] = isFollowing;
            } catch (error) {
              console.error(
                `Error checking follow status for user ${user.id}:`,
                error
              );
            }
          })
        );

        setFollowStatus(initialFollowStatus);
        setFollowLoading(initialLoadingStates);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [myData?.id]);

  useEffect(() => {
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleFollowToggle = async (userId) => {
    try {
      // Set loading state for this user
      setFollowLoading((prev) => ({ ...prev, [userId]: true }));

      if (followStatus[userId]) {
        // Unfollow logic
        await FollowerService.unfollowUser(userId, myData.id);
      } else {
        // Follow logic
        await FollowerService.followUser(userId, myData.id);
      }

      // Toggle follow status
      setFollowStatus((prev) => ({
        ...prev,
        [userId]: !prev[userId],
      }));
    } catch (error) {
      console.error("Error toggling follow status:", error);
      // You might want to show an error message to the user here
    } finally {
      // Reset loading state
      setFollowLoading((prev) => ({ ...prev, [userId]: false }));
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
          console.error("Error loading profile image:", error);
          setProfileImage(null);
        }
      };

      loadProfileImage();
    }, [user.id]);

    return (
      <div className="bg-[#C5B9B0] rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow mb-4">
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
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {user.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>

        <button
          onClick={() => handleFollowToggle(user.id)}
          disabled={followLoading[user.id]}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            followStatus[user.id]
              ? "bg-[#93847A] text-gray-800 hover:bg-gray-300"
              : "bg-[#543310] text-white hover:bg-[#93847A]"
          } ${followLoading[user.id] ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {followLoading[user.id]
            ? "Processing..."
            : followStatus[user.id]
            ? "Following"
            : "Follow"}
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
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div
          className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}
        >
          <div className="flex-1 p-15 px-40">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Discover Users
            </h1>

            <div className="mb-6">
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search users by name..."
                  className="w-80 h-12 px-4 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#402006]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm
                    ? `No users found matching "${searchTerm}"`
                    : "No users available"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
