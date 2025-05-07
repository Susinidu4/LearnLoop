import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/profiles';

class ProfileService {
  // Upload profile image
  static async uploadProfileImage(userId, file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${API_BASE_URL}/${userId}/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      throw error;
    }
  }

  // Get profile image
  static async getProfileImage(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}/image`, {
        responseType: 'blob', // Important for handling binary data
      });

      // Create a URL for the image blob
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // No profile image found
        return null;
      }
      console.error('Error fetching profile image:', error);
      throw error;
    }
  }

  // Delete profile image
  static async deleteProfileImage(userId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${userId}/image`);
      return response.data;
    } catch (error) {
      console.error('Error deleting profile image:', error);
      throw error;
    }
  }

  // Utility function to get profile image URL
  static getProfileImageUrl(userId) {
    return `${API_BASE_URL}/${userId}/image`;
  }
}

export default ProfileService;