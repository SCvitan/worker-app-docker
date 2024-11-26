package com.example.workapp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DriverInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<String> licenses;

    @ElementCollection
    private List<String> countriesInterested;

    @ElementCollection
    private List<String> categoriesExperienced;

    private String accommodationCost;
    private String accommodation;
    private int expectedSalary;

    @OneToOne
    @JoinColumn(name = "personal_info_id")
    @JsonBackReference
    private UserProfile userProfile;
}
