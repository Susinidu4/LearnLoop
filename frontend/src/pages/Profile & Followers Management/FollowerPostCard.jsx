import React, { useEffect, useState } from 'react';
import PostService from '../../service/Post-And-Interaction/PostService';

export const FollowerPostCard = ({ uid }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userPosts = await PostService.getPostsByUser(uid);
        setPosts(userPosts);
        // Initialize all comments as collapsed
        const initialExpandedState = {};
        userPosts.forEach(post => {
          initialExpandedState[post.id] = false;
        });
        setExpandedComments(initialExpandedState);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [uid]);

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  if (loading) return <div className="text-center py-4">Loading posts...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  if (posts.length === 0) return <div className="text-center py-4">No posts found</div>;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Post Header */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                {post.userId.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold">User ID: {post.userId}</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-4">
            <p className="mb-4">{post.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
              {post.mediaUrls.map((url, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded overflow-hidden">
                  <img 
                    src={url} 
                    alt={`Post media ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Post Footer */}
          <div className="p-4 border-t">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
                  <span>❤️</span>
                  <span>{post.likes.length} likes</span>
                </button>
                <button 
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
                  onClick={() => toggleComments(post.id)}
                >
                  <span>💬</span>
                  <span>
                    {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                    {expandedComments[post.id] ? ' (hide)' : ' (show)'}
                  </span>
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {post.category}
              </span>
            </div>
          </div>

          {/* Comments Section - Conditionally Rendered */}
          {expandedComments[post.id] && post.comments.length > 0 && (
            <div className="p-4 bg-gray-50 animate-fadeIn">
              <h4 className="font-medium mb-2">Comments</h4>
              <div className="space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      {comment.userId.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">User {comment.userId.substring(0, 6)}</p>
                      <p className="text-sm">{comment.content}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.commentedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};