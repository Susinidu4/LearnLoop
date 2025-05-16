import React, { useState, useEffect } from 'react';
import PostService from '../service/Post-And-Interaction/PostService';

export const MyPostCard = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [editingPostId, setEditingPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    description: '',
    category: '',
    files: []
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userPosts = await PostService.getPostsByUser(userId);
        setPosts(userPosts);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to fetch posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setEditFormData({
      description: post.description,
      category: post.category,
      files: []
    });
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditFormData({
      description: '',
      category: '',
      files: []
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setEditFormData(prev => ({
      ...prev,
      files: Array.from(e.target.files)
    }));
  };

  const handleUpdatePost = async (postId) => {
    try {
      const updatedPost = await PostService.updatePost(
        postId,
        editFormData.description,
        editFormData.category,
        editFormData.files
      );
      
      setPosts(posts.map(post => 
        post.id === postId ? updatedPost : post
      ));
      setEditingPostId(null);
    } catch (err) {
      console.error('Failed to update post:', err);
      alert('Failed to update post. Please try again.');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await PostService.deletePost(postId);
        setPosts(posts.filter(post => post.id !== postId));
      } catch (err) {
        console.error('Failed to delete post:', err);
        alert('Failed to delete post. Please try again.');
      }
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
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No posts found</h3>
        <p className="mt-1 text-gray-500">This user hasn't created any posts yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
          {/* Post Header with Edit/Delete Options */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  {post.userId.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-900">User {post.userId.slice(-4)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                
                {/* Edit/Delete Buttons - Only show if current user owns the post */}
                {post.userId === userId && (
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditClick(post)}
                      className="text-gray-500 hover:text-blue-500"
                      title="Edit post"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      className="text-gray-500 hover:text-red-500"
                      title="Delete post"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {post.category && !editingPostId && (
              <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                #{post.category}
              </span>
            )}
          </div>

          {/* Edit Post Form */}
          {editingPostId === post.id && (
            <div className="p-4 border-b border-gray-200">
              <div className="space-y-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editFormData.description}
                    onChange={handleEditChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select value={editFormData.category} onChange={handleEditChange} name="category" id="category" className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'>
                    <option value="" disabled>Select a category</option>
                    <option value="Coding">Coding</option>
                    <option value="Cooking">Cooking</option>
                    <option value="DIY Craft">DIY Craft</option>
                    <option value="Photography">Photography</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="files" className="block text-sm font-medium text-gray-700">
                    Update Images (optional)
                  </label>
                  <input
                    type="file"
                    id="files"
                    name="files"
                    multiple
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={handleFileChange}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Select new images to replace the current ones
                  </p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdatePost(post.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Post Description */}
          {post.description && editingPostId !== post.id && (
            <div className="p-4">
              <p className="text-gray-800">{post.description}</p>
            </div>
          )}

          {/* Post Media */}
          {post.mediaUrls && post.mediaUrls.length > 0 && editingPostId !== post.id && (
            <div className={post.mediaUrls.length > 1 ? "grid grid-cols-2 gap-1" : ""}>
              {post.mediaUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Post media ${index + 1}`}
                  className={`w-full ${post.mediaUrls.length === 1 ? 'max-h-96 object-contain' : 'h-48 object-cover'}`}
                />
              ))}
            </div>
          )}

          {/* Post Stats */}
          {editingPostId !== post.id && (
            <div className="px-4 py-2 flex justify-between items-center text-sm text-gray-500 border-t border-gray-200">
              <div className="flex space-x-4">
                <span className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {post.likes ? post.likes.length : 0} likes
                </span>
                <span className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {post.comments ? post.comments.length : 0} comments
                </span>
              </div>
              
              {post.comments && post.comments.length > 0 && (
                <button 
                  onClick={() => toggleComments(post.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  {expandedComments[post.id] ? 'Hide comments' : 'Show comments'}
                  <svg 
                    className={`ml-1 h-4 w-4 transition-transform ${expandedComments[post.id] ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Post Comments - Conditionally Rendered */}
          {post.comments && post.comments.length > 0 && expandedComments[post.id] && editingPostId !== post.id && (
            <div className="bg-gray-50 p-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Comments</h4>
              <div className="space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                        {comment.userId.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white p-3 rounded-lg shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">User {comment.userId.slice(-4)}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.commentedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 mt-1">{comment.content}</p>
                      </div>
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