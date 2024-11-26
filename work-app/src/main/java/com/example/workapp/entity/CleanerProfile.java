package com.example.workapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CleanerProfile {
    @Id
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;

    private String cleaningSpecialty;  // Example: Residential, Commercial, Industrial
    private Boolean certifiedForHazardousWaste;
    private Integer yearsOfExperience;
}
