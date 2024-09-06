import React from 'react'
import { BiLaptop, BiReset } from 'react-icons/bi'
import Laptop from '../../components/equipments/Laptop'
import Navbar from '../../components/navbar/Navbar'

function AddEquipment() {
  return (
    <div className="container">
        <Navbar pageTitle="Add Equipment"/>
        
        {/* Fieldset with Legend */}
        <fieldset className="m border rounded p-3 mt-3">
            <legend className=" px-2">Equipment Information</legend>
            
            <form className="d-flex flex-row justify-content-between gap-2 col-12">
                <div className="left-column d-flex flex-column col-6">
                    <div className="d-flex flex-row justify-content-between gap-21col-12">
                    <div className="form-group mb-2 col-7 w-50">
                        <label htmlFor="employeeId">Employer ID :</label>
                        <input type="text" className="form-control" id="employeeId" />
                    </div>
                    <div className="form-group mb-2 col-5 ml-2 w-50">
                        <label htmlFor="role">Role of employee</label>
                        <input type="text" className="form-control" id="role" />
                    </div>
                    </div> 

                    <div className="form-group mb-2">
                        <label htmlFor="purchaseDate">Purchase date</label>
                        <input type="date" className="form-control" id="purchaseDate" />
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="dateOfReceipt">Date of Receipt</label>
                        <input type="date" className="form-control" id="dateOfReceipt" />
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="warrantyExpirationDate">Warranty Expiration Date</label>
                        <input type="date" className="form-control" id="warrantyExpirationDate" />
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="supplier">Supplier</label>
                        <input type="text" className="form-control" id="supplier" />
                    </div>
                </div>

                <div className="right-column d-flex flex-column col-6">
                    <div className="form-group d-flex flex-row justify-content-between col-12">
                        <div className="col-6">
                            <label htmlFor="type">Type:</label>
                            <select name="type" id="type" className="form-control">
                                <option value=""></option>
                                <option value="Laptop">Laptop</option>
                                <option value="Desktop">Desktop</option>
                                <option value="Mouse">Mouse</option>
                                <option value="TV">TV</option>
                                <option value="Printer">Printer</option>
                                <option value="Headphones">Headphones</option>
                            </select>
                        </div>
                        <div className="form-group mb-2 col-6">
                            <label htmlFor="model">Model :</label>
                            <input type="text" className="form-control" id="model" />
                        </div>
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="serialNo">Serial No.</label>
                        <input type="text" className="form-control" id="serialNo" />
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="status">Status</label>
                        <input type="text" className="form-control" id="status" />
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="assignedForm">Assigned form</label>
                        <select className="form-control" id="assignedForm">
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                        </select>
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="price">Price</label>
                        <input type="number" className="form-control" id="price" />
                    </div>

                </div>
            </form>
        </fieldset>

        

        <div className="d-flex justify-content-end gap-2">
            <div className="d">
        <button type="submit" className="btn1 p-2 mt-3"><BiReset />Reset</button>
        </div>
        <div className="d">
        <button type="submit" className="btn1 p-2 mt-3">Submit</button>
        </div>
        </div>
    </div>
  )
}

export default AddEquipment
