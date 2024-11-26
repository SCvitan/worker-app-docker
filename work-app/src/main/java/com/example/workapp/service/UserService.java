package com.example.workapp.service;

import com.example.workapp.entity.UserProfile;

import java.util.List;

public interface UserService {

    public UserProfile findUserByJwtToken(String jwt) throws Exception;

    public UserProfile findUserByEmail(String email) throws Exception;
}