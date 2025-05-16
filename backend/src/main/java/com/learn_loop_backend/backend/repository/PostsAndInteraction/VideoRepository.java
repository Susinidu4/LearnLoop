package com.learn_loop_backend.backend.repository.PostsAndInteraction;

import com.learn_loop_backend.backend.model.PostsAndInteraction.Video;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VideoRepository extends MongoRepository<Video, String> {
    List<Video> findByUserId(String userId);
    Optional<Video> findByIdAndUserId(String id, String userId);
    List<Video> findAll(); // This comes from MongoRepository but we're explicitly declaring it
}