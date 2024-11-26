package com.example.workapp.service;

import com.example.workapp.dto.FilterRequestDTO;
import com.example.workapp.entity.DriverInfo;
import com.example.workapp.entity.UserProfile;
import com.example.workapp.repository.UserProfileRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilterService {

    @Autowired
    private UserProfileRepo userProfileRepo;

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public List<UserProfile> filterUsers(FilterRequestDTO filterDTO) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<UserProfile> cq = cb.createQuery(UserProfile.class);
        Root<UserProfile> userProfile = cq.from(UserProfile.class);

        Join<UserProfile, DriverInfo> driverInfoJoin = userProfile.join("driverInfo", JoinType.LEFT);

        Join<DriverInfo, String> licensesJoin = driverInfoJoin.join("licenses", JoinType.LEFT);
        Join<DriverInfo, String> categoriesExperiencedJoin = driverInfoJoin.join("categoriesExperienced", JoinType.LEFT);
        Join<DriverInfo, String> countriesInterestedJoin = driverInfoJoin.join("countriesInterested", JoinType.LEFT);

        Predicate predicate = cb.conjunction();  // Default to no filtering (empty condition)

        if (filterDTO.getProfession() != null && !filterDTO.getProfession().isEmpty()) {
            predicate = cb.and(predicate, cb.equal(userProfile.get("profession"), filterDTO.getProfession()));
        }

        if (filterDTO.getDriversLicences() != null && !filterDTO.getDriversLicences().isEmpty()) {
            predicate = cb.and(predicate, licensesJoin.in(filterDTO.getDriversLicences()));
        }



        if (filterDTO.getCategoriesExperiencedWith() != null && !filterDTO.getCategoriesExperiencedWith().isEmpty()) {
            predicate = cb.and(predicate, categoriesExperiencedJoin.in(filterDTO.getCategoriesExperiencedWith()));
        }

        if (filterDTO.getCountriesInterestedWorkingIn() != null && !filterDTO.getCountriesInterestedWorkingIn().isEmpty()) {
            predicate = cb.and(predicate, countriesInterestedJoin.in(filterDTO.getCountriesInterestedWorkingIn()));
        }

        cq.where(predicate);

        return entityManager.createQuery(cq).getResultList();
    }





}
