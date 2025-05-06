package com.learn_loop_backend.backend.controller.LearningPlans;


import com.learn_loop_backend.backend.DTO.Learning_Plans.LearningPlansDTO;
import com.learn_loop_backend.backend.model.Learning_Plans.LearningPlan;
import com.learn_loop_backend.backend.service.LearnPlans.LearningPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/learning-plans")
public class LearningPlanController {

    @Autowired
    private LearningPlanService service;

    // CREATE
    @PostMapping
    public ResponseEntity<LearningPlansDTO> createLearningPlan(@RequestBody LearningPlan plan) {
        // Ensure the userId is present in the request body
        if (plan.getUserId() == null || plan.getUserId().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Return 400 Bad Request if userId is missing
        }

        LearningPlan savedPlan = service.saveLearningPlan(plan);
        LearningPlansDTO planDTO = service.convertToDTO(savedPlan);
        return ResponseEntity.ok(planDTO);
    }

    // Endpoint to get all learning plans
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

