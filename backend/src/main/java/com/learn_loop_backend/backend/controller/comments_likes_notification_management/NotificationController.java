package com.learn_loop_backend.backend.controller.comments_likes_notification_management;

import com.learn_loop_backend.backend.DTO.comments_likes_notification_management.NotificationDTO;
import com.learn_loop_backend.backend.service.comments_likes_notification_management.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public void createNotification(@RequestBody NotificationDTO dto) {
        notificationService.createNotification(dto);
    }

    @GetMapping("/{receiverUserId}")
    public List<NotificationDTO> getUserNotifications(@PathVariable String receiverUserId) {
        return notificationService.getNotifications(receiverUserId);
    }
}
