import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { items } from '../../data'; 
import './EquipmentProfile.css';
import { useParams } from 'react-router-dom'; 

function EquipmentProfile() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [equipment, setEquipment] = useState(null);

  const { serial } = useParams(); 
  
  useEffect(() => {
    const fetchEmployees = async () => {
      const employeeData = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        { id: '3', name: 'Emily Johnson' }
      ];
      setEmployees(employeeData);
    };

    fetchEmployees();

  
    const fetchEquipmentData = async () => {
      const selectedItem = items.find(item => item.serial === serial);
      setEquipment(selectedItem); 
      if (selectedItem) {
        setSelectedEmployee(selectedItem.employeeId); 
      }
    };

    fetchEquipmentData();
  }, [serial]);

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  if (!equipment) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container p-2">
      <Navbar pageTitle={'Equipment Profile'} />

      <div className="row mt-3">
        <div className="col-lg-4 col-md-6">
          <div className="card p-4 shadow">
            <h5 className="mb-4">General Information</h5>
            <p><strong>Asset ID:</strong> {equipment.serial}</p>
            <p><strong>Status:</strong> {equipment.status}</p>
            <p className="d-flex align-items-center">
              <strong>Assigned:</strong>
              <select
                className="form-control ms-2"
                value={selectedEmployee}
                onChange={handleEmployeeChange}
              >
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </p>
            <p><strong>Department:</strong> {equipment.department}</p>
            <p><strong>Assigned Date:</strong> {equipment.assignedDate}</p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card bg-light-subtle p-4 shadow">
            <h5 className="mb-4">Specifications</h5>
            <p><strong>Type:</strong> {equipment.type}</p>
            <p><strong>Model:</strong> {equipment.model}</p>
            <p><strong>Serial Number:</strong> {equipment.serial}</p>
            <p><strong>Purchase Date:</strong> {equipment.purchaseDate}</p>
            <p><strong>Warranty Expiration:</strong> {equipment.warrantyExpiration}</p>
          </div>
        </div>

        <div className="col-lg-4 col-md-12">
          <div className="card bg-light-subtle p-4 shadow">
            <h5 className="mb-4">Depreciation Values</h5>
            <p><strong>Price Bought:</strong> ${equipment.price}</p>
            <p><strong>Depreciation Value per Year:</strong> ${equipment.depreciation}</p>
            <p><strong>Years Used:</strong> 2 years</p>
            <p><strong>Current Value:</strong> ${equipment.currentPrice}</p>
            <p><strong>Remaining Time:</strong> {equipment.remainingTime} years</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EquipmentProfile;
