import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import Login from './pages/login/Login';
import SideBar from './components/Sidebar/SideBar';
import Dashboard from './pages/dashboard/Dashboard';
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
                      <Route path='/dashboard' element={<Dashboard />} />
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
