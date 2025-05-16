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
import java.util.*;
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

    // READ by Learning plans ID
    public Optional<LearningPlan> getLearningPlanById(String id) {
        return repository.findById(id);
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

    // Update by id
    public LearningPlan updateLearningPlan(String id, LearningPlan updatedPlan) {
        Optional<LearningPlan> existingOptional = repository.findById(id);
        if (existingOptional.isEmpty()) {
            throw new RuntimeException("Learning plan not found with id: " + id);
        }

        LearningPlan existingPlan = existingOptional.get();

        // Update fields
        existingPlan.setPlanTopic(updatedPlan.getPlanTopic());
        existingPlan.setDescription(updatedPlan.getDescription());
        existingPlan.setStepCount(updatedPlan.getStepCount());
        existingPlan.setCompletionDuration(updatedPlan.getCompletionDuration());
        existingPlan.setSteps(updatedPlan.getSteps());
        existingPlan.setUpdatedAt(new Date());

        return repository.save(existingPlan);
    }

    // Update step status
    public LearningPlan updateStepStatus(String planId, int stepNumber, String status) {
        Optional<LearningPlan> optionalPlan = repository.findById(planId);
        if (optionalPlan.isEmpty()) {
            throw new RuntimeException("Learning plan not found with id: " + planId);
        }

        LearningPlan plan = optionalPlan.get();

        boolean updated = false;
        for (var step : plan.getSteps()) {
            if (step.getStepNumber() == stepNumber) {
                step.setStatus(status);
                updated = true;
                break;
            }
        }

        if (!updated) {
            throw new RuntimeException("Step not found with step number: " + stepNumber);
        }

        plan.setUpdatedAt(new Date());
        return repository.save(plan);
    }

    // Learning Plan Progress Stats
    public Map<String, Integer> getLearningPlanProgressStats() {
        List<LearningPlan> plans = repository.findAll();
        int activated = plans.size();
        int completed = 0;
        int inProgress = 0;

        for (LearningPlan plan : plans) {
            List<LearningPlan.Step> steps = plan.getSteps();
            if (steps == null || steps.isEmpty()) continue;

            long completedSteps = steps.stream()
                    .filter(step -> "completed".equalsIgnoreCase(step.getStatus()))
                    .count();

            if (completedSteps == steps.size()) {
                completed++;
            } else if (completedSteps > 0) {
                inProgress++;
            }
        }

        Map<String, Integer> result = new HashMap<>();
        result.put("activated", activated);
        result.put("completed", completed);
        result.put("inProgress", inProgress);
        return result;
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
            stepDTO.setStatus(step.getStatus());
            return stepDTO;
        }).collect(Collectors.toList()));

        return dto;
    }
}
