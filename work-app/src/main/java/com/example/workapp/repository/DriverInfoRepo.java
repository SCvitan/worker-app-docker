package com.example.workapp.repository;

import com.example.workapp.entity.DriverInfo;
import com.example.workapp.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverInfoRepo extends JpaRepository<DriverInfo, Long> {
    DriverInfo findByUserProfile(UserProfile userProfile);
}
