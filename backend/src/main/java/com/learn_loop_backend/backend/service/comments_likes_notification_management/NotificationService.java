package com.learn_loop_backend.backend.service.comments_likes_notification_management;

import com.learn_loop_backend.backend.DTO.comments_likes_notification_management.NotificationDTO;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Notification;
import com.learn_loop_backend.backend.repository.Comment_Like_Notification_Management.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(NotificationDTO dto) {
        Notification notification = new Notification(
                dto.getPostId(),
                dto.getReceiverUserId(),
                dto.getSenderUserId(),
                dto.getType(),
                dto.getMessage(),
                "unread",
                LocalDateTime.now()
        );
        notificationRepository.save(notification);
    }

    public List<NotificationDTO> getNotifications(String receiverUserId) {
        return notificationRepository.findByReceiverUserIdOrderByCreatedAtDesc(receiverUserId)
                .stream()
                .map(n -> new NotificationDTO(
                        n.getPostId(),
                        n.getReceiverUserId(),
                        n.getSenderUserId(),
                        n.getType(),
                        n.getMessage(),
                        n.getStatus(),
                        n.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }
}
