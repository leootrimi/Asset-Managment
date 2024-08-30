import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { BiEdit, BiPlus, BiSearch } from 'react-icons/bi';
import Navbar from '../../components/navbar/Navbar';
import './ShowEquipment.css';

function ShowEquipment() {
    const data = [
        { 
            employeeId: 101, 
            type: 'Laptop', 
            model: 'Dell XPS 13', 
            serialNumber: 'SN-3245001', 
            status: 'In Use', 
            roleOfEmployee: 'Software Engineer', 
            assignedForm: 'Y', 
            purchaseDate: '2023-01-15', 
            price: 1200, 
            supplier: 'Tech World', 
            dateOfReceipt: '2023-01-20', 
            warrantyExpirationDate: '2026-01-15' 
        },
        { 
            employeeId: 102, 
            type: 'Headphones', 
            model: 'MacBook Pro', 
            serialNumber: 'SN-3245002', 
            status: '.', 
            roleOfEmployee: 'Project Manager', 
            assignedForm: 'Y', 
            purchaseDate: '2022-08-22', 
            price: 2000, 
            supplier: 'Apple Store', 
            dateOfReceipt: '2022-08-25', 
            warrantyExpirationDate: '2025-08-22' 
        },
        { 
            employeeId: 103, 
            type: 'Laptop', 
            model: 'HP Spectre x360', 
            serialNumber: 'SN-3245003', 
            status: 'In Use', 
            roleOfEmployee: 'DevOps Engineer', 
            assignedForm: 'N', 
            purchaseDate: '2023-02-10', 
            price: 1500, 
            supplier: 'HP Store', 
            dateOfReceipt: '2023-02-12', 
            warrantyExpirationDate: '2026-02-10' 
        },
        { 
            employeeId: 104, 
            type: 'Laptop', 
            model: 'Lenovo ThinkPad X1', 
            serialNumber: 'SN-3245004', 
            status: 'In Use', 
            roleOfEmployee: 'Data Analyst', 
            assignedForm: 'Y', 
            purchaseDate: '2021-11-12', 
            price: 1300, 
            supplier: 'Lenovo Store', 
            dateOfReceipt: '2021-11-15', 
            warrantyExpirationDate: '2024-11-12' 
        },
        { 
            employeeId: 105, 
            type: 'Laptop', 
            model: 'Asus ZenBook', 
            serialNumber: 'SN-3245005', 
            status: 'In Use', 
            roleOfEmployee: 'UX Designer', 
            assignedForm: 'Y', 
            purchaseDate: '2023-03-25', 
            price: 1100, 
            supplier: 'Asus Store', 
            dateOfReceipt: '2023-03-28', 
            warrantyExpirationDate: '2026-03-25' 
        }
    ];
    
    

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const [employeeIdFilter, setEmployeeIdFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [modelFilter, setModelFilter] = useState('');
    const [serialNumberFilter, setSerialNumberFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [roleOfEmployeeFilter, setRoleOfEmployeeFilter] = useState('');
    const [assignedFormFilter, setAssignedFormFilter] = useState('');
    const [purchaseDateFilter, setPurchaseDateFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [supplierFilter, setSupplierFilter] = useState('');
    const [dateOfReceiptFilter, setDateOfReceiptFilter] = useState('');
    const [warrantyExpirationDateFilter, setWarrantyExpirationDateFilter] = useState('');

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const filteredData = data.filter((item) => {
        return (
            (!employeeIdFilter || item.employeeId.toString().includes(employeeIdFilter)) &&
            (!typeFilter || item.type.includes(typeFilter)) &&
            (!modelFilter || item.model.includes(modelFilter)) &&
            (!serialNumberFilter || item.serialNumber.includes(serialNumberFilter)) &&
            (!statusFilter || item.status.includes(statusFilter)) &&
            (!roleOfEmployeeFilter || item.roleOfEmployee.includes(roleOfEmployeeFilter)) &&
            (!assignedFormFilter || item.assignedForm.includes(assignedFormFilter)) &&
            (!purchaseDateFilter || item.purchaseDate.includes(purchaseDateFilter)) &&
            (!priceFilter || item.price.toString().includes(priceFilter)) &&
            (!supplierFilter || item.supplier.includes(supplierFilter)) &&
            (!dateOfReceiptFilter || item.dateOfReceipt.includes(dateOfReceiptFilter)) &&
            (!warrantyExpirationDateFilter || item.warrantyExpirationDate.includes(warrantyExpirationDateFilter))
        );
    });

    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container">
             <Navbar pageTitle="equipments" />
            <div className="d-flex flex-row justify-content-between p-1">
                <div className="h">
                    <h5>Equipments</h5>
                </div>
                <div className="b p-2">
                    <BiPlus />
                    <a href="/admin/add/user" className='btn1'>Add new</a>
                </div>
            </div>
            <form className="m d-flex flex-row justify-content-between gap-2 mt-2 col-12 p-3 w-100">
                <div className="h col-2">
                    <h6>What you looking for?</h6>
                    <input
                        type="text"
                        className='form-control'
                        value={modelFilter}
                        onChange={(e) => setModelFilter(e.target.value)}
                    />
                </div>
                <div className="h col-2">
                    <h6>Type</h6>
                    <select
                        className='form-control'
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Headphones">Headphones</option>
                        <option value="Mouse">Mouse</option>
                    </select>
                </div>
                <div className="h col-2">
                    <h6>Job title</h6>
                    <select
                        className='form-control'
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="DevOps Engineer">DevOps</option>
                        <option value="FrontEnd">FrontEnd</option>
                        <option value="BackEnd">BackEnd</option>
                        <option value="Project Manager">Project Manager</option>
                    </select>
                </div>
                <div className="h col-2">
                    <h6>Status</h6>
                    <select
                        className='form-control'
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="In Use">In use</option>
                        <option value=".">Not using</option>
                        
                    </select>
                </div>
                <div className="h col-2">
                    <h6>Assigned</h6>
                    <select
                        className='form-control'
                        value={assignedFormFilter}
                        onChange={(e) => setAssignedFormFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                    </select>
                </div>
                <div className="bi p-2 col-2 d-flex justify-content-center mt-2">
                    <button type="button" className='btn1 w-75 mt-2'><BiSearch /></button>
                </div>
            </form>
            <div className="table-container mt-3">
                    <Table hover responsive className="text-center rounded mt-2 modern-table">
                <thead className="thead-dark">
                    <tr className="tr1">
                        <th>Emp. ID</th>
                        <th>Type</th>
                        <th>Model</th>
                        <th>Serial No.</th>
                        <th>Status</th>
                        <th>Role of Employee</th>
                        <th>Assigned Form</th>
                        <th>Purchase Date</th>
                        <th>Price</th>
                        <th>Supplier</th>
                        <th>Date of Receipt</th>
                        <th>Warranty Exp. Date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.employeeId}</td>
                            <td>{item.type}</td>
                            <td>{item.model}</td>
                            <td>{item.serialNumber}</td>
                            <td>{item.status}</td>
                            <td>{item.roleOfEmployee}</td>
                            <td>{item.assignedForm}</td>
                            <td>{item.purchaseDate}</td>
                            <td>{item.price}</td>
                            <td>{item.supplier}</td>
                            <td>{item.dateOfReceipt}</td>
                            <td>{item.warrantyExpirationDate}</td>
                            <td className="last">
                                <a href="#" className="edit-link"><BiEdit /></a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

                <div className="d-flex justify-content-center">
                    <Pagination className='justify-content-between gap-1'>
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {[...Array(totalPages).keys()].map(number => (
                            <Pagination.Item
                                key={number + 1}
                                active={currentPage === number + 1}
                                onClick={() => handlePageChange(number + 1)}
                            >
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
                </div>
            </div>
        </div>
    );
}

export default ShowEquipment;
