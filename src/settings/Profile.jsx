import React from 'react';

const Profile = ({ profileData }) => {
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
