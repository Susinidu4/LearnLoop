package com.learn_loop_backend.backend.controller.PostsAndInteraction;


import com.learn_loop_backend.backend.model.PostsAndInteraction.Post;
import com.learn_loop_backend.backend.service.PostsAndInteraction.PostAndInteractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController("postsInteractionController")
@RequestMapping("/api/posts-interaction")
public class PostController {

    @Autowired
    private PostAndInteractionService postService;

    @PostMapping
    public ResponseEntity<Post> createPost(
            @RequestParam("userId") String userId,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("files") MultipartFile[] files) throws IOException {

        Post post = postService.createPost(userId, description, category, files);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> getPostsByUser(@PathVariable String userId) {
        List<Post> posts = postService.getPostsByUser(userId);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Post>> getPostsByCategory(@PathVariable String category) {
        List<Post> posts = postService.getPostsByCategory(category);
        return ResponseEntity.ok(posts);
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }
}