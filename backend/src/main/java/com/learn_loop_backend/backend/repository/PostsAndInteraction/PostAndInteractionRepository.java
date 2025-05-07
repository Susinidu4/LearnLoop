package com.learn_loop_backend.backend.repository.PostsAndInteraction;


import com.learn_loop_backend.backend.model.PostsAndInteraction.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PostAndInteractionRepository extends MongoRepository<Post, String> {
    List<Post> findByUserId(String userId);
    List<Post> findByCategory(String category);
    List<Post> findAll(); // This method is already provided by MongoRepository
}