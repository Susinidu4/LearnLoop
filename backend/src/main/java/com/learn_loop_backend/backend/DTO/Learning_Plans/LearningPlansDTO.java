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

    public void setImageUrl(String imageUrl) {
    }

    @Data
    public static class StepDTO {
        private int stepNumber;
        private String topic;

        public int getStepNumber() {
            return stepNumber;
        }

        public void setStepNumber(int stepNumber) {
            this.stepNumber = stepNumber;
        }

        public String getTopic() {
            return topic;
        }

        public void setTopic(String topic) {
            this.topic = topic;
        }

        public String getResourceLink() {
            return resourceLink;
        }

        public void setResourceLink(String resourceLink) {
            this.resourceLink = resourceLink;
        }

        public String getCompletionDuration() {
            return completionDuration;
        }

        public void setCompletionDuration(String completionDuration) {
            this.completionDuration = completionDuration;
        }

        private String resourceLink;
        private String completionDuration;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPlanTopic() {
        return planTopic;
    }

    public void setPlanTopic(String planTopic) {
        this.planTopic = planTopic;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStepCount() {
        return stepCount;
    }

    public void setStepCount(int stepCount) {
        this.stepCount = stepCount;
    }

    public String getCompletionDuration() {
        return completionDuration;
    }

    public void setCompletionDuration(String completionDuration) {
        this.completionDuration = completionDuration;
    }

    public List<StepDTO> getSteps() {
        return steps;
    }

    public void setSteps(List<StepDTO> steps) {
        this.steps = steps;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }


}
