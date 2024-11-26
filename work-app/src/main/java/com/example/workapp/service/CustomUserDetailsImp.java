package com.example.workapp.service;

import com.example.workapp.entity.UserProfile;
import com.example.workapp.enums.UserRole;
import com.example.workapp.repository.UserProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsImp implements UserDetailsService {

    @Autowired
    private UserProfileRepo userProfileRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserProfile user = userProfileRepo.findByEmail(username);

        if (user==null){
            throw new UsernameNotFoundException("User not found with email " + username);
        }

        UserRole role = user.getRole();

        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(role.toString()));




        return new User(user.getEmail(), user.getPassword(), authorities);
    }
}
