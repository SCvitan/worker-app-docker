package com.example.workapp.repository;

import com.example.workapp.entity.Language;
import com.example.workapp.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguageRepo extends JpaRepository<Language, Long> {
    Language findByUserProfileAndLanguage(UserProfile userProfile, String language);
}
