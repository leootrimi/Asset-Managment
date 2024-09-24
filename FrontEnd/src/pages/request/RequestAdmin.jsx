import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Request.css';

// Simulated JSON data
const jsonData = [
  { id: 1, name: 'John Doe', department: '91Life', role: 'Software Engineer', request: 'Laptop', urgency: 'Urgent', reason:'IDK ADSD' },
  { id: 2, name: 'Jane Smith', department: '91Life', role: 'Project Manager', request: 'Headphone', urgency: 'Normal', reason:'IDK ADSD' },
  { id: 3, name: 'Bob Johnson', department: 'Matrics', role: 'Designer', request: 'Laptop', urgency: 'Urgent', reason:'IDK ADSD' },
  { id: 4, name: 'Alice Brown', department: '91Life', role: 'Developer' , request: 'Desktop', urgency: 'Urgent', reason:'IDK ADSD'},
  { id: 5, name: 'Charlie Williams', department: 'Matrics', role: 'QA Engineer' , request: 'Keyboard', urgency: 'Normal', reason:'IDK ADSD'},
  { id: 6, name: 'Chris Evans', department: '91Life', role: 'Team Lead', request: 'Mouse', urgency: 'Urgent', reason:'IDK ADSD' },
  { id: 7, name: 'Robert Downey', department: 'Matrics', role: 'Senior Developer' , request: 'Laptop', urgency: 'Normal', urgency: 'Urgent', reason:'IDK ADSD'},
  { id: 8, name: 'Scarlett Johansson', department: '91Life', role: 'Product Manager', request: 'Laptop', urgency: 'Normal', reason:'IDK ADSD'},
];

function RequestAdmin() {
  const [selectedOption, setSelectedOption] = useState('Pending');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/req/get/${selectedOption}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRows(data);
            console.log(rows);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [selectedOption]);

const approve = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/req/approve/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Approved' }),
        });

        if (!response.ok) {
            throw new Error('Failed to approve request');
        }
    } catch (error) {
        console.error(error);
    }
};

const reject = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/req/reject/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Rejected' }),
        });

        if (!response.ok) {
            throw new Error('Failed to reject request');
        }
    } catch (error) {
        console.error(error);
    }
};


  const handleBreadcrumbClick = (option) => {
    setSelectedOption(option);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className='container'>
      <Navbar pageTitle="Requests" />
      <div className="row justify-content-center align-items-center text-center gap-3 breadcrumbs">
        <div className="col-md-1">
          <div
            className={`breadcrumb-item ${selectedOption === 'Pending' ? 'active' : ''}`}
            onClick={() => handleBreadcrumbClick('Pending')}
          >
            <span className="circle yellow"></span>Pending
          </div>
        </div>
        <div className="col-md-1">
          <div
            className={`breadcrumb-item ${selectedOption === 'Approved' ? 'active' : ''}`}
            onClick={() => handleBreadcrumbClick('Approved')}
          >
            <span className="circle green"></span>Approved
          </div>
        </div>
        <div className="col-md-1">
          <div
            className={`breadcrumb-item ${selectedOption === 'Rejected' ? 'active' : ''}`}
            onClick={() => handleBreadcrumbClick('Rejected')}
          >
            <span className="circle red"></span>Rejected
          </div>
        </div>
      </div>

      <div className="row justify-content-center align-items-center text-center p-3">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                 <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Department</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Equipment</TableCell>
                <TableCell align="right">Urgency</TableCell>
                <TableCell align="right">Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
                .map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.full_name}
                    </TableCell>
                    <TableCell align="right">{row.department}</TableCell>
                    <TableCell align="right">{row.role}</TableCell>
                    <TableCell align="right">{row.equipment_type}</TableCell>
                    <TableCell align="right">{row.urgency}</TableCell>
                    <TableCell align="right">{row.justification}</TableCell>
                    <TableCell align="right">
                        <FaCheckCircle className='iconsR' onClick={() => approve(row.id)} />
                        <FaTimesCircle className='iconsX' onClick={() => reject(row.id)}  />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* Pagination Component */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </div>
  );
}

export default RequestAdmin;
