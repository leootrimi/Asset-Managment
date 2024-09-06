import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import SideBar from './components/Sidebar/SideBar';
import ProfileSideBar from './components/Sidebar/ProfileSideBar';
import Profile from './settings/Profile';
import Setting from './settings/Setting';
import Dashboard from './pages/dashboard/Dashboard';
import AddUser from './pages/addUser/AddUser';
import ShowUsers from './pages/showUsers/ShowUsers';
import ShowEquipment from './pages/showEquipment/ShowEquipment';
import './App.css';
import React, { useState } from 'react';
import { useLayoutEffect } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  //logout logic unimplemented
  /*
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  */

  const handleProfileUpdate = (data) => {
    setProfileData(data);
  };

  return (
    <Router>
      
          <Routes>
            {/* <Route path="/" element={<Login />} />  */}
            
            <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/admin/dashboard" /> : <Login onLogin={handleLogin} />}
            />

            <Route
              path="/admin/*"
              element={
                <div className='main-layout'>
                  <SideBar />
                  <div className='content '>
                    <Routes>
                      <Route path='/dashboard' element={<Dashboard />} />
                      <Route path='/add/user' element={<AddUser />} />
                      <Route path='/show/user' element={<ShowUsers />} />
                      <Route path='/show/equipment' element={<ShowEquipment />} />
                    </Routes>
                  </div>
                </div>
              }
              />

          {/* PROFILE PATH */}
          <Route 
          path="/profile/*"
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
