import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/video'; // Adjust this based on your actual API base URL

class VideoCommentsAndLikeService {
  // Get post by ID
  async getPostById(postId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  // Add comment to a video post
  async addComment(postId, commentData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/${postId}/comments`, {
        userId: commentData.userId,
        content: commentData.content
      });
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // Update a comment
  async updateComment(postId, commentId, newContent) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${postId}/comments/${commentId}`, {
        content: newContent
      });
      return response.data;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  // Get all comments for a video post
  async getAllComments(postId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  // Delete a comment
  async deleteComment(postId, commentId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${postId}/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }

  // Like a video post
  async likePost(postId, userId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/${postId}/likes`, {
        userId: userId
      });
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  }

  // Unlike a video post
  async unlikePost(postId, userId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${postId}/likes/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error unliking post:', error);
      throw error;
    }
  }
}

export default new VideoCommentsAndLikeService();