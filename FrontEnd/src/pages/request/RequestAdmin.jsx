import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination,Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions, Button } from '@mui/material';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Request.css';


function RequestAdmin() {
  const [selectedOption, setSelectedOption] = useState('Pending');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
  const [justificationText, setJustificationText] = useState('');

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

  const handleClickOpen = (justification) => {
    setJustificationText(justification);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
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
                        <TableCell align="right" onClick={() => handleClickOpen(row.justification)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                          {row.justification.length > 30 ? `${row.justification.substring(0, 30)}...` : row.justification}
                         </TableCell>
                        <TableCell align="right">
                        <FaCheckCircle className='iconsR' onClick={() => approve(row.id)} />
                        <FaTimesCircle className='iconsX' onClick={() => reject(row.id)} />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Justification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {justificationText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
          </Table>

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
