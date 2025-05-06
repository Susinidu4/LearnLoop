package com.learn_loop_backend.backend.model.Learning_Plans;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "learningPlans")
public class LearningPlan {
    @Id
    private String id;

    private String userId;

    private String planTopic;

    private String description;

    private int stepCount;

    private String completionDuration;

    private List<Step> steps;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

    @Data
    public static class Step {
        private int stepNumber;

        private String topic;

        private String resourceLink;

        private String completionDuration;
    }
}

