import React, { useEffect, useState , useRef} from 'react';
import './Profile.css'; // Import the CSS file
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import boy from '../assets/boy.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import UserPdfTemplate from '../components/PDF/UserPdfTemplate';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Profile = () => {
  const navigate = useNavigate();
  const printRef = useRef();
  const [profileData, setProfileData] = useState({
    name: '',
    personal_no: '',
    surname: '',
    birthday: '',
    position: '',
    department: '',
    reg_date: '',
    phone_number_1: '',
    address_1: '',
    postal_code_1: '',
    phone_number_2: '',
    address_2: '',
    country: '',
    valuableCount: 1,
    valuableNames: [''],
    deprecationValues: [''],
  });
  const [equipmentData, setEquipmentData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/employers/${id}`); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchEquipmentData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/equipment/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEquipmentData(data);
        console.log(equipmentData);
      } catch (error) {
        console.error('Error fetching equipment data:', error);
      }
    };

    fetchProfileData();
    fetchEquipmentData(); 
  }, [id]);

  useEffect(() => {
    console.log('Updated Equipment Data:', equipmentData); // Log after equipmentData updates
  }, [equipmentData]);

  const generatePDF = () => {
    // Use html2canvas to capture the component
    html2canvas(printRef.current, {
        scale: 2, // Increase scale for better quality
        useCORS: true // Enable cross-origin image support if you have images
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4'); // Create a new PDF document

        const imgWidth = pdf.internal.pageSize.getWidth() - 20; // Adjust width with margins
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate image height
        let heightLeft = imgHeight;

        let position = 0;

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight); // Adjust positioning
        heightLeft -= pageHeight; // Decrease height left to track remaining space

        // Loop to add additional pages if needed
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight; // Set the position for the next page
            pdf.addPage(); // Add a new page
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight); // Add the image again
            heightLeft -= pageHeight; // Update height left
        }

        pdf.save(`${profileData.name}_profile.pdf`); // Save the PDF
    });
};



  return (
    <div className="container p-4">
      <h2 className="text-center mb-4"><img src={boy} className='foto' alt="" /></h2>
      <Row>
        <Col md={4} className="mb-4">
          <div className="card shadow">
            <div className="card-header">
              <h5>Employee Info</h5>
            </div>
            <div className="card-body">
              <p><strong>Name:</strong> {profileData.name + " " + profileData.surname}</p>
              <p><strong>Personal Number:</strong> {profileData.personal_no}</p>
              <p><strong>Position:</strong> {profileData.position}</p>
              <p><strong>Department:</strong> {profileData.department}</p>
              <p><strong>Registration Date:</strong> {profileData.reg_date}</p>
            </div>
          </div>
        </Col>

        <Col md={4} className="mb-4">
          <div className="card shadow">
            <div className="card-header">
              <h5>Contact Info</h5>
            </div>
            <div className="card-body">
              <p><strong>Phone Number 1:</strong> {profileData.phone_number_1}</p>
              <p><strong>Address 1:</strong> {profileData.address_1}</p>
              <p><strong>Postal Code 1:</strong> {profileData.postal_code_1}</p>
              {profileData.phone_number_2 && (
                <p><strong>Phone Number 2:</strong> {profileData.phone_number_2}</p>
              )}
              {profileData.address_2 && (
                <p><strong>Address 2:</strong> {profileData.address_2}</p>
              )}
              {profileData.country && (
                <p><strong>Country:</strong> {profileData.country}</p>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mb-4">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Tag</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>Model</strong></TableCell>
                  <TableCell><strong>Purchased Date</strong></TableCell>
                  <TableCell><strong>Warranty</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(equipmentData)}
                {equipmentData.length > 0 ? (
                  equipmentData.map((item, index) => (
                    <TableRow key={index}
                    onClick={() => navigate(`/admin/equipment/${item.serial_no}`)} className="table-row">
                      <TableCell>{item.tag}</TableCell>
                      <TableCell>{item.equipment_type || 'N/A'}</TableCell>
                      <TableCell>{item.model || 'N/A'}</TableCell>
                      <TableCell>{item.purchase_date || 'N/A'}</TableCell>
                      <TableCell>{item.warranty_expiration_date || 'N/A'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No equipment data available</TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </TableContainer>
        </Col>
      </Row>
      <div className="row text-center">
      <div ref={printRef} className='d-none'>
        <UserPdfTemplate userData={profileData} equipmentData={equipmentData} />
      </div>
      <div className='p-1'>
      <button className='btn1' onClick={generatePDF}>Download PDF</button>
      </div>
      </div>
    </div>
  );
};

export default Profile;
