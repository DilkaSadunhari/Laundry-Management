import React from 'react';
import { Link } from 'react-router-dom';
import FilterDropdown from '../../Components/FilterDropdown';
import { Row, Col, Form,Alert } from 'react-bootstrap';
import { useFormik } from 'formik'

import logo from '../../images/logo.png'




function UpdateCategory() {
  //----------------------------------------------------------------------------------------------------
  const validate = (values) => {
    const errors = {};

    // Add your validation logic here
    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.price) {
      errors.price = 'Price is required';
    }

    if (!values.type || values.type === 'Choose...') {
      errors.type = 'Type is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      type: 'Choose...',
    },
    validate,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });
  //-------------------------------------------------------------------------------------------------------------
    const options = ['srilanka', 'srimalee', 'canada', 'Option 4', 'Option 5'];
    return (

      <div style={{marginTop:'20px'}}>
         {/*/----------------------------------Header----------------------------------------------------------------------------------------/*/}
       <div className="row align-items-center  mb-3" style={{marginLeft:'400px'}}>
       <div className="col-md-auto mb-3 mb-md-0 ">
         <img src={logo} alt="Company Logo" style={{ width: '100px' }} />
       </div>
       <div className="col-md ">
         <h2>Dirty 2 Beauty Laundry</h2>
       </div>
     </div>

     <div style={{ textAlign: 'center', padding: '10px' }}>
           

       

            <Form onSubmit={formik.handleSubmit} id="updateCategory" style={{ border: '2px solid #ccc', padding: '50px', borderRadius: '15px',  maxWidth: '800px', margin: 'auto'  }}>
                <h3 style={{ textAlign: 'center' , marginTop: '0px', marginBottom: '60px'}}>Update Category</h3>
                <Form.Group as={Row} style={{ marginBottom: '60px' }} controlId="formHorizontalName">
                    <Form.Label column sm={5}>
                        Category
                    </Form.Label>
                    <Col sm={7}>
                        <FilterDropdown options={options} />
                    </Col>
                </Form.Group>

                <Row style={{ marginBottom: '20px' }}>
        <Form.Group as={Col} controlId="ucatName">
          <Form.Group as={Row} style={{ marginBottom: '30px' }} controlId="formHorizontalucat">
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
        </Form.Group>

        <Form.Group as={Col} controlId="ucatPrice">
  <Form.Group as={Row} style={{ marginBottom: '30px' }} controlId="formHorizontalucat">
    <Form.Label column sm={3}>
      Price
    </Form.Label>
    <Col sm={9}>
      <Form.Control
        type="number"  // Use type="number" for decimal input
        step="0.01"    // Set the step attribute to allow decimal values
        name="price"
        value={formik.values.price || ''}  // Ensure that an empty string is provided if the value is not defined
        onChange={(e) => {
          formik.handleChange(e);
          // Ensure the value is a number and not a string
          formik.setFieldValue('price', parseFloat(e.target.value) || undefined);
        }}
        onBlur={formik.handleBlur}
        style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
      />
      {formik.touched.price && formik.errors.price && (
        <Alert variant="danger">{formik.errors.price}</Alert>
      )}
    </Col>
  </Form.Group>
</Form.Group>


        <Form.Group as={Col} controlId="ucatType">
          <Form.Group as={Row} style={{ marginBottom: '30px' }} controlId="formHorizontalucat">
            <Form.Label column sm={3}>
              Type
            </Form.Label>
            <Col sm={9}>
              <Form.Select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ borderRadius: '0.375rem', backgroundColor: '#d3d3d3' }}
              >
                <option>kilo / piece</option>
                <option>kilo</option>
                <option>piece</option>
              </Form.Select>
              {formik.touched.type && formik.errors.type && (
                <Alert variant="danger">{formik.errors.type}</Alert>
              )}
            </Col>
          </Form.Group>
        </Form.Group>
      </Row>

                <Row style={{ marginBottom: '0px' }}>
                    <Col style={{ textAlign: 'center' }}>

                        <button type="submit" style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', marginLeft: '20px', cursor: 'pointer' }}>Update</button>

                       
                    </Col>
                </Row>
            </Form>
            <div className="position-absolute bottom-0 start-0 mb-3 ms-3">
                  <Link to="/" className="btn btn-secondary" style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', marginLeft: '20px', cursor: 'pointer' }}>Back</Link>
                </div>
        </div>

      </div>
      
      
        
    );
}

export default UpdateCategory;
