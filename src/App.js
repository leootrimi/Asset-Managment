import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import Login from './pages/login/Login';
import SideBar from './components/Sidebar/SideBar';
import ProfileSideBar from './components/Sidebar/ProfileSideBar';
import Profile from './settings/Profile';
import Setting from './settings/Setting';
//import Dashboard from './pages/dashboard/Dashboard';
import './App.css';
import { useLayoutEffect } from 'react';

function App() {

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

  const handleProfileUpdate = (data) => {
    setProfileData(data);
  };
  return (
    <Router>
      
          <Routes>
            <Route path="/" element={<Login />} /> 
            <Route
              path="/admin/*"
              element={
                <div className='main-layout'>
                  <SideBar />
                  <div className='content'>
                    <Routes>
                      {/* <Route path='/dashboard' element={<Dashboard />} /> */}
                    </Routes>
                  </div>
                </div>
              }
              />


            <Route path="/profile/*"
            element={
              <div className='main-layout'>
              <ProfileSideBar />
              <div className='content'>
        <Routes>
          <Route path='/settings' element={<Setting onUpdate={handleProfileUpdate} />} />
          <Route path='/' element={<Profile profileData={profileData} />} />
        </Routes>
      </div>
            </div>
            }
            />



          </Routes>
    </Router>
  );
}

export default App;
