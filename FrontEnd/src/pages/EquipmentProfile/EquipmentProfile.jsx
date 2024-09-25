import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { BiSave } from 'react-icons/bi';
import {calculateDepreciation} from '../../services/deprecation.js'
import { fetchEquipmentBySerial, fetchByID } from '../../services/EquipmentProfile';
import './EquipmentProfile.css';
import { useParams } from 'react-router-dom';

function EquipmentProfile() {
  const [equipment, setEquipment] = useState(null);
  const [employer, setEmployer] = useState(null);
  const [employers, setEmployers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserList, setShowUserList] = useState(false);

  const { serial } = useParams();

  useEffect(() => {
    const fetchEquipmentData = async () => {
      setLoading(true);
      try {
        const equipmentData = await fetchEquipmentBySerial(serial);
        setEquipment(equipmentData);
        console.log('Equipment data:', equipmentData);
        if (equipmentData.employer) {
          const employerData = await fetchByID(equipmentData.employer);
          setEmployer(employerData);
          console.log('Employer data:', employerData);
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    const fetchEmployers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/employers/getname/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEmployers(data);
        console.log(employers);
      } catch (error) {
        console.error('Error fetching employer data:', error.message);
      }
    };
    fetchEquipmentData();
    fetchEmployers();
  }, [serial]);

  const handleAssignedClick = () => {
    setShowUserList(!showUserList);
  };

    const updateAssignment = async () => {
    if (!selectedUser) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/equipment/update/${serial}/`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employer: selectedUser,
          assigned_form: 'Y'
        }),
      });

      if (response.ok) {
        const updatedEquipment = await response.json();
        console.log('Assignment updated:', updatedEquipment);
        setShowUserList(false); 
      } else {
        console.error('Failed to update assignment');
      }
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  const handleUserSelect = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    console.log(userId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container p-2">
      <Navbar pageTitle={'Equipment Profile'} />

      <div className="row mt-3">
        <div className="col-lg-4 col-md-6">
          <div className="card p-4 shadow">
            <h5 className="mb-4">General Information</h5>
            {equipment ? (
              <>
                <p><strong>Asset ID:</strong> {equipment.tag}</p>
                <p><strong>Status:</strong> {equipment.assigned_form}</p>
                <p>
                  <strong>Assigned:</strong>{' '}
                  {showUserList ? (
                    <select onChange={handleUserSelect} value={selectedUser || ''}>
                      <option value="">Select User</option>
                      {employers.map((employers) => (
                        <option key={employers.id} value={employers.id}>
                          {employers.name} {employers.surname}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span onClick={handleAssignedClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                      {employer ? employer.name + ' ' + employer.surname : 'Assign'}
                    </span>
                  )}
                </p>
                <p><strong>Department:</strong> {employer ? employer.department : ''}</p>
                <p><strong>Assigned Date:</strong> {equipment.assignedDate}</p>
              </>
            ) : (
              <p>No equipment found.</p>
            )}
          </div>
        </div>

        {/* Other sections */}
        <div className="col-lg-4 col-md-6">
          <div className="card bg-light-subtle p-4 shadow">
            <h5 className="mb-4">Specifications</h5>
            {equipment ? (
              <>
                <p><strong>Type:</strong> {equipment.equipment_type}</p>
                <p><strong>Model:</strong> {equipment.model}</p>
                <p><strong>Serial Number:</strong> {equipment.serial_no}</p>
                <p><strong>Purchase Date:</strong> {equipment.purchase_date}</p>
                <p><strong>Warranty Expiration:</strong> {equipment.warranty_expiration_date}</p>
              </>
            ) : (
              <p>No specifications available.</p>
            )}
          </div>
        </div>

        {/* Depreciation Values */}
        <div className="col-lg-4 col-md-12">
          <div className="card bg-light-subtle p-4 shadow">
            <h5 className="mb-4">Depreciation Values</h5>
            {equipment ? (
              <>
                <p><strong>Price Bought:</strong> ${equipment.price}</p>
                <p><strong>Depreciation Value per Year:</strong> ${equipment.depreciation}</p>
                <p><strong>Years Used:</strong> {equipment.yearsUsed} years</p>
                <p><strong>Current Value:</strong> ${equipment.currentPrice}</p>
                <p><strong>Remaining Time:</strong> {equipment.remainingTime} years</p>
              </>
            ) : (
              <p>No depreciation data available.</p>
            )}
          </div>
        </div>
      </div>

      {employer && (
        <div className="row mt-3">
          <div className="col-lg-4 col-md-12">
            <div className="card p-4 shadow">
              <h5 className="mb-4">Employer Information</h5>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Name:</strong> {employer.name + " " + employer.surname}</p>
                  <p><strong>Position:</strong> {employer.position}</p>
                  <p><strong>Department:</strong> {employer.department}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Personal No:</strong> {employer.personal_no}</p>
                  <p><strong>Registerd Date:</strong> {employer.reg_date}</p>
                  <p><strong>Phone No:</strong> {employer.phone_number_1}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Optional Table */}
          <div className="col-lg-8 col-md-12">
            <TableContainer component={Paper} elevation={3} className="p-4 shadow">
              <Table aria-label="employer information table">
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Id:</strong> </TableCell>
                    <TableCell><strong>Name:</strong></TableCell>
                    <TableCell><strong>From:</strong> </TableCell>
                    <TableCell><strong>To:</strong> </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{employer.name + " " + employer.surname}</TableCell>
                    <TableCell>{employer.position}</TableCell>
                    <TableCell>{employer.department}</TableCell>
                    <TableCell>{employer.personal_no}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}

      <div className="row col-12 justify-content-end">
        <div className="b p-2 col-1 align">
          <BiSave />
          <button className='btn1' onClick={updateAssignment}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EquipmentProfile;
