package com.example.workapp.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class DriverLicenseExperienceDTO {

    private Boolean driverC;
    private Boolean driverCE;
    private Set<String> driverCEOptions;
    private Boolean driverAutobus;
    private Set<String> driverAutobusOptions;
}
