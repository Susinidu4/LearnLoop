package com.learn_loop_backend.backend.service.comments_likes_notification_management;


import com.learn_loop_backend.backend.DTO.comments_likes_notification_management.PostDTO;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Comment;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Like;
import com.learn_loop_backend.backend.model.Comments_Likes_Notification_Managemen.Post;
import com.learn_loop_backend.backend.repository.comments_like_notification_management.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public Post createPost(PostDTO postDTO) throws Exception {
        Post post = new Post();
        post.setUserId(postDTO.getUserId());
        post.setDescription(postDTO.getDescription());
        post.setCategory(postDTO.getCategory());

        if (postDTO.getMediaFiles() != null && !postDTO.getMediaFiles().isEmpty()) {
            List<String> mediaPaths = fileStorageService.storeFiles(postDTO.getMediaFiles());
            post.setMediaPaths(mediaPaths);
        }

        post.setCreatedAt(new Date());
        post.setUpdatedAt(new Date());

        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(String id) {
        return postRepository.findById(id);
    }

    public List<Post> getPostsByUserId(String userId) {
        return postRepository.findByUserId(userId);
    }

    public List<Post> getPostsByCategory(String category) {
        return postRepository.findByCategory(category);
    }

    public Post updatePost(String id, PostDTO postDTO) throws Exception {
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            post.setDescription(postDTO.getDescription());
            post.setCategory(postDTO.getCategory());
            post.setUpdatedAt(new Date());

            if (postDTO.getMediaFiles() != null && !postDTO.getMediaFiles().isEmpty()) {
                List<String> mediaPaths = fileStorageService.storeFiles(postDTO.getMediaFiles());
                post.setMediaPaths(mediaPaths);
            }

            return postRepository.save(post);
        }
        return null;
    }

    public void deletePost(String id) {
        postRepository.deleteById(id);
    }

    public Post addComment(Comment comment, String postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            List<Comment> comments = post.getComments();
            if (comments == null) {
                comments = new ArrayList<>();
                post.setComments(comments);
            }
            comments.add(comment);
            return postRepository.save(post);
        }
        return null;
    }

    public Post likePost(Like like, String postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            List<Like> likes = post.getLikes();
            likes.add(like);
            post.setLikes(likes);
            return postRepository.save(post);
        }
        return null;
    }

    public Post unlikePost(String userId, String postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            List<Like> likes = post.getLikes();
            likes.removeIf(like -> like.getUserId().equals(userId));
            post.setLikes(likes);
            return postRepository.save(post);
        }
        return null;
    }
}