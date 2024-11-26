package com.example.workapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FilterRequestDTO {

    private String profession;
    private String experience;
    private List<String> driversLicences;
    private List<String> jobInterest;
    private List<String> countriesInterestedWorkingIn;
    private List<String> categoriesExperiencedWith;
}
