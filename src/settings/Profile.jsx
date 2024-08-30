import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    surname: '',
    email: '',
    jobTitle: '',
    department: '',
    valuableCount: 1,
    valuableNames: [''],
    deprecationValues: [''],
  });

  useEffect(() => {
    // Fetch data from localStorage
    const savedProfileData = localStorage.getItem('profileData');
    if (savedProfileData) {
      setProfileData(JSON.parse(savedProfileData));
    }
  }, []); // Run only once when component mounts

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {profileData.name}</p>
      <p><strong>Surname:</strong> {profileData.surname}</p>
      <p><strong>Email:</strong> {profileData.email}</p>
      <p><strong>Job Title:</strong> {profileData.jobTitle}</p>
      <p><strong>Department:</strong> {profileData.department}</p>
      <p><strong>Valuable Count:</strong> {profileData.valuableCount}</p>
      {profileData.valuableNames.map((name, index) => (
        <div key={index}>
          <p><strong>Valuable {index + 1} Name:</strong> {name}</p>
          <p><strong>Deprecation Value {index + 1} (€):</strong> {profileData.deprecationValues[index]}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;