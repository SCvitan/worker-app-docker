package com.example.workapp.repository;

import com.example.workapp.entity.UserProfile;
import com.example.workapp.enums.DriversLicence;
import com.example.workapp.enums.JobInterest;
import com.example.workapp.enums.Profession;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface UserProfileRepo extends JpaRepository<UserProfile, Long> {

    boolean existsByEmail(String email);

    UserProfile findByEmail(String email);

    List<UserProfile> findAll(Specification<UserProfile> spec);
}
