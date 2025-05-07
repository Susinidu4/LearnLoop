package com.learn_loop_backend.backend.controller.LearningPlans;


import com.learn_loop_backend.backend.DTO.Learning_Plans.LearningPlansDTO;
import com.learn_loop_backend.backend.model.Learning_Plans.LearningPlan;
import com.learn_loop_backend.backend.service.LearnPlans.LearningPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/learning-plans")
public class LearningPlanController {

    @Autowired
    private LearningPlanService service;

    // CREATE
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Object> createLearningPlan(
            @ModelAttribute LearningPlan plan,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        // Check if userId is provided
        if (plan.getUserId() == null || plan.getUserId().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("UserId is required");
        }

        try {
            // Save the plan and upload image if present
            LearningPlan savedPlan = service.saveLearningPlan(plan, image);

            // Convert to DTO
            LearningPlansDTO dto = service.convertToDTO(savedPlan);
            return ResponseEntity.ok(dto);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create learning plan: " + e.getMessage());
        }
    }

    // get all learning plans
    @GetMapping
    public ResponseEntity<List<LearningPlan>> getAllLearningPlans() {
        List<LearningPlan> learningPlans = service.getAllLearningPlans();
        return ResponseEntity.ok(learningPlans);
    }

    // Get learning plans by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningPlansDTO>> getLearningPlansByUserId(@PathVariable String userId) {
        if (userId == null || userId.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Return 400 Bad Request if userId is invalid
        }
        List<LearningPlansDTO> learningPlansDTOList = service.getLearningPlansByUserId(userId);
        return ResponseEntity.ok(learningPlansDTOList);
    }

    // DELETE Learning Plan by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLearningPlan(@PathVariable String id) {
        try {
            service.deleteLearningPlan(id);
            return ResponseEntity.ok("Learning plan deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Learning plan not found with id: " + id);
        }
    }

}

