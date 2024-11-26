package com.example.workapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class LanguageUpdateRequest {
    private List<String> languages;

}
