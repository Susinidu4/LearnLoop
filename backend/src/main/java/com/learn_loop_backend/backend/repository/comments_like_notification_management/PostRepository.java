package com.learn_loop_backend.backend.repository.comments_like_notification_management;

import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByUserId(String userId);
    List<Post> findByCategory(String category);
}