import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/videos';

const VideoService = {
  // Upload a video
  uploadVideo: async (file, title, userId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-User-Id': userId
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // You can handle progress updates here if needed
          console.log(`Upload progress: ${progress}%`);
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error.response?.data?.error || 'Failed to upload video';
    }
  },

  // Get all videos
  getAllVideos: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all videos:', error);
      throw error.response?.data?.error || 'Failed to fetch videos';
    }
  },

  // Get videos for a specific user
   getUserVideos: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}`, {
        headers: {
          'X-User-Id': userId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user videos:', error);
      throw error.response?.data?.error || 'Failed to fetch user videos';
    }
  },

  // Delete a video
  deleteVideo: async (videoId, userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${videoId}`, {
        headers: {
          'X-User-Id': userId
        }
      });
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error.response?.data?.error || 'Failed to delete video';
    }
  },

  // Update video title
updateVideoTitle: async (videoId, newTitle) => {  // Removed userId parameter
    try {
        const response = await axios.patch(
            `${API_BASE_URL}/${videoId}/title`,
            null,
            {
                params: { newTitle }
                // Removed headers with userId
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating video title:', error);
        throw error.response?.data?.error || 'Failed to update video title';
    }
}
};

export default VideoService;