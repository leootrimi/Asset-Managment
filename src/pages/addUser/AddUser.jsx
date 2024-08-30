import React, { useState } from 'react';
import { BiInfoCircle, BiUser, BiPlus, BiUndo } from 'react-icons/bi';
import './addUser.css';
import { color } from 'chart.js/helpers';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AddUser = () => {
    return (
        <div className="container p-3">
            <div className="d-flex flex-row justify-content-between col-12 mt-4">
                <div className="first" >
                    <h3>Add new User</h3>
                </div>
                <div className="d-flex gap-2">
                <div className="save-btn d-flex flex-row align-items-center p-1">
                        <BiUndo />
                    <button className='btn'>Undo</button>
                    </div>
                    <div className="save-btn d-flex flex-row align-items-center p-1">
                        <BiPlus />
                    <button className='btn'>Save</button>
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
                            <input type="text" name="name" id="name" placeholder='John' className="form-control" />
                            <label htmlFor="personalNo"  className="mt-0">Personal No.</label> <br />
                            <input type="text" name="personalNo" placeholder='24050024563' id="personalNo" className="form-control" />
                        </div>
                        <div className="t col-6">
                            <label htmlFor="surname">Surname :</label> <br />
                            <input type="text" name="surname" placeholder='Doe' id="surname" className="form-control" />
                            <label htmlFor="birthday" className="">Birthday</label> <br />
                            <input type="date" name="birthday" id="birthday" className="form-control" />
                        </div>
                    </div>
                    <div className="d row mb-2 mt-4">Contact Information</div>
                    <div className="t d-flex flex-row gap-3">
                        <div className="t col-6">
                            <label htmlFor="">Phone number :</label>
                            <input type="text" name="" id="" className="form-control" /> 
                            <label htmlFor="">Adress :</label>
                            <input type="text" name="" id="" className="form-control" />
                            <label htmlFor="">Postal Code :</label>
                            <input type="text" name="" id="" className="form-control col-4" />
                        </div>
                        <div className="t col-6">
                            <label htmlFor="">Phone number :</label>
                            <input type="text" name="" id="" className="form-control " />
                            <label htmlFor="">Adress :</label>
                            <input type="text" name="" id="" className="form-control" />
                            <label htmlFor="">Country :</label>
                            <input type="text" name="" id="" className="form-control" />
                        </div>
                    </div>
                </form>
            </div>

                <div className="uploads col-4 d-flex flex-column p-3 gap-5">
                    <div className="title">Documents</div>
                    <div className="t d-flex flex-column align-items-center border p-2 rounded bg-light">
                        <BiInfoCircle className='icons' />
                        <p><strong>Click here</strong> to choose a file you would like to upload!
                        Supported extensions (JPG, PNG, PDF) </p>
                    </div>
                    <div className="t d-flex flex-column p-2">
                        <div className="title ">
                           <h6>Profile picture</h6>
                           <p>max 2MB</p>
                           <div className="upload d-flex flex-row align-items-center justify-content-between">
                           <BiUser />
                            <input type="file" name="" id="" />
                           </div>
                        </div>
                    </div>

                </div>
           </div>
        </div>
        
    );
};

export default AddUser;
