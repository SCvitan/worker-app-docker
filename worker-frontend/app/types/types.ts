// src/types.ts
export type DriverData = {
    licenses: string[];
    workPlace: string;
    experience: string[];
    yearsOfExperience: { from: string; to: string };
    salary: { from: string; to: string };
  };
  

  export type DriverInfo = {
    id: number;
    licenses: string[];
    countriesInterested: string[];
    categoriesExperienced: string[];
    accommodationCost: string;
    accommodation: string;
    expectedSalary: number;
  }
  
  export type Education = {
    id: number;
    degree: string;
    institution: string;
    graduationDate: string;
  }
  
  export type Language = {
    id: number;
    language: string;
    proficiency: string;
  }
  
  export type WorkExperience = {
    id: number;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }
  
  export type User = {
    userId: number;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    profession: string;
    driverInfo: DriverInfo;
    education: Education[];
    languages: Language[];
    workExperiences: WorkExperience[];
  }
  
  export type Filters = {
    profession: string;
    experience: string;
    driversLicences: string[];
    jobInterest: string[];
    countriesInterestedWorkingIn: string[];
    categoriesExperiencedWith: string[];
  }
  
  