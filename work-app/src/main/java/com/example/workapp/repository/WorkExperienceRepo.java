package com.example.workapp.repository;

import com.example.workapp.entity.UserProfile;
import com.example.workapp.entity.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkExperienceRepo extends JpaRepository<WorkExperience, Long> {
    WorkExperience findByUserProfileAndJobTitle(UserProfile userProfile, String jobTitle);
}
