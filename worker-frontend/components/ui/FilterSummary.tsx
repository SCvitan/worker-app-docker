// FilterSummary.tsx
import React from 'react';
import { useAppSelector } from '@/store/hooks';

const FilterSummary: React.FC = () => {
  const driverLicenses = useAppSelector((state) => state.filter.driverLicenses);
  const placeOfWork = useAppSelector((state) => state.filter.placeOfWork);
  const drivingExperience = useAppSelector((state) => state.filter.drivingExperience);
  const yearsOfExperienceStart = useAppSelector((state) => state.filter.yearsOfExperience.start);
  const yearsOfExperienceEnd = useAppSelector((state) => state.filter.yearsOfExperience.end);
  const expectedSalaryStart = useAppSelector((state) => state.filter.expectedSalary.start);
  const expectedSalaryEnd = useAppSelector((state) => state.filter.expectedSalary.end);

  return (
    <div className="border p-4 mt-4">
      <h2>Selected Filters:</h2>
      <h3>Driver Licenses:</h3>
      <ul>
        {driverLicenses.map((license: string) => (  // Explicitly typing `license` as string
          <li key={license}>{license}</li>
        ))}
      </ul>

      <h3>Place of Work:</h3>
      <ul>
        {placeOfWork.map((place: string) => (  // Explicitly typing `place` as string
          <li key={place}>{place}</li>
        ))}
      </ul>

      <h3>Driving Experience:</h3>
      <ul>
        {drivingExperience.map((experience: string) => (  // Explicitly typing `experience` as string
          <li key={experience}>{experience}</li>
        ))}
      </ul>

      <h3>Years of Experience:</h3>
      <p>{yearsOfExperienceStart} to {yearsOfExperienceEnd}</p>

      <h3>Expected NET Salary in €:</h3>
      <p>{expectedSalaryStart} to {expectedSalaryEnd}</p>
    </div>
  );
};

export default FilterSummary;
