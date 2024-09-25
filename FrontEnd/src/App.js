import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import SideBar from './components/Sidebar/SideBar';
import PrivateRoute from './seccurity/PrivateRoute';
import ProfileSideBar from './components/Sidebar/ProfileSideBar';
import Profile from './settings/Profile';
import Setting from './settings/Setting';
import Dashboard from './pages/dashboard/Dashboard';
import AddUser from './pages/addUser/AddUser';
import ShowUsers from './pages/showUsers/ShowUsers';
import ShowEquipment from './pages/showEquipment/ShowEquipment';
import AddEquipment from './pages/addEquipment/AddEquipment';
import Deprecation from './pages/deprecation/Deprecation';
import EquipmentProfile from './pages/EquipmentProfile/EquipmentProfile';
import RequestAdmin from './pages/request/RequestAdmin';
import Request from './pages/request/Request';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function App() {
  const [selectedLogo, setSelectedLogo] = useState(() => {
    return localStorage.getItem('selectedLogo') || '91Life';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    localStorage.setItem('selectedLogo', selectedLogo);
  }, [selectedLogo]);

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
            <PrivateRoute>
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
                  <Route path='/profile/settings' element={<Setting />} />
                  <Route path='/profile/:id' element={<Profile />} />
                  <Route path='/request' element={<RequestAdmin />} />
                </Routes>
              </div>
            </div>
            </PrivateRoute>
          }
        />

      <Route path='/request' element={<Request />} /> 
      </Routes>
    </Router>
  );
}

export default App;
