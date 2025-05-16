import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/posts-interaction';

const PostService = {
  // Create a new post
  createPost: async (userId, description, category, files) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('description', description);
    formData.append('category', category);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Get post by ID 
  getPostById: async (postId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${postId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching post with ID ${postId}:`, error);
      throw error;
    }
  },

  // Get posts by user ID
  getPostsByUser: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      throw error;
    }
  },

  // Get posts by category
  getPostsByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      throw error;
    }
  },

  // Get all posts
  getAllPosts: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching all posts:', error);
      throw error;
    }
  },

  // Update post
  updatePost: async (postId, description, category, files) => {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('category', category);

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating post with ID ${postId}:`, error);
      throw error;
    }
  },

  // Delete post
  deletePost: async (postId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${postId}`);
    } catch (error) {
      console.error(`Error deleting post with ID ${postId}:`, error);
      throw error;
    }
  },
};

export default PostService;
