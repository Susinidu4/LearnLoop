package com.learn_loop_backend.backend.model.profile_follower_management;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("followings")
public class Following {

    @Id
    private String id ;
    private String followerId ;
    private String followINGId ;

    public Following(String followerId, String followINGId) {
        this.followerId = followerId;
        this.followINGId = followINGId;
    }

    public String getFollowerId() {
        return followerId;
    }

    public void setFollowerId(String followerId) {
        this.followerId = followerId;
    }

    public String getFollowINGId() {
        return followINGId;
    }

    public void setFollowINGId(String followINGId) {
        this.followINGId = followINGId;
    }
}
