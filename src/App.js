import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import SideBar from './components/Sidebar/SideBar';
import Dashboard from './pages/dashboard/Dashboard';
import AddUser from './pages/addUser/AddUser';
import ShowUsers from './pages/showUsers/ShowUsers';
import ShowEquipment from './pages/showEquipment/ShowEquipment';
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
          </Routes>
    </Router>
  );
}

export default App;
