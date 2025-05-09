package com.learn_loop_backend.backend.controller.profile_follower_management;

import com.learn_loop_backend.backend.model.profile_follower_management.Profile;
import com.learn_loop_backend.backend.service.profile_follower_management.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/profiles")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/{userId}/image")
    public ResponseEntity<?> uploadProfileImage(
            @PathVariable String userId,
            @RequestParam("file") MultipartFile file) {
        try {
            Profile profile = profileService.updateProfileImage(userId, file);
            return ResponseEntity.ok().body(profile.getImagePath());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload image: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}/image")
    public ResponseEntity<String> getProfileImageUrl(@PathVariable String userId) {
        String imageUrl = profileService.getProfileImageUrl(userId);
        if (imageUrl == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(imageUrl);
    }

    @DeleteMapping("/{userId}/image")
    public ResponseEntity<?> deleteProfileImage(@PathVariable String userId) {
        try {
            profileService.deleteProfileImage(userId);
            return ResponseEntity.ok().body("Image deleted successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete image: " + e.getMessage());
        }
    }
}