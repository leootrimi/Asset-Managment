import React, { useState, useEffect } from 'react';
import { BiReset } from 'react-icons/bi';
import { fetchModel, fetchModelCount } from '../../services/AddEquipment';
import Navbar from '../../components/navbar/Navbar';

function AddEquipment() {
  const [employers, setEmployers] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState('');
  const count = '0000';
  const [models, setModels] = useState([]); 
  const [formData, setFormData] = useState({
    type: '',
    model: '',
    serialNo: '',
    tag: '',
    assignedForm: 'N',
    price: '',
    role: '',
    purchaseDate: '',
    dateOfReceipt: '',
    warrantyExpirationDate: '',
    supplier: '',
  });

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/employers/getname/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEmployers(data);
      } catch (error) {
        console.error('Error fetching employer data:', error.message);
      }
    };
    fetchEmployers();
  }, []);


  const fetchModelsByType = async (type) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/model/get/${type}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setModels(data); 
    } catch (error) {
      console.error('Error fetching models:', error.message);
    }
  };

  useEffect(() => {
    if (formData.type) {
      fetchModelsByType(formData.type);
    }

  }, [formData.type]);

  const handleEmployerChange = (e) => {
    setSelectedEmployer(e.target.value);
  };

  const handleChange = async (e) => {
    const { id, value } = e.target;
  
    if (id === 'type') {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
        model: '', 
        tag: '',  
      }));
      fetchModelsByType(value);
    } else if (id === 'model') {
      const selectedModel = models.find((model) => model.model === value);
      
      const modelCount = await fetchModelCount(value);
      console.log(modelCount);
      
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
        tag: selectedModel ? selectedModel.prefix + (count + modelCount) : '',  
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      employer: parseInt(selectedEmployer, 10),
      role: formData.role || '',
      purchase_date: formData.purchaseDate || '', 
      date_of_receipt: formData.dateOfReceipt || '',
      warranty_expiration_date: formData.warrantyExpirationDate || '',
      supplier: formData.supplier || '',
      equipment_type: formData.type || '',
      model: formData.model || '',
      serial_no: formData.serialNo || '', 
      tag: formData.tag || '',
      assigned_form: formData.assignedForm || 'N',
      price: parseFloat(formData.price) || 0,
      departament: formData.departament || '',
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/equipment/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert('Equipment added successfully!');
      setFormData({
        type: '',
        model: '',
        serialNo: '',
        tag: '',
        assignedForm: 'N',
        price: '',
        role: '',
        purchaseDate: '',
        dateOfReceipt: '',
        warrantyExpirationDate: '',
        supplier: '',
      });
      setSelectedEmployer('');
    } catch (error) {
      console.error('Error submitting data:', error.message);
      alert('Error submitting equipment data.');
    }
  };

  return (
    <div className="container">
      <Navbar pageTitle="Add Equipment" />

      <fieldset className="m border rounded p-3 mt-3">
        <legend className="px-2">Equipment Information</legend>

        <form className="d-flex flex-row justify-content-between gap-2 col-12" onSubmit={handleSubmit}>
          <div className="left-column d-flex flex-column col-6">
            <div className="d-flex flex-row justify-content-between  col-12">
              <div className="form-group mb-2 col-7 w-50">
                <label htmlFor="employeeId">Employer:</label>
                <select
                  className="form-control"
                  id="employeeId"
                  value={selectedEmployer}
                  onChange={handleEmployerChange}
                >
                  <option value="">Select Employer</option>
                  {employers.map((employer) => (
                    <option key={employer.id} value={employer.id}>
                      {employer.name} {employer.surname}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-2 col-5 ml-2 w-50">
                <label htmlFor="role">Role of employee</label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group mb-2">
              <label htmlFor="purchaseDate">Purchase date</label>
              <input
                type="date"
                className="form-control"
                id="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="dateOfReceipt">Date of Receipt</label>
              <input
                type="date"
                className="form-control"
                id="dateOfReceipt"
                value={formData.dateOfReceipt}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="warrantyExpirationDate">Warranty Expiration Date</label>
              <input
                type="date"
                className="form-control"
                id="warrantyExpirationDate"
                value={formData.warrantyExpirationDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="supplier">Supplier</label>
              <input
                type="text"
                className="form-control"
                id="supplier"
                value={formData.supplier}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="right-column d-flex flex-column col-6">
            <div className="form-group d-flex flex-row justify-content-between col-12">
              <div className="col-6">
                <label htmlFor="type">Type:</label>
                <select
                  name="type"
                  id="type"
                  className="form-control"
                  value={formData.type}
                  onChange={handleChange}
                >
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
                  <select
                    className="form-control"
                    id="model"
                    value={formData.model}
                    onChange={handleChange}
                  >
                    <option value="">Select Model</option>
                    {models.map((model) => (
                      <option key={model.id} value={model.model}>
                        {model.model}
                      </option>
                    ))}
                  </select>
                </div>
            </div>

            <div className="form-group mb-2">
              <label htmlFor="serialNo">Serial No.</label>
              <input
                type="text"
                className="form-control"
                id="serialNo"
                value={formData.serialNo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="tag">Tag</label>
              <input
                type="text"
                className="form-control"
                id="tag"
                value={formData.tag}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="assignedForm">Assigned form</label>
              <select
                className="form-control"
                id="assignedForm"
                value={formData.assignedForm}
                onChange={handleChange}
              >
                <option value="N">No</option>
                <option value="Y">Yes</option>
              </select>
            </div>

            <div className="form-group mb-2">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="departament">Departament</label>
              <select
                className="form-control"
                id="departament"
                value={formData.assignedForm}
                onChange={handleChange}
              >
                <option value="91Life">91Life</option>
                <option value="Matrics">Matrics</option>
              </select>
            </div>
          </div>
        </form>
      </fieldset>

      <div className="d-flex justify-content-end mt-3 gap-2">
        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button className="btn btn-danger" type="reset">
          <BiReset className="mr-1" />
          Reset
        </button>
      </div>
    </div>
  );
}

export default AddEquipment;
