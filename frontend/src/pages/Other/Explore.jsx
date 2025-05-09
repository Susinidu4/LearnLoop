import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { FaSearch } from "react-icons/fa";
import explore from "../../assets/images/explore.png";
import PostService from "../../service/Post-And-Interaction/PostService";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await PostService.getAllPosts();
        setPosts(allPosts);
        setLoading(false);
        
        // Initialize current image index for each post
        const initialIndexes = {};
        allPosts.forEach(post => {
          initialIndexes[post.id] = 0;
        });
        setCurrentImageIndex(initialIndexes);
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = posts.filter(post => 
      post.category?.toLowerCase() === category.toLowerCase()
    );
    setFilteredPosts(filtered);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query === "") {
      setFilteredPosts([]);
      return;
    }

    const filtered = posts.filter(post => 
      post.description?.toLowerCase().includes(query) ||
      post.category?.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

  const displayPosts = selectedCategory || searchQuery ? filteredPosts : posts;

  if (loading) {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full ml-16 bg-[#F7EDE5] min-h-screen">
          <Header />
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#402006]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full ml-16 bg-[#F7EDE5] min-h-screen">
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
      <div className="flex flex-col w-full ml-16">
        <Header />
        <div className={`${GlobalStyle.fontPoppins} bg-[#F7EDE5] min-h-screen pt-24`}>
          <main className="p-6">
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col items-center justify-start mt-10 space-y-10 px-6">
                {/* Search Bar */}
                <div className="relative w-full max-w-2xl">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#402006]"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600" />
                </div>

                {/* Category Buttons */}
                <div className="flex flex-wrap gap-6 justify-center">
                  {["Coding", "Cooking", "Photography", "DIY Craft"].map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`px-8 py-4 rounded-xl shadow-md text-lg font-semibold transition ${
                          selectedCategory === category
                            ? "bg-[#402006] text-white"
                            : "bg-[#e5d2be] hover:bg-[#d8bfa7]"
                        }`}
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>

                {/* Show illustration only when no category is selected and no search */}
                {!selectedCategory && !searchQuery && (
                  <div className="mt-10">
                    <img
                      src={explore}
                      alt="Learning Illustration"
                      className="w-80 h-auto"
                    />
                  </div>
                )}

                {/* Posts Grid */}
                {displayPosts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                    {displayPosts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-[#fff7ee] rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 p-4 flex flex-col"
                      >
                        {/* Image Gallery */}
                        {post.mediaUrls && post.mediaUrls.length > 0 ? (
                          <div className="relative h-48 bg-[#e7d7c4] rounded-xl mb-4 overflow-hidden group">
                            {/* Main Image */}
                            <img
                              src={post.mediaUrls[currentImageIndex[post.id] || 0]}
                              alt={`Post in ${post.category}`}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Navigation Arrows */}
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
                            
                            {/* Image Counter */}
                            {post.mediaUrls.length > 1 && (
                              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                                {`${(currentImageIndex[post.id] || 0) + 1}/${post.mediaUrls.length}`}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="h-48 bg-[#e7d7c4] rounded-xl mb-4"></div>
                        )}

                        {/* Category Badge */}
                        {post.category && (
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-[#402006] bg-[#e5d2be] rounded-full mb-2">
                            #{post.category}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* No results message */}
                {displayPosts.length === 0 && (selectedCategory || searchQuery) && (
                  <div className="text-center py-10">
                    <p className="text-lg text-[#402006]">
                      No posts found {selectedCategory ? `in ${selectedCategory}` : "matching your search"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};