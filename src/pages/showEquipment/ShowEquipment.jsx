import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';
import { BiEdit, BiPlus, BiSearch } from 'react-icons/bi';
import Navbar from '../../components/navbar/Navbar';
import {fetchEquipmentData} from '../../services/ShowEquipment'
import './ShowEquipment.css';

function ShowEquipment({ selectedLogo }) {
    const navigate = useNavigate();
    const [equipmentData, setEquipmentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    useEffect(() => {
        const loadEquipmentData = async () => {
            try {
                const data = await fetchEquipmentData(); 
                setEquipmentData(data);
            } catch (error) {
                console.error('Error fetching equipment data:', error.message);
            }
        };
        loadEquipmentData();
    }, []);

    const handleRowClick = (serialNumber) => {
        navigate(`/admin/equipment/${serialNumber}`);
    };

    // const filteredDataByLogo = equipmentData.filter((item) => item.logo === selectedLogo);

    const filteredData = equipmentData.filter((item) => {
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

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <Navbar pageTitle="Equipments" />
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
                        value={roleOfEmployeeFilter}
                        onChange={(e) => setRoleOfEmployeeFilter(e.target.value)}
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
                        <option value="Not using">Not using</option>
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
                            <th>Tag</th>
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
                                <td>{item.employer}</td>
                                <td>{item.equipment_type}</td>
                                <td>{item.model}</td>
                                <td>{item.serial_no}</td>
                                <td>{item.tag}</td>
                                <td>{item.role}</td>
                                <td>{item.assigned_form}</td>
                                <td>{item.purchase_date}</td>
                                <td>{item.price}</td>
                                <td>{item.supplier}</td>
                                <td>{item.date_of_receipt}</td>
                                <td>{item.warranty_expiration_date}</td>
                                <td className="last">
                                    <a onClick={() => handleRowClick(item.serial_no)} className="edit-link"><BiEdit /></a>
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
