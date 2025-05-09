import axios from "axios";

const API_URL = "http://localhost:5000/api/notifications";

const NotificationService = {
  sendNotification: async (notificationData) => {
    try {
      // Make the request to create the notification
      const response = await axios.post(API_URL, notificationData);
      if (response.status === 201) {
        console.log("Notification sent successfully");
      } else {
        console.error("Failed to send notification", response.data);
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  },

  getUserNotifications: async (receiverUserId) => {
    try {
      const response = await axios.get(`${API_URL}/${receiverUserId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  },
};

export default NotificationService;
