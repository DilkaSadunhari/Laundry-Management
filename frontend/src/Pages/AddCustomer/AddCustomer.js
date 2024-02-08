import React , { useState } from 'react';
import './AddCustomer.css'; 
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik'

//import img from '../../Components/logo.png'

function AddCustomer() {

//----------------------------------------------------------------------------------------------------

const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validatePhoneNumber = () => {
    // Regular expression for a Sri Lankan phone number
    const phoneRegex = /^(\+94|0)\d{9}$/;

    const isValidNumber = phoneRegex.test(phoneNumber);

    setIsValid(isValidNumber);
  };
const validate = (values) => {
  const errors = {};

  // Add your validation logic here
  if (!values.name) {
    errors.name = 'Name is required';
  }

  // if (!values.phoneNum) {
  //   errors.phoneNum = 'Phone number is required';
  // }

  if (!values.address) {
    errors.address = 'Address is required';
  }

  return errors;
};

const formik = useFormik({
  initialValues: {
    name: '',
    //phoneNum: '',
    address: '',
  },
  validate,
  onSubmit: (values) => {
    // Handle form submission logic here
    console.log(values);
  },
});
//-------------------------------------------------------------------------------------------------------------

  return (
    <div className="container">
    <div className="logo-container">
      {/* Your laundry logo component goes here */}
      <img src="../../Components/logo.png" alt="Laundry Logo" className="logo" />
    </div>
    <Form className="custom-form">
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

      
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
        <Form.Label column sm={3}>
          Phone number
        </Form.Label>
        <Col sm={9}>
        <Form.Control
                type="text"
                //name="name"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                //onBlur={formik.handleBlur}
                style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
              />
              {/* {formik.touched.name && formik.errors.name && (
                <Alert variant="danger">{formik.errors.name}</Alert>
              )} */}
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
          <Button type="submit" className="custom-button" onClick={validatePhoneNumber}>ADD</Button>
        </Col>
      </Form.Group>
    </Form>

   
    {isValid && (
        <Alert variant="success" className="mt-3">
          The phone number is valid!
        </Alert>
      )}

      {!isValid && phoneNumber && (
        <Alert variant="danger" className="mt-3">
          The phone number is not valid. Please enter a valid Sri Lankan phone number.
        </Alert>
      )}
    </div>
  );
}

export default AddCustomer;
