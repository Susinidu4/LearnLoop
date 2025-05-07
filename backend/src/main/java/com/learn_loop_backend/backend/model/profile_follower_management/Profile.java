package com.learn_loop_backend.backend.model.profile_follower_management;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("profile")
public class Profile {

        @Id
        private String id;
        private String userId;
        private String imagePath;

        public Profile() {}

        public Profile(String userId) {
            this.userId = userId;
        }

        // Getters and Setters
        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getImagePath() {
            return imagePath;
        }

        public void setImagePath(String imagePath) {
            this.imagePath = imagePath;
        }
}
