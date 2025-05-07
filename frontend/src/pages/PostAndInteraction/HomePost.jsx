import React, { useState, useEffect } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { useNavigate } from "react-router-dom";
import PostService from "../../service/Post-And-Interaction/PostService";
import { getUserById } from "../../service/Profile & Followers Management/AuthService"; // Import the user service

export const HomePost = () => {
  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState({}); // Store user details by ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedStates, setLikedStates] = useState([]);
  const navigate = useNavigate();

  // Fetch all posts and user details when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all posts
        const fetchedPosts = await PostService.getAllPosts();
        setPosts(fetchedPosts);
        
        // Initialize liked states
        setLikedStates(fetchedPosts.map(post => 
          post.likes.some(like => like.userId === "currentUserId") // Replace with actual current user ID
        ));
        
        // Fetch user details for each unique user ID
        const uniqueUserIds = [...new Set(fetchedPosts.map(post => post.userId))];
        const userDetailsPromises = uniqueUserIds.map(async userId => {
          try {
            const user = await getUserById(userId);
            return { [userId]: user };
          } catch (error) {
            console.error(`Error fetching user ${userId}:`, error);
            return { [userId]: { name: `User ${userId}` } }; // Fallback if user fetch fails
          }
        });
        
        // Combine all user details into one object
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
  }, []);

  const handleLikeClick = async (index, postId) => {
    try {
      const currentUserId = "currentUserId"; // Replace with actual current user ID
      const post = posts[index];
      
      if (!likedStates[index]) {
        // Like the post
        const response = await axios.post(`${API_BASE_URL}/${postId}/likes`, { userId: currentUserId });
        
        if (response.status === 200) {
          // Update local state
          const updatedPosts = [...posts];
          updatedPosts[index].likes.push({
            userId: currentUserId,
            likedAt: new Date().toISOString()
          });
          setPosts(updatedPosts);
          
          const updatedLikedStates = [...likedStates];
          updatedLikedStates[index] = true;
          setLikedStates(updatedLikedStates);
        }
      } else {
        // Unlike the post
        const response = await axios.delete(`${API_BASE_URL}/${postId}/likes/${currentUserId}`);
        
        if (response.status === 200) {
          // Update local state
          const updatedPosts = [...posts];
          updatedPosts[index].likes = updatedPosts[index].likes.filter(
            like => like.userId !== currentUserId
          );
          setPosts(updatedPosts);
          
          const updatedLikedStates = [...likedStates];
          updatedLikedStates[index] = false;
          setLikedStates(updatedLikedStates);
        }
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handleCommentClick = (postId) => {
    navigate(`/userviewpost/${postId}`);
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts: {error}</div>;

  return (
    <div className={`${GlobalStyle.countBarSubTopicContainer} pt-20`}>
      {posts.map((post, index) => {
        const user = userDetails[post.userId] || { name: `User ${post.userId}` };
        
        return (
          <div
            key={post._id || index}
            className={`${GlobalStyle.cardContainer} w-[932px] h-[630px] relative mb-12 p-10`}
          >
            {/* Top row with profile and name */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8B6F5A]"></div>
                <h1 className={GlobalStyle.headingMedium}>{user.name}</h1>
              </div>
            </div>

            {/* Description */}
            <p className={GlobalStyle.paragraph}>{post.description}</p>
            <br />
            <br />

            {/* Image grid - only show if mediaUrls exist */}
            {post.mediaUrls && post.mediaUrls.length > 0 && (
              <div className="flex justify-center gap-6 mb-4">
                {post.mediaUrls.map((url, i) => (
                  <div key={i} className="w-[400px] h-[400px] rounded-xl overflow-hidden">
                    <img 
                      src={url} 
                      alt={`Post media ${i}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Like & Comment buttons */}
            <div className="absolute right-4 top-3/4 transform -translate-y-1/2 flex flex-col gap-6 cursor-pointer">
              {/* Like Button */}
              <div
                className="flex flex-col items-center"
                onClick={() => handleLikeClick(index, post._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={likedStates[index] ? "red" : "none"}
                  stroke={likedStates[index] ? "none" : "currentColor"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className={`w-8 h-8 transition-all duration-300 ease-in-out ${
                    likedStates[index] ? "scale-125" : "scale-100"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 6.318a5.753 5.753 0 00-9.317-1.618L12 5.06l-.435-.36A5.753 5.753 0 002.248 6.318c-1.272 2.232-.38 5.104 1.523 6.947L12 21.75l8.23-8.485c1.903-1.843 2.795-4.715 1.522-6.947z"
                  />
                </svg>
                <span className="text-sm">
                  {post.likes ? post.likes.length : 0}
                </span>
              </div>

              {/* Comment Button */}
              <div
                className="flex flex-col items-center"
                onClick={() => handleCommentClick(post._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l.084-.376a9.016 9.016 0 011.676-3.093A9.015 9.015 0 0112 3.75c4.478 0 8.214 3.29 8.91 7.583.066.4.09.808.09 1.217 0 4.28-3.53 7.75-7.89 7.75a8.09 8.09 0 01-2.939-.557c-.387-.144-.823-.083-1.146.158l-2.178 1.61a.75.75 0 01-1.18-.63v-2.614c0-.292-.115-.572-.318-.78a8.963 8.963 0 01-2.289-4.53L2.25 12z"
                  />
                </svg>
                <span className="text-sm">
                  {post.comments ? post.comments.length : 0}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};