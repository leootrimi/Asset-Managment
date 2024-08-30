import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import Login from './pages/login/Login';
import SideBar from './components/Sidebar/SideBar';
import ProfileSideBar from './components/Sidebar/ProfileSideBar';
import Profile from './settings/Profile';
//import Dashboard from './pages/dashboard/Dashboard';
import './App.css';
import { useLayoutEffect } from 'react';

function App() {
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
              <Profile />
                <Routes>
                  {
                    //Profile component replace with New Setting Component
                   <Route path='/settings' element={<Profile />} /> 
                  }
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
