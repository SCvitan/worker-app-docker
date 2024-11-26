package com.example.workapp.service;

import com.example.workapp.entity.UserProfile;
import com.example.workapp.repository.UserProfileRepo;
import com.example.workapp.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserProfileRepo userProfileRepo;
    @Autowired
    private JwtProvider jwtProvider;


    @Override
    public UserProfile findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        UserProfile userProfile = findUserByEmail(email);

        return userProfile;
    }

    @Override
    public UserProfile findUserByEmail(String email) throws Exception {

        UserProfile userProfile = userProfileRepo.findByEmail(email);

        if (userProfile==null){
            throw new Exception("User not found.");
        }

        return userProfile;
    }
}




