package com.example.workapp.service;

import com.example.workapp.dto.*;
import com.example.workapp.entity.*;
import com.example.workapp.enums.*;
import com.example.workapp.exceptions.UserAlreadyExistsException;
import com.example.workapp.repository.*;
import com.example.workapp.security.JwtProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.*;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepo userProfileRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private CustomUserDetailsImp customUserDetailsImp;
    @Autowired
    private WorkExperienceRepo workExperienceRepo;

    @Autowired
    private EducationRepo educationRepo;

    @Autowired
    private LanguageRepo languageRepo;

    @Autowired
    private DriverInfoRepo driverInfoRepo;



    public AuthResponse registerUser(AuthRequest request){
        if (userProfileRepo.existsByEmail(request.getEmail())){
            throw new UserAlreadyExistsException(request.getEmail());
        }

        UserProfile userProfile = new UserProfile();
        userProfile.setEmail(request.getEmail());
        userProfile.setPassword(passwordEncoder.encode(request.getPassword()));
        userProfileRepo.save(userProfile);
        Authentication authentication = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        AuthResponse authResponse = new AuthResponse();

        authResponse.setMessage("Registration successful");
        authResponse.setRole(userProfile.getRole());

        return authResponse;
    }

    public AuthResponse login(AuthRequest request){

        String username = request.getEmail();
        Authentication authentication = authenticate(username, request.getPassword());

        Collection<? extends GrantedAuthority>authorities = authentication.getAuthorities();
        String role = authorities.isEmpty()?null:authorities.iterator().next().getAuthority();

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login successful");
        authResponse.setRole(UserRole.valueOf(role));

        return authResponse;
    }



    public void patchCV(String jwt, Map<Object, Object> objectMap) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        UserProfile userProfile = findUserByEmail(email);

        objectMap.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(UserProfile.class, (String) key);
            field.setAccessible(true);

            // Check if the field is an enum
            if (field.getType().isEnum()) {
                Object enumValue = Enum.valueOf((Class<Enum>) field.getType(), value.toString());
                ReflectionUtils.setField(field, userProfile, enumValue);
            } else {
                ReflectionUtils.setField(field, userProfile, value);
            }
        });
        userProfileRepo.save(userProfile);
    }

    @Transactional
    public UserProfile saveUpdateCV(ApiRequestDTO dto, HttpServletRequest request) throws Exception {
        String jwt = extractJwtFromCookies(request);

        if (jwt == null) {
            throw new RuntimeException("JWT token is missing from cookies");
        }

        String email = jwtProvider.getEmailFromJwtToken(jwt);
        UserProfile userProfile = findUserByEmail(email);

        if (userProfile == null) {
            throw new RuntimeException("User not found with email: " + email);
        }

        // 1. Update Personal Info in the UserProfile
        userProfile = updatePersonalInfo(dto.getPersonalInfo(), userProfile);

        // 2. Update Work Experience, Education, Languages, and Driver Info
        updateWorkExperience(dto.getWorkExperience(), userProfile);
        updateEducation(dto.getEducation(), userProfile);
        updateLanguages(dto.getLanguages(), userProfile);
        updateDriverInfo(dto.getDriverInfo(), userProfile);

        // Save the updated profile at once after all mappings
        userProfileRepo.save(userProfile);

        return userProfile;
    }

    public Optional<UserProfile> getUserProfileById(Long userId) throws Exception {

        return userProfileRepo.findById(userId);
    }

    private UserProfile updatePersonalInfo(ApiRequestDTO.PersonalInfo personalInfoDTO, UserProfile userProfile) {
        // Update the personal info in UserProfile entity
        userProfile.setFirstName(personalInfoDTO.getFirstName());
        userProfile.setLastName(personalInfoDTO.getLastName());
        userProfile.setPhone(personalInfoDTO.getPhone());
        userProfile.setAddress(personalInfoDTO.getAddress());
        userProfile.setDateOfBirth(personalInfoDTO.getDateOfBirth());
        userProfile.setProfession(personalInfoDTO.getProfession());

        return userProfile;  // Return the updated UserProfile
    }

    private void updateWorkExperience(List<ApiRequestDTO.WorkExperience> workExperienceList, UserProfile userProfile) {
        for (ApiRequestDTO.WorkExperience workExperienceDTO : workExperienceList) {
            // Find existing work experience by matching fields (e.g., jobTitle)
            WorkExperience workExperience = workExperienceRepo.findByUserProfileAndJobTitle(userProfile, workExperienceDTO.getJobTitle());

            if (workExperience != null) {
                // Update existing work experience
                workExperience.setJobTitle(workExperienceDTO.getJobTitle());
                workExperience.setCompany(workExperienceDTO.getCompany());
                workExperience.setStartDate(workExperienceDTO.getStartDate());
                workExperience.setEndDate(workExperienceDTO.getEndDate());
                workExperience.setDescription(workExperienceDTO.getDescription());
            } else {
                // If no match, create a new WorkExperience record
                workExperience = new WorkExperience();
                workExperience.setJobTitle(workExperienceDTO.getJobTitle());
                workExperience.setCompany(workExperienceDTO.getCompany());
                workExperience.setStartDate(workExperienceDTO.getStartDate());
                workExperience.setEndDate(workExperienceDTO.getEndDate());
                workExperience.setDescription(workExperienceDTO.getDescription());
                workExperience.setUserProfile(userProfile);
                workExperienceRepo.save(workExperience);
            }
        }
    }

    private void updateEducation(List<ApiRequestDTO.Education> educationList, UserProfile userProfile) {
        for (ApiRequestDTO.Education educationDTO : educationList) {
            Education education = educationRepo.findByUserProfileAndDegree(userProfile, educationDTO.getDegree());

            if (education != null) {
                // Update existing education record
                education.setDegree(educationDTO.getDegree());
                education.setInstitution(educationDTO.getInstitution());
                education.setGraduationDate(educationDTO.getGraduationDate());
            } else {
                // Create new Education record
                education = new Education();
                education.setDegree(educationDTO.getDegree());
                education.setInstitution(educationDTO.getInstitution());
                education.setGraduationDate(educationDTO.getGraduationDate());
                education.setUserProfile(userProfile);
                educationRepo.save(education);
            }
        }
    }

    private void updateLanguages(List<ApiRequestDTO.Language> languageList, UserProfile userProfile) {
        for (ApiRequestDTO.Language languageDTO : languageList) {
            Language language = languageRepo.findByUserProfileAndLanguage(userProfile, languageDTO.getLanguage());

            if (language != null) {
                // Update existing language record
                language.setProficiency(languageDTO.getProficiency());
            } else {
                // Create new Language record
                language = new Language();
                language.setLanguage(languageDTO.getLanguage());
                language.setProficiency(languageDTO.getProficiency());
                language.setUserProfile(userProfile);
                languageRepo.save(language);
            }
        }
    }

    private void updateDriverInfo(ApiRequestDTO.DriverInfo driverInfoDTO, UserProfile userProfile) {
        DriverInfo driverInfo = driverInfoRepo.findByUserProfile(userProfile);

        if (driverInfo != null) {
            // Update existing driver info
            driverInfo.setLicenses(driverInfoDTO.getLicenses());
            driverInfo.setCountriesInterested(driverInfoDTO.getCountriesInterested());
            driverInfo.setCategoriesExperienced(driverInfoDTO.getCategoriesExperienced());
            driverInfo.setAccommodationCost(driverInfoDTO.getAccommodationCost());
            driverInfo.setAccommodation(driverInfoDTO.getAccommodation());
            driverInfo.setExpectedSalary(driverInfoDTO.getExpectedSalary());
        } else {
            // Create new DriverInfo record
            driverInfo = new DriverInfo();
            driverInfo.setLicenses(driverInfoDTO.getLicenses());
            driverInfo.setCountriesInterested(driverInfoDTO.getCountriesInterested());
            driverInfo.setCategoriesExperienced(driverInfoDTO.getCategoriesExperienced());
            driverInfo.setAccommodationCost(driverInfoDTO.getAccommodationCost());
            driverInfo.setAccommodation(driverInfoDTO.getAccommodation());
            driverInfo.setExpectedSalary(driverInfoDTO.getExpectedSalary());
            driverInfo.setUserProfile(userProfile);
            driverInfoRepo.save(driverInfo);
        }
    }


    public UserProfile findUserByEmail(String email) throws Exception {

        UserProfile userProfile = userProfileRepo.findByEmail(email);

        if (userProfile==null){
            throw new Exception("User not found.");
        }

        return userProfile;
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserDetailsImp.loadUserByUsername(username);
        if (userDetails==null){
            throw new BadCredentialsException("Invalid username.");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password.");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    private String extractJwtFromCookies(HttpServletRequest request) {
        // Get all cookies from the request
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                // Look for the cookie named 'jwt'
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();  // Return the value of the jwt cookie
                }
            }
        }
        return null; // JWT cookie not found
    }

}
