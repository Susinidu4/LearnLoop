package com.learn_loop_backend.backend.service.profile_follower_management;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.learn_loop_backend.backend.model.profile_follower_management.Profile;
import com.learn_loop_backend.backend.repository.profile_follower_management.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final Cloudinary cloudinary;

    @Autowired
    public ProfileService(ProfileRepository profileRepository, Cloudinary cloudinary) {
        this.profileRepository = profileRepository;
        this.cloudinary = cloudinary;
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

        // Upload image to Cloudinary
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "folder", "profile_images",
                        "public_id", "user_" + userId,
                        "overwrite", true
                ));

        // Get the secure URL of the uploaded image
        String imageUrl = (String) uploadResult.get("secure_url");

        // Update profile with the Cloudinary URL
        profile.setImagePath(imageUrl);
        return profileRepository.save(profile);
    }

    public void deleteProfileImage(String userId) throws IOException {
        Profile profile = getProfileByUserId(userId);
        if (profile != null && profile.getImagePath() != null) {
            // Delete image from Cloudinary
            cloudinary.uploader().destroy("profile_images/user_" + userId, ObjectUtils.emptyMap());
            profile.setImagePath(null);
            profileRepository.save(profile);
        }
    }

    public String getProfileImageUrl(String userId) {
        Profile profile = getProfileByUserId(userId);
        return profile != null ? profile.getImagePath() : null;
    }
}