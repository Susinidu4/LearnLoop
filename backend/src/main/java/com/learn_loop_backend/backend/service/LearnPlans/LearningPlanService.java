package com.learn_loop_backend.backend.service.LearnPlans;

import com.learn_loop_backend.backend.model.Learning_Plans.LearningPlan;
import com.learn_loop_backend.backend.repository.LearningPlans.LearningPlanRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LearningPlanService {

    @Autowired
    private LearningPlanRepository repository;

    // CREATE
    public LearningPlan createPlan(LearningPlan plan) {
        return repository.save(plan);
    }

    // READ (by ID)
    public Optional<LearningPlan> getPlanById(String id) {
        return repository.findById(id);
    }

    // READ (by User)
    public List<LearningPlan> getPlansByUser(String userId) {
        return repository.findByUserId(userId);
    }

    // UPDATE
    public LearningPlan updatePlan(LearningPlan plan) {
        return repository.save(plan); // Spring will overwrite if ID exists
    }

    // DELETE
    public void deletePlan(String id) {
        repository.deleteById(id);
    }
}
