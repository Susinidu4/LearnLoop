import React, { useState, useEffect } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { useNavigate } from "react-router-dom";
import PostService from "../../service/Post-And-Interaction/PostService";
import { getUserById } from "../../service/Profile & Followers Management/AuthService";
import axios from "axios";

export const HomePost = () => {
  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedStates, setLikedStates] = useState([]); // true or false for each post
  const navigate = useNavigate();
  const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await PostService.getAllPosts();
        setPosts(fetchedPosts);

        // Check if current user liked each post
        const likedStatusArray = fetchedPosts.map((post) =>
          post.likes.some((like) => like.userId === currentUserId)
        );
        setLikedStates(likedStatusArray);

        // Get user names for posts
        const uniqueUserIds = [
          ...new Set(fetchedPosts.map((post) => post.userId)),
        ];
        const userDetailsPromises = uniqueUserIds.map(async (userId) => {
          try {
            const user = await getUserById(userId);
            return { [userId]: user };
          } catch (error) {
            console.error(`Error fetching user ${userId}:`, error);
            return { [userId]: { name: `User ${userId}` } };
          }
        });

        const userDetailsResults = await Promise.all(userDetailsPromises);
        const combinedUserDetails = Object.assign({}, ...userDetailsResults);
        setUserDetails(combinedUserDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  // Like/Unlike handler
  const handleLikeClick = async (postId, index) => {
    try {
      const alreadyLiked = likedStates[index];

      if (alreadyLiked) {
        // Unlike the post (DELETE)
        const response = await fetch(
          `http://localhost:5000/api/post/${postId}/likes/${currentUserId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to unlike post");

        // Update UI
        setLikedStates((prev) => {
          const updated = [...prev];
          updated[index] = false;
          return updated;
        });

        setPosts((prev) => {
          const updatedPosts = [...prev];
          updatedPosts[index].likes = updatedPosts[index].likes.filter(
            (like) => like.userId !== currentUserId
          );
          return updatedPosts;
        });
      } else {
        // Like the post (POST)
        const response = await fetch(
          `http://localhost:5000/api/post/${postId}/likes`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: currentUserId }),
          }
        );
        if (!response.ok) throw new Error("Failed to like post");

        // Update UI
        const newLike = { userId: currentUserId, likedAt: new Date() };

        setLikedStates((prev) => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });

        setPosts((prev) => {
          const updatedPosts = [...prev];
          updatedPosts[index].likes = [...updatedPosts[index].likes, newLike];
          return updatedPosts;
        });
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  // Updated handleCommentClick
  const handleCommentClick = (postId) => {
    if (postId) {
      navigate(`/postdetails/${postId}`); // Navigate to the post details page
    } else {
      console.error("Invalid postId", postId); // Debugging
    }
  };

  if (loading)
    return <div className="text-center mt-20 text-lg">Loading posts...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <div className={`${GlobalStyle.countBarSubTopicContainer} pt-4`}>
      {posts.map((post, index) => {
        const user = userDetails[post.userId] || {
          name: `User ${post.userId}`,
        };

        return (
          <div
            key={post._id || post.id}
            className="bg-[#CFB397] shadow-md rounded-lg w-full max-w-4xl mb-8 p-8"
          >
            {/* Post Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#8B6F5A]"></div>
                <h1 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h1>
              </div>
            </div>

            {/* Post Description */}
            <p className="text-gray-700 text-base mb-6">{post.description}</p>

            {/* Post Images */}
            {post.mediaUrls?.length > 0 && (
              <div className="flex justify-center gap-6 mb-6">
                {post.mediaUrls.map((url, i) => (
                  <div key={i} className="w-80 h-80 rounded-xl overflow-hidden">
                    <img
                      src={url}
                      alt={`Post media ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Like & Comment Buttons */}
            <div className="flex gap-8 cursor-pointer mt-6">
              {/* Like Button */}
              <div
                className="flex items-center gap-2"
                onClick={() => handleLikeClick(post._id || post.id, index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={likedStates[index] ? "red" : "none"} // Red fill if liked
                  stroke={likedStates[index] ? "none" : "currentColor"} // Outline if not liked
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-7 h-7 transition-all duration-300 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 6.318a5.753 5.753 0 00-9.317-1.618L12 5.06l-.435-.36A5.753 5.753 0 002.248 6.318c-1.272 2.232-.38 5.104 1.523 6.947L12 21.75l8.23-8.485c1.903-1.843 2.795-4.715 1.522-6.947z"
                  />
                </svg>
                <span className="text-sm">{post.likes?.length || 0}</span>
              </div>

              {/* Comment Button */}
              <div
                className="flex items-center gap-2"
                onClick={() => handleCommentClick(post._id || post.id)} // Correctly pass the post ID
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l.084-.376a9.016 9.016 0 011.676-3.093A9.015 9.015 0 0112 3.75c4.478 0 8.214 3.29 8.91 7.583.066.4.09.808.09 1.217 0 4.28-3.53 7.75-7.89 7.75a8.09 8.09 0 01-2.939-.557c-.387-.144-.823-.083-1.146.158l-2.178 1.61a.75.75 0 01-1.18-.63v-2.614c0-.292-.115-.572-.318-.78a8.963 8.963 0 01-2.289-4.53L2.25 12z"
                  />
                </svg>
                <span className="text-sm">{post.comments?.length || 0}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
