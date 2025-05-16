import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import GlobalStyle from "../assets/prototype/GlobalStyle";
import homeMan from "../assets/images/homeMan.png";
import PostService from "../service/Post-And-Interaction/PostService";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const HomeSignOut = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await PostService.getAllPosts();
        setPosts(allPosts);
        // Initialize current image index for each post
        const initialIndexes = {};
        allPosts.forEach(post => {
          initialIndexes[post.id] = 0;
        });
        setCurrentImageIndex(initialIndexes);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNextImage = (postId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [postId]: (prev[postId] + 1) % totalImages
    }));
  };

  const handlePrevImage = (postId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [postId]: (prev[postId] - 1 + totalImages) % totalImages
    }));
  };

  if (loading) {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full ml-16 bg-[#f5eade] min-h-screen">
          <Header />
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a97c50]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full ml-16 bg-[#f5eade] min-h-screen">
          <Header />
          <div className={`${GlobalStyle.fontPoppins} pt-24 px-8`}>
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full ml-16 bg-[#f5eade] min-h-screen">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} pt-24 px-8`}>
          {/* Welcome Banner */}
          <section className="bg-[#f8ede1] rounded-2xl p-8 flex justify-between items-center shadow-lg border border-[#e2d3c0] transition-all duration-500">
            <div>
              <h1 className="text-3xl font-bold text-[#3d3d3d] mb-2">
                Welcome to <span className="text-[#a97c50]">LearnLoop</span>
              </h1>
              <p className="text-[#6b5c47] text-md">
                Discover new posts, updates, and announcements tailored just for you.
              </p>
            </div>
            <img
              src={homeMan}
              alt="Home Illustration"
              className="h-32 md:h-40 transition-transform hover:scale-105"
            />
          </section>

          {/* Post Grid Section */}
          <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-[#fff7ee] rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between"
              >
                {/* Image Gallery */}
                {post.mediaUrls && post.mediaUrls.length > 0 ? (
                  <div className="relative h-48 bg-[#e7d7c4] rounded-xl mb-4 overflow-hidden group">
                    {/* Main Image */}
                    <img
                      src={post.mediaUrls[currentImageIndex[post.id] || 0]}
                      alt={`Post by ${post.userId}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation Arrows (only show if multiple images) */}
                    {post.mediaUrls.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage(post.id, post.mediaUrls.length);
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiChevronLeft size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage(post.id, post.mediaUrls.length);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiChevronRight size={20} />
                        </button>
                      </>
                    )}
                    
                    {/* Image Counter (only show if multiple images) */}
                    {post.mediaUrls.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                        {`${(currentImageIndex[post.id] || 0) + 1}/${post.mediaUrls.length}`}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-[#e7d7c4] rounded-xl mb-4"></div>
                )}

                {/* Post Info */}
                <div>
                  <h2 className="text-lg font-semibold text-[#3d3d3d] mb-1 truncate">
                    {post.category || "Untitled"}
                  </h2>
                  <p className="text-sm text-[#6b5c47] truncate">
                    {post.description || "No description"}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-[#8a7a65]">
                    <span className="flex items-center mr-3">
                      <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {post.likes ? post.likes.length : 0}
                    </span>
                    <span className="flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {post.comments ? post.comments.length : 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};