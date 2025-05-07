package com.learn_loop_backend.backend.service.profile_follower_management;

import com.learn_loop_backend.backend.model.profile_follower_management.Profile;
import com.learn_loop_backend.backend.repository.profile_follower_management.ProfileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public Profile createProfile(String userId) {
        Profile profile = new Profile(userId);
        return profileRepository.save(profile);
    }

    public Profile getProfileByUserId(String userId) {
        return profileRepository.findByUserId(userId);
    }

    public Profile updateProfileImage(String userId, MultipartFile file) throws IOException {
        Profile profile = getProfileByUserId(userId);
        if (profile == null) {
            profile = createProfile(userId);
        }

        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);

        // Save file
        Files.copy(file.getInputStream(), filePath);

        // Update profile with new image path
        profile.setImagePath(filename);
        return profileRepository.save(profile);
    }

    public void deleteProfileImage(String userId) throws IOException {
        Profile profile = getProfileByUserId(userId);
        if (profile != null && profile.getImagePath() != null) {
            Path filePath = Paths.get(uploadDir).resolve(profile.getImagePath());
            Files.deleteIfExists(filePath);
            profile.setImagePath(null);
            profileRepository.save(profile);
        }
    }

    public byte[] getProfileImage(String userId) throws IOException {
        Profile profile = getProfileByUserId(userId);
        if (profile == null || profile.getImagePath() == null) {
            return null;
        }
        Path filePath = Paths.get(uploadDir).resolve(profile.getImagePath());
        return Files.readAllBytes(filePath);
    }
}