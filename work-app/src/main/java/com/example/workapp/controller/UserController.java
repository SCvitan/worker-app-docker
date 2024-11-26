package com.example.workapp.controller;

import com.example.workapp.dto.*;
import com.example.workapp.enums.DurationOfRelocation;
import com.example.workapp.service.UserProfileService;
import com.example.workapp.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserProfileService userProfileService;


    @GetMapping("/profile")
    public ResponseEntity<?> findUserByJwtToken(@RequestHeader("Authorization") String jwt ) throws Exception {
        return ResponseEntity.ok(userService.findUserByJwtToken(jwt));
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveUpdateCV( @RequestBody ApiRequestDTO dto, HttpServletRequest request ) throws Exception {
        return ResponseEntity.ok(userProfileService.saveUpdateCV(dto, request));
    }

    @PatchMapping("/patchCV")
    public ResponseEntity<?> patchCV(@RequestHeader("Authorization") String jwt, @RequestBody Map<Object, Object> objectMap) throws Exception {
        userProfileService.patchCV(jwt, objectMap);
        return ResponseEntity.ok("CV patched");
    }






}
