import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  // Initialize state from localStorage
  const [selectedLogo, setSelectedLogo] = useState(() => {
    return localStorage.getItem('selectedLogo') || '91Life';
  });

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

  const handleProfileUpdate = (data) => {
    setProfileData(data);
  };

  return (
    <Router>
      <Routes>
      <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/admin/dashboard" /> : <Login onLogin={handleLogin} />}
            />
        <Route
          path="/admin/*"
          element={
            <div className='main-layout'>
              <SideBar selectedLogo={selectedLogo} setSelectedLogo={setSelectedLogo} />
              <div className='content'>
                <Routes>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/add/user' element={<AddUser />} />
                  <Route path='/show/user' element={<ShowUsers selectedLogo={selectedLogo} />} />
                  <Route path='/show/equipment' element={<ShowEquipment selectedLogo={selectedLogo} />} />
                  <Route path='/add/equipment' element={<AddEquipment />} />
                  <Route path='/equipment/:serial' element={<EquipmentProfile />} />
                  <Route path='/deprecation' element={<Deprecation />} />
                  <Route path='/profile/settings' element={<Setting onUpdate={handleProfileUpdate} />} />
                  <Route path='/profile/:id' element={<Profile profileData={profileData} />} />
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
