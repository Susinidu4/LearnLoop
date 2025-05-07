package com.learn_loop_backend.backend.controller.profile_follower_management;

import com.learn_loop_backend.backend.model.profile_follower_management.Profile;
import com.learn_loop_backend.backend.service.profile_follower_management.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
            return ResponseEntity.ok().body("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }

    @GetMapping("/{userId}/image")
    public ResponseEntity<byte[]> getProfileImage(@PathVariable String userId) {
        try {
            byte[] imageBytes = profileService.getProfileImage(userId);
            if (imageBytes == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{userId}/image")
    public ResponseEntity<?> deleteProfileImage(@PathVariable String userId) {
        try {
            profileService.deleteProfileImage(userId);
            return ResponseEntity.ok().body("Image deleted successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete image");
        }
    }
}