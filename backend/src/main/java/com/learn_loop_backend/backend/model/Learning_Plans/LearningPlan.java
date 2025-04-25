package com.learn_loop_backend.backend.model.Learning_Plans;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "learningPlans")
public class LearningPlan {

    @Id
    private String id;

    private String userId;
    private String title;
    private String description;
    private int durationInWeeks;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<Step> steps;         
    private String banner;            


    // Parameterized constructor
    public LearningPlan(String userId, String title, String description,
                        int durationInWeeks, LocalDate startDate, LocalDate endDate,
                        List<Step> steps, String banner) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.durationInWeeks = durationInWeeks;
        this.startDate = startDate;
        this.endDate = endDate;
        this.steps = steps;
        this.banner = banner;
    }

    // Inner class for step data
    public static class Step {
        private String topic;
        private String resourceLink;
        private int completionDuration; // in days or weeks

        public Step() {
        }

        public Step(String topic, String resourceLink, int completionDuration) {
            this.topic = topic;
            this.resourceLink = resourceLink;
            this.completionDuration = completionDuration;
        }

        // Getters and Setters
        public String getTopic() { return topic; }
        public void setTopic(String topic) { this.topic = topic; }

        public String getResourceLink() { return resourceLink; }
        public void setResourceLink(String resourceLink) { this.resourceLink = resourceLink; }

        public int getCompletionDuration() { return completionDuration; }
        public void setCompletionDuration(int completionDuration) { this.completionDuration = completionDuration; }
    }

    // Getters and Setters for LearningPlan class
    // (You can generate these with your IDE or use Lombok)
}

