import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import {fetchEquipmentBySerial} from '../../services/EquipmentProfile'
import './EquipmentProfile.css';
import { useParams } from 'react-router-dom'; 

function EquipmentProfile() {
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const { serial } = useParams(); 

  useEffect(() => {
    const fetchEquipmentData = async () => {
      setLoading(true);
      try {
        const data = await fetchEquipmentBySerial(serial); 
        setEquipment(data);
        console.log(data);
      } catch (err) {
        setError('Error fetching equipment data');
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
            <p><strong>Status:</strong> {equipment.status}</p>
            <p><strong>Assigned:</strong> {equipment.assignedEmployeeName || 'Unassigned'}</p>
            <p><strong>Department:</strong> {equipment.department}</p>
            <p><strong>Assigned Date:</strong> {equipment.assignedDate}</p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card bg-light-subtle p-4 shadow">
            <h5 className="mb-4">Specifications</h5>
            <p><strong>Type:</strong> {equipment.equipment_type}</p>
            <p><strong>Model:</strong> {equipment.model}</p>
            <p><strong>Serial Number:</strong> {equipment.serial}</p>
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
    </div>
  );
}

export default EquipmentProfile;
