import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { BiSave } from 'react-icons/bi';
import { fetchEquipmentBySerial, fetchByID } from '../../services/EquipmentProfile';
import './EquipmentProfile.css';
import { useParams } from 'react-router-dom';

function EquipmentProfile() {
  const [equipment, setEquipment] = useState(null);
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { serial } = useParams();

  useEffect(() => {
    const fetchEquipmentData = async () => {
      setLoading(true);
      try {
        const equipmentData = await fetchEquipmentBySerial(serial);
        setEquipment(equipmentData);
        console.log('Equipment data:', equipmentData);
        console.log(equipmentData.employer);
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

    fetchEquipmentData();
  }, [serial]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!equipment) {
    return <div>No equipment data available</div>;
  }


  return (
    <div className="container p-2">
      <Navbar pageTitle={'Equipment Profile'} />

      <div className="row mt-3">
        <div className="col-lg-4 col-md-6">
          <div className="card p-4 shadow">
            <h5 className="mb-4">General Information</h5>
            <p><strong>Asset ID:</strong> {equipment.serial_no}</p>
            <p><strong>Status:</strong> {equipment.employer ? 'Y' : 'N'}</p>
            <p><strong>Assigned:</strong> {employer ? employer.name + " " + employer.surname : ''}</p>
            <p><strong>Department:</strong> {employer ? employer.department : ''}</p>
            <p><strong>Assigned Date:</strong> {equipment.assignedDate}</p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card bg-light-subtle p-4 shadow">
            <h5 className="mb-4">Specifications</h5>
            <p><strong>Type:</strong> {equipment.equipment_type}</p>
            <p><strong>Model:</strong> {equipment.model}</p>
            <p><strong>Serial Number:</strong> {equipment.serial_no}</p>
            <p><strong>Purchase Date:</strong> {equipment.purchase_date}</p>
            <p><strong>Warranty Expiration:</strong> {equipment.warranty_expiration_date}</p>
          </div>
        </div>

        <div className="col-lg-4 col-md-12">
          <div className="card bg-light-subtle p-4 shadow">
            <h5 className="mb-4">Depreciation Values</h5>
            <p><strong>Price Bought:</strong> ${equipment.price}</p>
            <p><strong>Depreciation Value per Year:</strong> ${equipment.depreciation}</p>
            <p><strong>Years Used:</strong> {equipment.yearsUsed} years</p>
            <p><strong>Current Value:</strong> ${equipment.currentPrice}</p>
            <p><strong>Remaining Time:</strong> {equipment.remainingTime} years</p>
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
              <div className="col-lg-8 col-md-12">
              <TableContainer component={Paper} elevation={3} className="p-4 shadow">
      <Table aria-label="employer information table">
        <TableBody>
          <TableRow>
            <TableCell><strong>Id:</strong> </TableCell>
            <TableCell><strong>Name:</strong></TableCell>
            <TableCell><strong>From:</strong> </TableCell>
            <TableCell><strong>To:</strong></TableCell>

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
                    <a href="/admin/add/user" className='btn1 ml-1'>Save</a>
                </div>
          </div>
    </div>
  );
}

export default EquipmentProfile;
