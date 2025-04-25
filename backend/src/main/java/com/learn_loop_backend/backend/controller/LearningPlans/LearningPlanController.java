package com.learn_loop_backend.backend.controller.LearningPlans;


import com.learn_loop_backend.backend.model.Learning_Plans.LearningPlan;
import com.learn_loop_backend.backend.service.LearnPlans.LearningPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/learning-plans")
@CrossOrigin(origins = "*") // Allow requests from frontend (React)
public class LearningPlanController {

    @Autowired
    private LearningPlanService service;

    // CREATE
    @PostMapping
    public ResponseEntity<?> createPlan(@RequestBody LearningPlan plan) {
        if (plan.getDurationInWeeks() <= 0) {
            return ResponseEntity.badRequest().body("Duration must be a positive number.");
        }
        return ResponseEntity.ok(service.createPlan(plan));
    }

    // READ by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getPlanById(@PathVariable String id) {
        Optional<LearningPlan> plan = service.getPlanById(id);
        return plan.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    // READ by User
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningPlan>> getPlansByUser(@PathVariable String userId) {
        return ResponseEntity.ok(service.getPlansByUser(userId));
    }

    // UPDATE
    @PutMapping("/update")
    public ResponseEntity<?> updatePlan(@RequestBody LearningPlan plan) {
        if (plan.getDurationInWeeks() <= 0) {
            return ResponseEntity.badRequest().body("Duration must be positive.");
        }
        return ResponseEntity.ok(service.updatePlan(plan));
    }

    // DELETE
    @DeleteMapping("/delete")
    public ResponseEntity<?> deletePlan(@RequestParam String id) {
        service.deletePlan(id);
        return ResponseEntity.ok("Deleted successfully.");
    }
}

