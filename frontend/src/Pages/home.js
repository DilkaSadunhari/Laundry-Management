import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Dropdown, FormControl, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerHome = ({
  selectedCustomerInvoice,
  setSelectedCustomerInvoice,
  customerDetailsInvoice,
  setCustomerDetailsInvoice,
}) => {
  const [customerDataHome, setCustomerDataHome] = useState([]);
  const [selectedCustomerHome, setSelectedCustomerHome] = useState(null);
  const [customerDetailsHome, setCustomerDetailsHome] = useState(null);
  const [filterTextHome, setFilterTextHome] = useState('');
  const [filteredOptionsHome, setFilteredOptionsHome] = useState([]);
  const [updateSuccessHome, setUpdateSuccessHome] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/customer/getAllMobileNumbers') // Replace with your actual API endpoint
      .then(response => {
        console.log(response);
        return response.data;
      })
      .then(data => setCustomerDataHome(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const formikHome = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      address: '',
    },
    onSubmit: values => {
      // Handle form submission logic here
      console.log('Form submitted with values:', values);
      // You can trigger the update function here
      handleUpdateHome(values);
    },
  });

  const handleSelectHome = (eventKey, event) => {
    const selected = customerDataHome.find(customer => customer.mobile === eventKey);
    setSelectedCustomerHome(selected);

    if (selected) {
      axios.get(`http://localhost:8000/customer/get/${selected.id}`)  // Replace with your actual customer details endpoint
        .then(response => {
          setCustomerDetailsHome(response.data);
          // Set the initial form values when a customer is selected
          formikHome.setValues({
            name: response.data.name,
            phoneNumber: response.data.mobile,
            address: response.data.address,
          });
          console.log('Selected Customer Data:', response.data);
        })
        .catch(error => console.error('Error fetching customer details:', error));
    }
  };

  const handleFilterChangeHome = (e) => {
    setFilterTextHome(e.target.value);
    const options = customerDataHome.filter(customer => customer.mobile.includes(e.target.value));
    setFilteredOptionsHome(options);
  };

  const handleOptionSelectHome = (number) => {
    setSelectedCustomerHome(number);
    setFilterTextHome('');

    if (number) {
      axios.get(`http://localhost:8000/customer/get/${number.id}`)  // Replace with your actual customer details endpoint
        .then(response => setCustomerDetailsHome(response.data))
        .catch(error => console.error('Error fetching customer details:', error));
    }
  };

  const handleUpdateHome = (values) => {
    if (selectedCustomerHome) {
      const { name, address, phoneNumber } = values;
      // Make sure phoneNumber is not null before updating

      if (phoneNumber) {
        axios.put(`http://localhost:8000/customer/update/${selectedCustomerHome.id}`, { name, address, mobile: phoneNumber })
          .then(response => {
            console.log(response.data);
            setUpdateSuccessHome(true);
            // Optionally, update the displayed details after a successful update
            setCustomerDetailsHome({ ...selectedCustomerHome, ...values });
            toast.success('Customer updated successfully!');
          })
          .catch(error => {
            console.error('Error updating customer:', error);
            toast.error('Failed to update customer. Please try again.');
          });
      } else {
        console.error('Phone number cannot be null');
        toast.error('Phone number cannot be null');
      }
    }
  };

  return (
    <div>
      <Form className="custom-form" onSubmit={formikHome.handleSubmit}>
        <Form.Group as={Row} style={{ marginBottom: '60px' }} controlId="formHorizontalName">
          <Form.Label column sm={5}>
            Phone Number:
          </Form.Label>
          <Col sm={7}>
            <div>
              <Dropdown onSelect={handleSelectHome}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedCustomerHome ? selectedCustomerHome.mobile : 'Select Mobile Number'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter"
                    onChange={handleFilterChangeHome}
                    value={filterTextHome}
                  />
                  {filteredOptionsHome.map((customer, index) => (
                    <Dropdown.Item key={index} eventKey={customer.mobile} onClick={() => handleOptionSelectHome(customer)}>
                      {customer.mobile}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Form.Group>

        {/* Rest of the form fields */}
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Form.Label column sm={3}>
            Name:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="name"
              value={formikHome.values.name}
              onChange={formikHome.handleChange}
              onBlur={formikHome.handleBlur}
              style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
            />
            {formikHome.touched.name && formikHome.errors.name && (
              <Alert variant="danger">{formikHome.errors.name}</Alert>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhoneNumber">
          <Form.Label column sm={3}>
            Phone number:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formikHome.values.phoneNumber}
              onChange={formikHome.handleChange}
              onBlur={formikHome.handleBlur}
              style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
            />
            {formikHome.touched.phoneNumber && formikHome.errors.phoneNumber && (
              <Alert variant="danger">{formikHome.errors.phoneNumber}</Alert>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalAddress">
          <Form.Label column sm={3}>
            Address:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="address"
              value={formikHome.values.address}
              onChange={formikHome.handleChange}
              onBlur={formikHome.handleBlur}
              style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
            />
            {formikHome.touched.address && formikHome.errors.address && (
              <Alert variant="danger">{formikHome.errors.address}</Alert>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 8, offset: 4 }}>
            <Button type="submit" className="custom-button" style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '20px', marginBottom: '20px', cursor: 'pointer' }}>UPDATE</Button>
          </Col>
        </Form.Group>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default CustomerHome;
