package com.example.workapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobExperienceDTO {
    private String companyName;
    private String jobTitle;
    private Integer yearsWorked;
    private String location;
    private String shortDescription;
}
