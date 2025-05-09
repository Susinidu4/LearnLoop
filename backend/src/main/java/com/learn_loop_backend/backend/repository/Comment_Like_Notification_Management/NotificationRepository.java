package com.learn_loop_backend.backend.repository.Comment_Like_Notification_Management;

import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByReceiverUserIdOrderByCreatedAtDesc(String receiverUserId);
}
