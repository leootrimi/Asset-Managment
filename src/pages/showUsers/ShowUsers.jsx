import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Pagination, Form } from 'react-bootstrap';
import { BiEdit, BiPlus } from 'react-icons/bi';
import Navbar from '../../components/navbar/Navbar';
import './ShowUsers.css';

function ShowUsers({ selectedLogo }) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [filters, setFilters] = useState({
        name: '',
        position: '',
        country: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/employers/get/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('Fetched Data:', result);
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleRowClick = (employeeId) => {
        navigate(`/admin/profile/${employeeId}`);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Filter data based on selectedLogo and filter inputs
    const filteredData = data
        .filter(item => item.department === selectedLogo)
        .filter(item => item.name.toLowerCase().includes(filters.name.toLowerCase()))
        .filter(item => item.position.toLowerCase().includes(filters.position.toLowerCase()))
        .filter(item => item.country.toLowerCase().includes(filters.country.toLowerCase()));

    // Slice the data for pagination
    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <div className="container">
             <Navbar pageTitle="employers" />
            <div className="d-flex flex-row justify-content-between p-1">
                <div className="h">
                    <h5>User list</h5>
                </div>
                <div className="b p-2">
                    <BiPlus />
                    <a href="/admin/add/user" className='btn1'>Add new</a>
                </div>
            </div>
            <div className="filter-container mt-3">
                <Form className="m d-flex flex-row justify-content-between gap-2 mt-2 col-12 p-3 w-100">
                    <div className="h col-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                            placeholder="Filter by name"
                        />
                    </div>
                    <div className="h col-4">
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                            type="text"
                            name="position"
                            value={filters.position}
                            onChange={handleFilterChange}
                            placeholder="Filter by position"
                        />
                    </div>
                    <div className="h col-4">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={filters.country}
                            onChange={handleFilterChange}
                            placeholder="Filter by country"
                        />
                    </div>
                </Form>
            </div>
            <div className="table-container mt-3">
                <Table hover responsive className="text-center rounded mt-2 modern-table">
                    <thead className="thead-dark">
                        <tr className="tr1">
                            <th>Id</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Personal No.</th>
                            <th>Birthday</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Position</th>
                            <th>Reg. Date</th>
                            <th>Department</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.length > 0 ? (
                            currentData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.personal_no}</td>
                                    <td>{item.birthday}</td>
                                    <td>{item.email}</td>
                                    <td>{item.country}</td>
                                    <td>{item.position}</td>
                                    <td>{item.reg_date}</td>
                                    <td>{item.department}</td>
                                    <td className="last">
                                        <a onClick={() => handleRowClick(item.id)} className="edit-link"><BiEdit /></a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11">No data available</td>
                            </tr>
                        )}
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
