package com.example.workapp.repository;

import com.example.workapp.entity.Education;
import com.example.workapp.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepo extends JpaRepository<Education, Long> {
    Education findByUserProfileAndDegree(UserProfile userProfile, String degree);
}
