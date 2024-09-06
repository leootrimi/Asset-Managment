import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';
import { BiEdit, BiPlus, BiSearch } from 'react-icons/bi';
import Navbar from '../../components/navbar/Navbar';
import './ShowUsers.css';

function ShowUsers({ selectedLogo }) {

    const navigate = useNavigate();

    const handleRowClick = (employeeId) => {
        navigate(`/admin/profile/${employeeId}`);
    };
    const data = [
        { id: 24005, name: 'John Doe', email: 'john@example.com', age: 28, country: 'USA', position: 'Product Manager', reg: '24/12/2022', departament: 'Matrics' },
        { id: 74205, name: 'Jane Smith', email: 'jane@example.com', age: 34, country: 'Canada', position: 'Product Manager', reg: '24/12/2022', departament: '91Life' },
        { id: 24075, name: 'Sam Green', email: 'sam@example.com', age: 23, country: 'UK', position: 'Product Manager', reg: '24/12/2022', departament: '91Life' },
        { id: 31605, name: 'Emily Brown', email: 'emily@example.com', age: 29, country: 'Australia', position: 'Product Manager', reg: '24/12/2022', departament: 'Matrics' },
        { id: 44005, name: 'John Doe', email: 'john@example.com', age: 28, country: 'USA', position: 'Product Manager', reg: '24/12/2022', departament: 'Matrics' },
        { id: 94005, name: 'Jane Smith', email: 'jane@example.com', age: 34, country: 'Canada', position: 'Product Manager', reg: '24/12/2022', departament: '91Life' },
        { name: 'Sam Green', email: 'sam@example.com', age: 23, country: 'UK', position: 'DevOps', reg: '24/12/2022', departament: '91Life' },
        { name: 'Emily Brown', email: 'emily@example.com', age: 29, country: 'Australia', position: 'Product Manager', reg: '24/12/2022', departament: 'Matrics' },
        { name: 'John Doe', email: 'john@example.com', age: 28, country: 'USA', position: 'Product Manager', reg: '24/12/2022', departament: 'Matrics' },
        { name: 'Jane Smith', email: 'jane@example.com', age: 34, country: 'Canada', position: 'Product Manager', reg: '24/12/2022', departament: '91Life' },
        { name: 'Sam Green', email: 'sam@example.com', age: 23, country: 'UK', position: 'Product Manager', reg: '24/12/2022', departament: '91Life' },
        { name: 'Emily Brown', email: 'emily@example.com', age: 29, country: 'Australia', position: 'Product Manager', reg: '24/12/2022', departament: 'Matrics' },
        { name: 'John Doe', email: 'john@example.com', age: 28, country: 'USA', position: 'Product Manager', reg: '24/12/2022', departament: 'Matrics' },
        { name: 'Jane Smith', email: 'jane@example.com', age: 34, country: 'Canada', position: 'Product Manager', reg: '24/12/2022', departament: '91Life' },
        { name: 'Sam Green', email: 'sam@example.com', age: 23, country: 'UK', position: 'Product Manager', reg: '24/12/2022', departament: '91Life' },
        { name: 'Emily Brown', email: 'emily@example.com', age: 29, country: 'Australia', position: 'Product Manager', reg: '24/12/2022', departament: 'Matrics' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const [searchTerm, setSearchTerm] = useState('');
    const [jobTitleFilter, setJobTitleFilter] = useState('');

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const filteredData = data.filter(item => {
        return (
            (!searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!jobTitleFilter || item.position === jobTitleFilter) &&
            (!selectedLogo || item.departament === selectedLogo)
        );
    });

    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container">
            <Navbar pageTitle="Employers" />
            <div className="d-flex flex-row justify-content-between p-1">
                <div className="h">
                    <h5>User list</h5>
                </div>
                <div className="b p-2">
                    <BiPlus />
                    <a href="/admin/add/user" className='btn1'>Add new</a>
                </div>
            </div>
            <form className="m d-flex flex-row justify-content-between gap-2 mt-2 col-12 p-3 w-100">
                <div className="h col-4">
                    <h6>What you looking for?</h6>
                    <input
                        type="text"
                        className='form-control'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="h col-4">
                    <h6>Job title</h6>
                    <select
                        className='form-control'
                        value={jobTitleFilter}
                        onChange={(e) => setJobTitleFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="DevOps">DevOps</option>
                        <option value="FrontEnd">FrontEnd</option>
                        <option value="BackEnd">BackEnd</option>
                        <option value="Project Manager">Project Manager</option>
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
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Country</th>
                            <th>Position</th>
                            <th>Reg. Date</th>
                            <th>Departament</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.age}</td>
                                <td>{item.country}</td>
                                <td>{item.position}</td>
                                <td>{item.reg}</td>
                                <td>{item.departament}</td>
                                <td className="last">
                                    <a onClick={() => handleRowClick(item.id)} className="edit-link"><BiEdit /></a>
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

export default ShowUsers;