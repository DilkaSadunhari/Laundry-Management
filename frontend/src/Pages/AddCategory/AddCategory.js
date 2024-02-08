import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './AddCategory.css';  
//import img from '../../Components/logo.png'

function AddCategary() {
  return (
    <div className="container">
    <div className="logo-container">
      {/* Your laundry logo component goes here */}
      <img src="../../Components/logo.png" alt="Laundry Logo" className="logo" />
    </div>
    <Form className="custom-form">
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Category Name" className="custom-input" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPNum">
        <Form.Label column sm={2}>
          Price 
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Category price" className="custom-input" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalType">
        <Form.Label column sm={2}>
          Type
        </Form.Label>
        <Col sm={10}>
      <Form.Select aria-label="Default select example">
      <option>kilo / piece</option>
      <option value="1">kilo</option>
      <option value="2">piece</option>
     
    </Form.Select>
    </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 8, offset: 4 }}>
          <Button type="submit" className="custom-button">ADD</Button>
        </Col>
      </Form.Group>
    </Form>
    </div>
  );
}

export default AddCategary;
