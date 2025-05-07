package com.learn_loop_backend.backend.DTO.Learning_Plans;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class LearningPlansDTO {
    private String id;
    private String userId;
    private String planTopic;
    private String description;
    private int stepCount;
    private String completionDuration;
    private List<StepDTO> steps;
    private Date createdAt;
    private Date updatedAt;

    @Data
    public static class StepDTO {
        private int stepNumber;
        private String topic;
        private String resourceLink;
        private String completionDuration;
    }
}
