import React from 'react';
import life from '../../assets/91life.jpg'
import './UserPdfTemplate.css';

const UserPdfTemplate = ({ userData, equipmentData }) => {
    return (
        <div className="pdf-template">
          <div className="img1">
            <img src={life} className='w-100 h-100' alt="" srcset="" />
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="d">
              <h1 className="pdf-name">{userData.name + " " + userData.surname}</h1>
              <p><strong>Position:</strong> {userData.position}</p>
              <p><strong>Department:</strong> {userData.department}</p>
            </div>
            <div className="d">
              <h1 className="pdf-name">{userData.name + " " + userData.surname}</h1>
              <p><strong>Position:</strong> {userData.position}</p>
              <p><strong>Department:</strong> {userData.department}</p>
            </div>
            </div>
            
            <h2 className="pdf-equipment-title">Equipment:</h2>
            <table className="equipment-table">
                <thead>
                    <tr className="table-header">
                        <th><strong>Tag</strong></th>
                        <th><strong>Type</strong></th>
                        <th><strong>Model</strong></th>
                        <th><strong>Purchased Date</strong></th>
                        <th><strong>Warranty</strong></th>
                        <th><strong>Price</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {equipmentData.length > 0 ? (
                        equipmentData.map(item => (
                            <tr key={item.serial_no}>
                                <td>{item.tag}</td>
                                <td>{item.equipment_type || 'N/A'}</td>
                                <td>{item.model || 'N/A'}</td>
                                <td>{item.purchase_date || 'N/A'}</td>
                                <td>{item.warranty_expiration_date || 'N/A'}</td>
                                <td>{item.price || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="no-data">No equipment data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            <div className="signature-section">
                <div className="row">
                    <div className="col text-center">
                        <p className="signature-name">Mjellma Zhuri</p>
                        <hr className="signature-line" />
                        <p>Signature</p>
                    </div>
                    <div className="col text-center">
                        <p className="signature-name">{userData.name + " " + userData.surname}</p>
                        <hr className="signature-line" />
                        <p>Signature</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPdfTemplate;
