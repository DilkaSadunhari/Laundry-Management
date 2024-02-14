
import React, { useState,useEffect } from 'react';
import { Row, Col, Form, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom'; 
import companyLogo from '../../images/logo.png'; 
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCustomer() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [mobileNumbers, setMobileNumbers] = useState([]);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    const phoneRegex = /^[0-9]{10}$/;

    if (!value) {
      setPhoneNumberError('Phone number is required.');
    } else if (!phoneRegex.test(value)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number.');
    } else {
      setPhoneNumberError('');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = 'Name is required';
      }

      if (!phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
      } else if (phoneNumberError) {
        errors.phoneNumber = phoneNumberError;
      }

      if (!values.address) {
        errors.address = 'Address is required';
      }

      return errors;
    },
    // onSubmit: (values) => {
    //   console.log(values);
    //   window.location.reload();
    // },
  });

  //-----------------------------Backend connection-----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nameValue = formik.values.name;
      const addressValue = formik.values.address;
      if (mobileNumbers.includes(phoneNumber)) {
        toast.error('Mobile Number Exist');
      } else { 
  
      const response = await axios.post('http://localhost:8000/customer/add', {
        name: nameValue,
        address: addressValue,
        mobile: phoneNumber,
      });
      if (response.status === 200) {
        toast.success('Customer added successfully');
        getNumbers();
        formik.resetForm();
        setPhoneNumber('');
         
      } else {
        toast.error('Failed');
      }
    }
    } catch (error) {
      toast.error('Error');
    }
  };

  const getNumbers = async () => {
    const response = await axios.get('http://localhost:8000/customer/getAllMobileNumbers');
    if (response.status === 200) {
      let numbers = [];
      response.data.forEach(element => {
        numbers.push(element.mobile);
      });
      setMobileNumbers([...numbers]);
    }
  }

  useEffect(() => {
    getNumbers();
  },[])
 

  return (

    <div className="container align-items-center " style={{marginTop:'20px'}}>
      {/*/----------------------------------Header----------------------------------------------------------------------------------------/*/}
      <div className="row align-items-center  mb-3" style={{marginLeft:'350px'}}>
        <div className="col-md-auto mb-3 mb-md-0 ">
          <img src={companyLogo} alt="Company Logo" style={{ width: '100px' }} />
        </div>
        <div className="col-md ">
          <h2 style={{fontStyle: 'italic', fontWeight: 800}}>Dirty 2 Beauty Laundry</h2>
        </div>
      </div>
      <Form className="custom-form" onSubmit={handleSubmit}>
        <h3 className='text-center mb-3' style={{fontStyle: 'italic',marginBottom:'60px'}}>Add Customer</h3>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Form.Label column sm={3}>
            Name
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
            />
            {formik.touched.name && formik.errors.name && (
              <Alert variant="danger">{formik.errors.name}</Alert>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhoneNumber">
          <Form.Label column sm={3}>
            Phone number
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
            />
            {formik.errors.phoneNumber && (
              <Alert variant="danger">{formik.errors.phoneNumber}</Alert>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalAddress">
          <Form.Label column sm={3}>
            Address
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
            />
            {formik.touched.address && formik.errors.address && (
              <Alert variant="danger">{formik.errors.address}</Alert>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 8, offset: 4 }}>
            <button
              //onClick={onSubmit}
              type="submit"
              className="custom-button"
              style={{
                background: 'black',
                color: 'white',
                border: 'none',
                padding: '10px',
                paddingInline: '30px',
                borderRadius: '25px',
                marginTop: '10px',
                marginLeft: '20px',
                cursor: 'pointer',
              }}
            >
              ADD
            </button>
          </Col>
        </Form.Group>
      </Form>
      <ToastContainer />
        <div className="position-absolute bottom-0 start-0 mb-3 ms-3">
            <Link to="/" className="btn btn-secondary" style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', marginLeft: '20px', cursor: 'pointer' }}>Back</Link>
        </div>

    </div>
  );
}

export default AddCustomer;