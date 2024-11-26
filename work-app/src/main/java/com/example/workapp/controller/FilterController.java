package com.example.workapp.controller;

import com.example.workapp.dto.FilterRequestDTO;
import com.example.workapp.entity.UserProfile;
import com.example.workapp.service.FilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/filter")
public class FilterController {

    @Autowired
    private FilterService filterService;

    @PostMapping("/")
    public List<UserProfile> filterUsers(@RequestBody FilterRequestDTO filterRequest) {
        return filterService.filterUsers(filterRequest);
    }

}
