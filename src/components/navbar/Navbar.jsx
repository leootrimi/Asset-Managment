import React from 'react';
import { BiNotification } from 'react-icons/bi';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
// import './Navbar.css';

function Navbar({pageTitle}) {
  return (
    <div className="d-flex flex-row justify-content-between align-items-center mt-3">
        <div className="">
            Dashboard / <strong>{pageTitle}</strong>
        </div>
        <div className="d-flex flex-row align-items-center">
            <BiNotification className="me-3" />
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    John Doe
                </Dropdown.Toggle>

                <Dropdown.Menu className="">
                    <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
  );
}

export default Navbar;
