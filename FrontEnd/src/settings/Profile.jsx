import React, { useEffect, useState } from 'react';
import './Profile.css'; // Import the CSS file
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    personal_no: '',
    surname: '',
    birthday: '',
    position: '',
    department: '',
    reg_date: '',
    phone_number_1: '',
    address_1: '',
    postal_code_1: '',
    phone_number_2: '',
    address_2: '',
    country: '',
    valuableCount: 1,
    valuableNames: [''],
    deprecationValues: [''],
  });

  const { id } = useParams(); // Extract the id from URL parameters

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/employers/${id}`); // Use the id in the API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [id]); // Add id to the dependency array

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <div className="profile-card-container">
        <div className="profile-card">
          <div className="profile-card-body">
            <h4>COMPANY INFO</h4>
            <p><strong>Name:</strong> {profileData.name}</p>
            <p><strong>Surname:</strong> {profileData.surname}</p>
            <p><strong>Personal Number:</strong> {profileData.personal_no}</p>
            <p><strong>Birthday:</strong> {profileData.birthday}</p>
            <p><strong>Position:</strong> {profileData.position}</p>
            <p><strong>Department:</strong> {profileData.department}</p>
            <p><strong>Registration Date:</strong> {profileData.reg_date}</p>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-body">
            <h4>CONTACT INFO</h4>
            <p><strong>Phone Number 1:</strong> {profileData.phone_number_1}</p>
            <p><strong>Address 1:</strong> {profileData.address_1}</p>
            <p><strong>Postal Code 1:</strong> {profileData.postal_code_1}</p>
            {profileData.phone_number_2 && (
              <p><strong>Phone Number 2:</strong> {profileData.phone_number_2}</p>
            )}
            {profileData.address_2 && (
              <p><strong>Address 2:</strong> {profileData.address_2}</p>
            )}
            {profileData.country && (
              <p><strong>Country:</strong> {profileData.country}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
