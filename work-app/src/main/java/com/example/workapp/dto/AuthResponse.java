package com.example.workapp.dto;

import com.example.workapp.enums.UserRole;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AuthResponse {
    private String jwt;
    private String message;
    private UserRole role;
}
