package com.learn_loop_backend.backend.service.LearnPlans;

import com.learn_loop_backend.backend.DTO.Learning_Plans.LearningPlansDTO;
import com.learn_loop_backend.backend.model.Learning_Plans.LearningPlan;
import com.learn_loop_backend.backend.repository.LearningPlans.LearningPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cloudinary.Cloudinary;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.utils.ObjectUtils;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LearningPlanService {

    @Autowired
    private LearningPlanRepository repository;

    @Autowired
    private Cloudinary cloudinary;

    // CREATE
    public LearningPlan saveLearningPlan(LearningPlan plan, MultipartFile image) {
        // If an image is provided, upload it to Cloudinary
        if (image != null && !image.isEmpty()) {
            try {
                var uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.asMap("resource_type", "auto"));
                String imageUrl = (String) uploadResult.get("url");
                plan.setImageUrl(imageUrl); // Assuming you added an imageUrl field in your LearningPlan model
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Failed to upload image to Cloudinary", e);
            }
        }

        return repository.save(plan);
    }

    // Fetch all learning plans
    public List<LearningPlan> getAllLearningPlans() {
        return repository.findAll();
    }

    // READ by userId
    public List<LearningPlansDTO> getLearningPlansByUserId(String userId) {
        List<LearningPlan> learningPlans = repository.findByUserId(userId);

        // Convert LearningPlan entities to LearningPlansDTO
        return learningPlans.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // DELETE by id
    public void deleteLearningPlan(String id) {
        Optional<LearningPlan> plan = repository.findById(id);
        if (plan.isPresent()) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Learning plan not found with id: " + id);
        }
    }

    // CONVERT LearningPlan to DTO
    public LearningPlansDTO convertToDTO(LearningPlan plan) {
        LearningPlansDTO dto = new LearningPlansDTO();
        dto.setId(plan.getId());
        dto.setUserId(plan.getUserId());
        dto.setPlanTopic(plan.getPlanTopic());
        dto.setDescription(plan.getDescription());
        dto.setStepCount(plan.getStepCount());
        dto.setCompletionDuration(plan.getCompletionDuration());
        dto.setCreatedAt(plan.getCreatedAt());
        dto.setUpdatedAt(plan.getUpdatedAt());
        dto.setImageUrl(plan.getImageUrl());

        // Convert steps into DTO
        dto.setSteps(plan.getSteps().stream().map(step -> {
            LearningPlansDTO.StepDTO stepDTO = new LearningPlansDTO.StepDTO();
            stepDTO.setStepNumber(step.getStepNumber());
            stepDTO.setTopic(step.getTopic());
            stepDTO.setResourceLink(step.getResourceLink());
            stepDTO.setCompletionDuration(step.getCompletionDuration());
            return stepDTO;
        }).collect(Collectors.toList()));

        return dto;
    }
}
