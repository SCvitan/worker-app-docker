package com.example.workapp.dto;

import java.util.List;

public class ApiRequestDTO {

    private PersonalInfo personalInfo;
    private List<WorkExperience> workExperience;
    private List<Education> education;
    private List<String> skills;
    private List<Language> languages;
    private DriverInfo driverInfo;


    public PersonalInfo getPersonalInfo() {
        return personalInfo;
    }

    public void setPersonalInfo(PersonalInfo personalInfo) {
        this.personalInfo = personalInfo;
    }

    public List<WorkExperience> getWorkExperience() {
        return workExperience;
    }

    public void setWorkExperience(List<WorkExperience> workExperience) {
        this.workExperience = workExperience;
    }

    public List<Education> getEducation() {
        return education;
    }

    public void setEducation(List<Education> education) {
        this.education = education;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<Language> getLanguages() {
        return languages;
    }

    public void setLanguages(List<Language> languages) {
        this.languages = languages;
    }

    public DriverInfo getDriverInfo() {
        return driverInfo;
    }

    public void setDriverInfo(DriverInfo driverInfo) {
        this.driverInfo = driverInfo;
    }

    // Nested Classes

    public static class PersonalInfo {
        private String firstName;
        private String lastName;
        private String phone;
        private String address;
        private String dateOfBirth;
        private String profession;

        // Getters and Setters
        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getDateOfBirth() {
            return dateOfBirth;
        }

        public void setDateOfBirth(String dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
        }

        public String getProfession() {
            return profession;
        }

        public void setProfession(String profession) {
            this.profession = profession;
        }
    }

    public static class WorkExperience {
        private String jobTitle;
        private String company;
        private String startDate;
        private String endDate;
        private String description;

        // Getters and Setters
        public String getJobTitle() {
            return jobTitle;
        }

        public void setJobTitle(String jobTitle) {
            this.jobTitle = jobTitle;
        }

        public String getCompany() {
            return company;
        }

        public void setCompany(String company) {
            this.company = company;
        }

        public String getStartDate() {
            return startDate;
        }

        public void setStartDate(String startDate) {
            this.startDate = startDate;
        }

        public String getEndDate() {
            return endDate;
        }

        public void setEndDate(String endDate) {
            this.endDate = endDate;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    public static class Education {
        private String degree;
        private String institution;
        private String graduationDate;

        // Getters and Setters
        public String getDegree() {
            return degree;
        }

        public void setDegree(String degree) {
            this.degree = degree;
        }

        public String getInstitution() {
            return institution;
        }

        public void setInstitution(String institution) {
            this.institution = institution;
        }

        public String getGraduationDate() {
            return graduationDate;
        }

        public void setGraduationDate(String graduationDate) {
            this.graduationDate = graduationDate;
        }
    }

    public static class Language {
        private String language;
        private String proficiency;

        // Getters and Setters
        public String getLanguage() {
            return language;
        }

        public void setLanguage(String language) {
            this.language = language;
        }

        public String getProficiency() {
            return proficiency;
        }

        public void setProficiency(String proficiency) {
            this.proficiency = proficiency;
        }
    }

    public static class DriverInfo {
        private List<String> licenses;
        private List<String> countriesInterested;
        private List<String> categoriesExperienced;
        private String accommodationCost;
        private String accommodation;
        private int expectedSalary;

        // Getters and Setters
        public List<String> getLicenses() {
            return licenses;
        }

        public void setLicenses(List<String> licenses) {
            this.licenses = licenses;
        }

        public List<String> getCountriesInterested() {
            return countriesInterested;
        }

        public void setCountriesInterested(List<String> countriesInterested) {
            this.countriesInterested = countriesInterested;
        }

        public List<String> getCategoriesExperienced() {
            return categoriesExperienced;
        }

        public void setCategoriesExperienced(List<String> categoriesExperienced) {
            this.categoriesExperienced = categoriesExperienced;
        }

        public String getAccommodationCost() {
            return accommodationCost;
        }

        public void setAccommodationCost(String accommodationCost) {
            this.accommodationCost = accommodationCost;
        }

        public String getAccommodation() {
            return accommodation;
        }

        public void setAccommodation(String accommodation) {
            this.accommodation = accommodation;
        }

        public int getExpectedSalary() {
            return expectedSalary;
        }

        public void setExpectedSalary(int expectedSalary) {
            this.expectedSalary = expectedSalary;
        }
    }
}

