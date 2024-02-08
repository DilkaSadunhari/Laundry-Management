import React ,  { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './AddCategory.css'; 
import { useFormik } from 'formik'; 
import companyLogo from '../../images/logo.png'
//import img from '../../Components/logo.png'

function AddCategary() {

//--------------------------------------------------------------------------------------------------------
const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.price) {
    errors.price = 'Price is required';
  } else if (isNaN(values.price)) {
    errors.price = 'Price must be a number';
  }

  if (!values.type) {
    errors.type = 'Type is required';
  }

  return errors;
};

const formik = useFormik({
  initialValues: {
    name: '',
    price: '',
    type: '',
  },
  validate,
  onSubmit: (values) => {
    // Handle form submission here
    console.log(values);
    window.location.reload();
  },
});
//----------------------------------------------------------------------------------------------------------

  return (
    <div className="container" style={{marginTop:'30px'}}>
    {/*/----------------------------------Header----------------------------------------------------------------------------------------/*/}
    <div className="row align-items-center mb-3"style={{marginLeft:'400px'}}>
        <div className="col-sm-auto">
          <img src={companyLogo} alt="Company Logo" style={{ width: '100px' }} />
        </div>
        <div className="col-sm">
          <h2>Dirty 2 Beaty Laundry</h2>
        </div>
      </div>
    <Form className="custom-form" onSubmit={formik.handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
           
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error-message red-text">{formik.errors.name}</div>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPNum">
        <Form.Label column sm={2}>
          Price
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Category price"
            className="custom-input"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
          />
          {formik.touched.price && formik.errors.price && (
            <div className="error-message red-text">{formik.errors.price}</div>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalType">
        <Form.Label column sm={2}>
          Type
        </Form.Label>
        <Col sm={10}>
          <Form.Select
            aria-label="Default select example"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
          >
            <option>kilo / piece</option>
            <option value="1">kilo</option>
            <option value="2">piece</option>
          </Form.Select>
          {formik.touched.type && formik.errors.type && (
            <div className="error-message red-text">{formik.errors.type}</div>
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 8, offset: 4 }}>
          <Button type="submit" className="custom-button"style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', marginLeft: '20px', cursor: 'pointer' }}>
            ADD
          </Button>
        </Col>
      </Form.Group>
    </Form>
    </div>
  );
}

export default AddCategary;
