import React, { useState } from 'react';
import { BiMailSend, BiLaptop } from 'react-icons/bi';
import laptop from '../../assets/laptop.png';
import desktop from '../../assets/desktop.png';
import headphones from '../../assets/headphones.png';
import mouse from '../../assets/mouse.png';
import keyboard from '../../assets/keyboard.png';
import life from '../../assets/91life.jpg';
import matric from '../../assets/matrics.jpeg';
import {bck} from '../../assets/bck.svg'
import { Modal, Button } from 'react-bootstrap';
import './Request.css';

function Request() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    department: '',
    jobTitle: '',
    contactInfo: '',
    quantity: '',
    urgency: 'regular', 
    justification: '',
    notes: ''
  });

  const handleShow = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
  
    const formValues = {
      employeeName: data.get('employeeName'),
      employeeId: data.get('employeeId'),
      department: data.get('department'),
      contactInfo: data.get('contactInfo'),
      urgency: data.get('urgency'),
      justification: data.get('justification'),
      equipmentType: selectedItem,
    };
  
    setFormData(formValues);
    console.log(formValues);
  };

  

  const handleClose = () => setShowModal(false);

  return (
    <div className="container p-2">
      <div className="row d-flex justify-content-center align-items-center text-center">
          <img src={life} alt="" style={{ height: '120px', width: '140px'}} />
          <img src={matric} alt="" style={{ height: '90px', width: '110px'}} />
         
      </div>
      <div className="row d-flex justify-content-center align-items-center text-center mb-4 p-2" >
        <div className="col-md-12 d-flex flex-column justify-content-center align-items-center p-3">
          <button className='btn11 p-2'>
            <BiMailSend />
            Contact us
          </button>
          <h1 className='mt-3'>Get in touch with us for</h1>
          <h1 className=''>more information</h1>
          <p className='mt-3'>If you need more help or have a question, we're here for you!</p>
        </div>
      </div>

      <div className="row d-flex justify-content-center ">
        <div className="col-md-3">
          <div className="card text-center p-3 shadow" >
            <div className=" p-2 d-flex justify-content-center align-items-center " style={{ height: '130px' }}> 
             <img src={laptop} alt="Icon"  />
            </div>
            <div className="headd mt-2">
              <h5>Laptop</h5>
            </div>
            <div className="details">
              <p>
                Lorsen isum senticem deklaritn sda
              </p>
            </div>
            <div className="butoni">
              <button className='btn12 w-100 p-1' onClick={() => handleShow('Laptop')}>
                  Make request
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow" >
            <div className="p-2 d-flex justify-content-center align-items-center " style={{ height: '130px' }}> 
             <img src={desktop} alt="Icon" />
            </div>
            <div className="headd mt-2">
              <h5>Desktop</h5>
            </div>
            <div className="details">
              <p>
                Lorsen isum senticem deklaritn sda
              </p>
            </div>
            <div className="butoni">
              <button className='btn12 w-100 p-1' onClick={() => handleShow('Desktop')}>
                  Make request
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow" >
            <div className="p-2 d-flex justify-content-center align-items-center " style={{ height: '130px' }}> 
             <img src={headphones} alt="Icon" />
            </div>
            <div className="headd mt-2">
              <h5>Headphones</h5>
            </div>
            <div className="details">
              <p>
                Lorsen isum senticem deklaritn sda
              </p>
            </div>
            <div className="butoni">
              <button className='btn12 w-100 p-1' onClick={() => handleShow('Headphone')}>
                  Make request
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="row d-flex justify-content-center mt-3">
        <div className="col-md-3">
          <div className="card text-center p-3 shadow" >
            <div className=" p-2 d-flex justify-content-center align-items-center " style={{ height: '130px' }}> 
             <img src={keyboard} alt="Icon"  />
            </div>
            <div className="headd mt-2">
              <h5>Keyboard</h5>
            </div>
            <div className="details">
              <p>
                Lorsen isum senticem deklaritn sda
              </p>
            </div>
            <div className="butoni">
              <button className='btn12 w-100 p-1' onClick={() => handleShow('Keyboard')}>
                  Make request
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow" >
            <div className="p-2 d-flex justify-content-center align-items-center " style={{ height: '130px' }}> 
             <img src={mouse} alt="Icon" />
            </div>
            <div className="headd mt-2">
              <h5>Mouse</h5>
            </div>
            <div className="details">
              <p>
                Lorsen isum senticem deklaritn sda
              </p>
            </div>
            <div className="butoni">
              <button className='btn12 w-100 p-1' onClick={() => handleShow('Mouse')}>
                  Make request
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow" >
            <div className="p-2 d-flex justify-content-center align-items-center " style={{ height: '130px' }}> 
             <img src={headphones} alt="Icon" />
            </div>
            <div className="headd mt-2">
              <h5>Headphones</h5>
            </div>
            <div className="details">
              <p>
                Lorsen isum senticem deklaritn sda
              </p>
            </div>
            <div className="butoni">
              <button className='btn12 w-100 p-1'>
                  Make request
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Request {selectedItem}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>You are about to make a request for {selectedItem}. Please fill in the necessary details.</p>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="employeeName">Full Name</label>
        <input type="text" className="form-control" id="employeeName" name="employeeName" placeholder="Enter your full name" required />
      </div>

      <div className="form-group">
        <label htmlFor="employeeId">Employee ID</label>
        <input type="text" className="form-control" id="employeeId" name='employeeId' placeholder="Enter your employee ID" required />
      </div>

      <div className="form-group">
        <label htmlFor="department">Department</label>
        <input type="text" className="form-control" id="department" name='department' placeholder="Enter your department" required />
      </div>

      <div className="form-group">
        <label htmlFor="contactInfo">Contact Information</label>
        <input type="email" className="form-control" id="contactInfo" name='contactInfo' placeholder="Enter your email or phone number" required />
      </div>

      <div className="form-group">
        <label htmlFor="equipmentType">Type of Equipment</label>
        <input type="text" className="form-control" id="equipmentType" value={selectedItem} readOnly />
      </div>


      <div className="form-group">
        <label htmlFor="urgency">Urgency/Priority</label>
        <select className="form-control" id="urgency" name='urgency' required>
          <option value="regular">Regular</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="justification">Justification/Reason</label>
        <textarea className="form-control" id="justification" rows="3" name='justification' placeholder="Explain why the equipment is needed" required></textarea>
      </div>
      <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button type='submit' variant="primary">
      Submit Request
    </Button>
  </Modal.Footer>

    </form>


  </Modal.Body>

</Modal>

    </div>
  );
}

export default Request;
