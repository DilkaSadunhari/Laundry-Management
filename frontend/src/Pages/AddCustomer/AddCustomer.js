import React , { useState } from 'react';
import './AddCustomer.css'; 
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik'
import companyLogo from '../../images/logo.png'

//import img from '../../Components/logo.png'

function AddCustomer() {

//----------------------------------------------------------------------------------------------------

const [phoneNumber, setPhoneNumber] = useState('');
const [phoneNumberError, setPhoneNumberError] = useState('');

const handlePhoneNumberChange = (e) => {
  const value = e.target.value;
  setPhoneNumber(value);

  // Regular expression for a valid phone number (adjust as needed)
  const phoneRegex = /^[0-9]{10}$/;

  if (!value) {
    setPhoneNumberError('Phone number is required.');
  } else if (!phoneRegex.test(value)) {
    setPhoneNumberError('Please enter a valid 10-digit phone number.');
  } else {
    setPhoneNumberError('');
  }
};
const validate = (values) => {
  const errors = {};

  // Add your validation logic here
  if (!values.name) {
    errors.name = 'Name is required';
  }

  

  if (!values.address) {
    errors.address = 'Address is required';
  }

  return errors;
};

const formik = useFormik({
  initialValues: {
    name: '',
    
    address: '',
  },
  validate,
  onSubmit: (values) => {
    // Handle form submission logic here
    console.log(values);
    window.location.reload();
  },
});
//-------------------------------------------------------------------------------------------------------------

  return (
    <div className="container"style={{marginTop:'30px'}}>

  {/**------------------------------------------header--------------------------------------------------------- */}
   <div className="row align-items-center mb-3"style={{marginLeft:'400px'}}>
        <div className="col-sm-auto">
          <img src={companyLogo} alt="Company Logo" style={{ width: '100px' }} />
        </div>
        <div className="col-sm">
          <h2>Dirty 2 Beaty Laundry</h2>
        </div>
      </div>
  {/**--------------------------------------------------------------------------------------------------------- */}
    <Form className="custom-form" onSubmit={formik.handleSubmit}>
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
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
        />
        {phoneNumberError && (
          <Alert variant="danger">{phoneNumberError}</Alert>
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
          <Button type="submit" className="custom-button" style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', marginLeft: '20px', cursor: 'pointer' }} >ADD</Button>
        </Col>
      </Form.Group>
    </Form>

   
   
    </div>
  );
}

export default AddCustomer;