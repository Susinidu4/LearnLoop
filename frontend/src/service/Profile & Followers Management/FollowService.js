import axios from "axios";

const API_URL = 'http://localhost:5000/api/followers'; // Update with your backend URL

const followUser = async (followerId, followingId) => {
  try {
    const response = await axios.post(API_URL, {
      followerId,
      followingId
    });
    return response.data;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
};

const getFollowers = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/followers/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw error;
  }
};

const getFollowing = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/following/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching following:", error);
    throw error;
  }
};

const checkIsFollowing = async (followerId, followingId) => {
  try {
    const response = await axios.get(`${API_URL}/check`, {
      params: {
        followerId,
        followingId
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error checking follow status:", error);
    throw error;
  }
};

const unfollowUser = async (followerId, followingId) => {
  try {
    await axios.delete(API_URL, {
      params: {
        followerId,
        followingId
      }
    });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
};

const updateFollowRelationship = async (id, followerId, followingId) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      followerId,
      followingId
    });
    return response.data;
  } catch (error) {
    console.error("Error updating follow relationship:", error);
    throw error;
  }
};

const FollowerService = {
  followUser,
  getFollowers,
  getFollowing,
  checkIsFollowing,
  unfollowUser,
  updateFollowRelationship
};

export default FollowerService;