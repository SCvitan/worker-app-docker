package com.example.workapp.entity;

import com.example.workapp.dto.ApiRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String degree;
    private String institution;
    private String graduationDate;

    @ManyToOne
    @JoinColumn(name = "personal_info_id")
    private UserProfile userProfile;
}
