package com.learn_loop_backend.backend.repository.LearningPlans;

import com.learn_loop_backend.backend.model.Learning_Plans.LearningPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningPlanRepository extends MongoRepository<LearningPlan, String> {
    
    // Custom method to get all plans by a specific user
    List<LearningPlan> findByUserId(String userId);
    
    // You can add more custom queries if needed
}

