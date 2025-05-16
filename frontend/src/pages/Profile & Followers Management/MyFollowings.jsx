import React, { useState, useEffect } from "react";
import FollowerService from "../../service/Profile & Followers Management/FollowService";
import ProfileService from "../../service/Profile & Followers Management/ProfileService";
import { getUserById } from "../../service/Profile & Followers Management/AuthService";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { Link } from "react-router-dom";

export const MyFollowings = () => {
  const myData = JSON.parse(localStorage.getItem("user")) || null;
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unfollowLoading, setUnfollowLoading] = useState({}); // Track loading state per user

  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        if (myData && myData.id) {
          const followingsData = await FollowerService.getFollowers(myData.id);
          console.log("Followings data:", followingsData);

          // Initialize loading states
          const initialLoadingStates = {};
          const enrichedFollowings = await Promise.all(
            followingsData.map(async (following) => {
              initialLoadingStates[following.followINGId] = false;
              try {
                const user = await getUserById(following.followerId);
                const imageUrl = await ProfileService.getProfileImage(
                  following.followerId
                );

                return {
                  ...following,
                  name: user.name,
                  email: user.email,
                  imageUrl: imageUrl || null,
                };
              } catch (error) {
                console.error(
                  `Error loading data for user ${following.followINGId}:`,
                  error
                );
                return {
                  ...following,
                  name: "Unknown User",
                  email: "",
                  imageUrl: null,
                };
              }
            })
          );

          setFollowings(enrichedFollowings);
          setUnfollowLoading(initialLoadingStates);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowings();
  }, [myData?.id]);

  const handleUnfollow = async (followerId) => {
    try {
      // Set loading state for this specific user
      setUnfollowLoading((prev) => ({ ...prev, [followerId]: true }));

      // Call the unfollow API
      await FollowerService.unfollowUser(followerId, myData.id);

      // Update the local state to remove the unfollowed user
      setFollowings((prevFollowings) =>
        prevFollowings.filter(
          (following) => following.followINGId !== followerId
        )
      );
    } catch (error) {
      console.error("Error unfollowing user:", error);
      // Show error message to user (you could add a toast notification here)
    } finally {
      // Reset loading state
      setUnfollowLoading((prev) => ({ ...prev, [followerId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error loading followings:</p>
        <p>{error}</p>
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
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-extrabold text-center py-4 mb-6 tracking-wide uppercase">
              My Followers
            </h1>

            {followings.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                You're not following anyone yet.
              </div>
            ) : (
              <div className="flex flex-col gap-y-6">
                {followings.map((following) => (
                  <Link to={`/followerprofile/${following.followerId}`}>
                    <div
                      key={following._id}
                      className="flex items-center justify-between bg-[#F0E0D1] rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                          {following.imageUrl ? (
                            <img
                              src={following.imageUrl}
                              alt={`${following.name}'s profile`}
                              className="h-12 w-12 rounded-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/default-avatar.jpg";
                              }}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-gray-600 font-medium">
                                {following.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium text-gray-900">
                            {following.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {following.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnfollow(following.followerId)}
                        disabled={unfollowLoading[following.followerId]}
                        className={`px-4 py-2 text-white rounded-xl transition-colors ${
                          unfollowLoading[following.followerId]
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#7A6A60] hover:bg-[#543310]"
                        }`}
                      >
                        {unfollowLoading[following.followINGId] ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          "Unfollow"
                        )}
                      </button>

                      
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
