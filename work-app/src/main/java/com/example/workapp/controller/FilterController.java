package com.example.workapp.controller;

import com.example.workapp.dto.FilterRequestDTO;
import com.example.workapp.entity.UserProfile;
import com.example.workapp.service.FilterService;
import com.example.workapp.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/filter")
public class FilterController {

    @Autowired
    private FilterService filterService;

    @Autowired
    private UserProfileService userProfileService;

    @PostMapping("/")
    public List<UserProfile> filterUsers(@RequestBody FilterRequestDTO filterRequest) {
        return filterService.filterUsers(filterRequest);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Optional<UserProfile>> getUserProfileById(@PathVariable Long userId ) throws Exception {
        return ResponseEntity.ok(userProfileService.getUserProfileById(userId));
    }

}
