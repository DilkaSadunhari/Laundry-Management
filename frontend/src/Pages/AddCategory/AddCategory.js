import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './AddCategory.css'; 
import { useFormik } from 'formik'; 

import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  // onSubmit: (values) => {
  //   // Handle form submission here
  //   console.log(values);
  //   window.location.reload();
  // },
});

//-----------------------------------Backend connection-----------------------------------------------------------------------
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const nameValue = formik.values.name;
    const priceValue = formik.values.price;
    const typeValue = formik.values.type;

    const response = await axios.post('http://localhost:8000/category/add', {
      name: nameValue,
      price_per_unit: priceValue,
      type: typeValue,
    });
     if (response.status === 200) {
      toast.success('Category added successfully');
      formik.resetForm();
      
    } else {
      toast.error('Failed');
    }
  } catch (error) {
    toast.error('Error');
  }
};

  return (

    <div className="container" style={{marginTop:'20px'}}>
    {/*/----------------------------------Header----------------------------------------------------------------------------------------/*/}
    <div className="row align-items-center  mb-3" style={{marginLeft:'400px'}}>
       <div className="col-md-auto mb-3 mb-md-0 ">
         <img src={logo} alt="Company Logo" style={{ width: '100px' }} />
       </div>
       <div className="col-md ">
         <h2>Dirty 2 Beauty Laundry</h2>
       </div>
     </div>

    <Form className="custom-form" onSubmit={handleSubmit}>
    <h4 className='text-center mb-3'>Add Category</h4>
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
            onChange={(e) => {
              formik.handleChange(e);
              let selectedValue;
              if (e.target.value === 'kilo') {
                selectedValue = 0;
              } else if (e.target.value === 'piece') {
                selectedValue = 1;
              } else {
                selectedValue = e.target.value;
              }
              formik.setFieldValue('type', selectedValue);
            }}
            onBlur={formik.handleBlur}
            style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
          >
            <option>kilo / piece</option>
            <option value="0">kilo</option>
            <option value="1">piece</option>
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
    <ToastContainer />
    <div className="position-absolute bottom-0 start-0 mb-3 ms-3">
                  <Link to="/" className="btn btn-secondary" style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', marginLeft: '20px', cursor: 'pointer' }}>Back</Link>
                </div>
    </div>
  );
}

export default AddCategary;
