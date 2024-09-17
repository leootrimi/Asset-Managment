import React from 'react';
import { BiNotification, BiLogOut, BiUser } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs'

import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Navbar.css';

function Navbar({pageTitle}) {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; 
      };


  return (
    <div className="d-flex flex-row justify-content-between align-items-center mt-3">
        <div className="">
            Dashboard / <strong style={{ color: '#27374d' }}>{pageTitle}</strong>
        </div>
        <div className="d-flex flex-row align-items-center">
            <BiNotification className="me-3" />
            <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    {localStorage.getItem('username')}
                </Dropdown.Toggle>

                <Dropdown.Menu className="text-center">
                    <Dropdown.Item href="#/action-1"><BiUser /><span></span> Profile</Dropdown.Item>
                    <Dropdown.Item href="#/action-2"><BsGear /> <span></span> Settings</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}><BiLogOut /> <span></span> Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
  );
}

export default Navbar;
