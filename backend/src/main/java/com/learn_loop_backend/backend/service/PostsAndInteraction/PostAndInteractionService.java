package com.learn_loop_backend.backend.service.PostsAndInteraction;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.learn_loop_backend.backend.model.PostsAndInteraction.Post;
import com.learn_loop_backend.backend.repository.PostsAndInteraction.PostAndInteractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

@Service
public class PostAndInteractionService {

    @Autowired
    private PostAndInteractionRepository postRepository;

    @Autowired
    private Cloudinary cloudinary;

    public Post createPost(String userId, String description, String category, MultipartFile[] files) throws IOException {
        Post post = new Post();
        post.setUserId(userId);
        post.setDescription(description);
        post.setCategory(category);
        post.setCreatedAt(new Date());
        post.setUpdatedAt(new Date());

        List<String> mediaUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("resource_type", "auto"));
            mediaUrls.add((String) uploadResult.get("url"));
        }
        post.setMediaUrls(mediaUrls);

        return postRepository.save(post);
    }

    public List<Post> getPostsByUser(String userId) {
        return postRepository.findByUserId(userId);
    }

    public List<Post> getPostsByCategory(String category) {
        return postRepository.findByCategory(category);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(String postId) {
        return postRepository.findById(postId).orElse(null);
    }
}