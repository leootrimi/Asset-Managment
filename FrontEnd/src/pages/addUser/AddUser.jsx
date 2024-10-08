// AddUser.js
import React, { useState } from 'react';
import { BiPlus, BiUndo } from 'react-icons/bi';
import './addUser.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { handleSubmit } from '../../services/AddUser';

const AddUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        personal_no: '',
        surname: '',
        birthday: '',
        phone_number_1: '',
        address_1: '',
        postal_code_1: '',
        address_2: '',
        country: '',
        position: '',   
        department: '',
    });

    const handleChange = (e, setFormData) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="container p-3">
            <div className="d-flex flex-row justify-content-between col-12 mt-4">
                <div className="first">
                    <h3>Add new User</h3>
                </div>
                <div className="d-flex gap-2">
                    <div className="save-btn d-flex flex-row align-items-center p-1">
                        <BiUndo />
                        <button className='btn'>Undo</button>
                    </div>
                    <div className="save-btn d-flex flex-row align-items-center p-1">
                        <BiPlus />
                        <button className='btn' onClick={(e) => handleSubmit(e, formData)}>Save</button>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-between gap-4 p-2">
                <div className="col-8 p-4">
                    <form className="d-flex flex-column justify-content-between gap-2 w-100">
                        <div className="d row mb-2">Personal Information</div>
                        <div className="t d-flex flex-row gap-3 col-12">
                            <div className="h col-6">
                                <label htmlFor="name">Name :</label> <br />
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    placeholder='John' 
                                    className="form-control" 
                                    onChange={(e) => handleChange(e, setFormData)} 
                                />
                                <label htmlFor="personal_no" className="mt-0">Personal No.</label> <br />
                                <input 
                                    type="text" 
                                    name="personal_no" 
                                    placeholder='24050024563' 
                                    id="personal_no" 
                                    className="form-control" 
                                    onChange={(e) => handleChange(e, setFormData)} 
                                />
                                <label htmlFor="position">Position :</label>
                                <select 
                                    name="position" 
                                    id="position" 
                                    className='form-control' 
                                    onChange={(e) => handleChange(e, setFormData)} 
                                    value={formData.position}
                                >
                                    <option value="">Select Position</option>
                                    <option value="DevOps">DevOps</option>
                                    <option value="Developer">Developer</option>
                                </select>
                            </div>
                            <div className="t col-6">
                                <label htmlFor="surname">Surname :</label> <br />
                                <input 
                                    type="text" 
                                    name="surname" 
                                    placeholder='Doe' 
                                    id="surname" 
                                    className="form-control" 
                                    onChange={(e) => handleChange(e, setFormData)} 
                                />
                                <label htmlFor="birthday" className="">Birthday</label> <br />
                                <input 
                                    type="date" 
                                    name="birthday" 
                                    id="birthday" 
                                    className="form-control" 
                                    onChange={(e) => handleChange(e, setFormData)} 
                                />
                                <label htmlFor="department">Department :</label>
                                <select 
                                    name="department" 
                                    id="department" 
                                    className='form-control' 
                                    onChange={(e) => handleChange(e, setFormData)} 
                                    value={formData.department}
                                >
                                    <option value="">Select Department</option>
                                    <option value="91Life">91Life</option>
                                    <option value="Matrics">Matrics</option>
                                </select>
                            </div>
                        </div>
                        <div className="d row mb-2 mt-4">Contact Information</div>
                        <div className="t d-flex flex-row gap-3">
                            <div className="t col-6">
                                <label htmlFor="phone_number_1">Phone number :</label>
                                <input 
                                    type="text" 
                                    name="phone_number_1" 
                                    id="phone_number_1" 
                                    className="form-control" 
                                    onChange={(e) => handleChange(e, setFormData)} 
                                />
                                <label htmlFor="address_1">Address :</label>
                                <input 
                                    type="text" 
                                    name="address_1" 
                                    id="address_1" 
                                    className="form-control" 
                                    onChange={(e) => handleChange(e, setFormData)} 
                                />
                                <label htmlFor="postal_code_1">Postal Code :</label>
                                <input 
                                    type="text" 
                                    name="postal_code_1" 
                                    id="postal_code_1" 
                                    className="form-control col-4" 
                                    onChange={(e) => handleChange(e, setFormData)} 
                                />
                            </div>
                            <div className="t col-6">
                                <label htmlFor="address_2">Address :</label>
                                <input 
                                    type="text" 
                                    name="address_2" 
                                    id="address_2" 
                                    className="form-control" 
                                    onChange={(e) => handleChange(e, setFormData)} 
                                />
                                <label htmlFor="country">Country :</label>
                                <input 
                                    type="text" 
                                    name="country" 
                                    id="country" 
                                    className="form-control" 
                                    onChange={(e) => handleChange(e, setFormData)} 
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
