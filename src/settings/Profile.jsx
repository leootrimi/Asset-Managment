import React from 'react';

const Profile = () => {
  return (
    <div >
      <h1>User Profile</h1>
      <section className="profile-details">
        <h2>Personal Details</h2>
        <p><strong>Full Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Position:</strong> Software Engineer</p>
        <p><strong>Department:</strong> Engineering</p>
      </section>
      
      <section className="valuables">
        <h2>Valuables</h2>
        <div className="valuable-item">
          <h3>Valuable 1</h3>
          <p><strong>Deprecation Value:</strong> $500</p>
        </div>
        <div className="valuable-item">
          <h3>Valuable 2</h3>
          <p><strong>Deprecation Value:</strong> $300</p>
        </div>
      </section>
    </div>
  );
};

export default Profile;
