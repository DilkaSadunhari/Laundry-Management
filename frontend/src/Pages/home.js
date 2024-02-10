import React , { useState,useEffect } from 'react';
import { Row, Col, Form, Button, Alert, Dropdown, FormControl } from 'react-bootstrap';
//import FilterDropdown from '../Components/FilterDropdown';
//import './AddCustomer/AddCustomer.css'; 
import { useFormik } from 'formik'

function Home() {

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

//----------------------------------dropdown menu----------------------------
const [mobileNumbers, setMobileNumbers] = useState([]);
  const [selectedMobile, setSelectedMobile] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState(null);

  const [filterText, setFilterText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(mobileNumbers); // Initialize with mobileNumbers

  // Fetch mobile numbers from your backend
  useEffect(() => {
    // Make sure to replace 'YOUR_BACKEND_ENDPOINT' with the actual endpoint
    fetch('http://localhost:8000/customer/getAllMobileNumbers')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setMobileNumbers(data);
        setFilteredOptions(data); // Update filteredOptions with mobileNumbers
      })
      .catch(error => {
        console.error('Error fetching mobile numbers:', error);
        setError(error.message);
      });
  }, []);

  // Handle mobile number selection
  const handleMobileSelection = async (selectedMobile) => {
    setSelectedMobile(selectedMobile);

    // Find the corresponding id for the selected mobile number
    const selectedMobileObject = mobileNumbers.find(item => item.mobile === selectedMobile);
    if (selectedMobileObject) {
      try {
        // Fetch customer data based on the selected mobile number's id
        const response = await fetch(`http://localhost:8000/customer/get/${selectedMobileObject.id}`);
        if (!response.ok) {
          throw new Error(`Server returned ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setCustomerData(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setError(error.message);
      }
    }
  };

  const handleFilterChange = (e) => {
    const searchText = e.target.value;
    setFilterText(searchText);

    const filtered = mobileNumbers.filter((option) =>
      option.mobile.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredOptions(filtered);
  };

  const handleOptionSelect = (option) => {
    handleMobileSelection(option.mobile);
  };

  const dropdownStyle = {
    backgroundColor: 'ash', // You can replace 'ash' with your desired color
  };
//-------------------------------------------------------------------------------------------------------------
//const options = ['0716589457', '077894521789', '076985423'];
  return (
    <div className="container">
    
    <Form className="custom-form" onSubmit={formik.handleSubmit}>

    <Form.Group as={Row} style={{ marginBottom: '60px' }} controlId="formHorizontalName">
        <Form.Label column sm={5}>
            Phone Number :
        </Form.Label>
        <Col sm={7}>
            {/* <MobileFilterDropdown options={options} /> */}
            <div>
              {error && <p>Error: {error}</p>}

              <Dropdown style={dropdownStyle}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedMobile ? selectedMobile : 'Select Mobile Number'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter"
                    onChange={handleFilterChange}
                    value={filterText}
                  />
                  {filteredOptions.map((number, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleOptionSelect(number)}
                    >
                      {number.mobile}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
        </Col>
    </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
        <Form.Label column sm={3}>
          Name :
        </Form.Label>
        <Col sm={9}>
        <Form.Control
                type="text"
                name="name"
                value={customerData ? customerData.name : formik.values.name}
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
        Phone number :
      </Form.Label>
      <Col sm={9}>
        <Form.Control
          type="text"
          value={customerData ? customerData.mobile : phoneNumber}
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
         Address :
        </Form.Label>
        <Col sm={9}>
        <Form.Control
                type="text"
                name="address"
                value={customerData ? customerData.address : formik.values.address}
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
          <Button type="submit" className="custom-button"style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '20px', marginBottom: '20px', cursor: 'pointer' }} >ADD</Button>
        </Col>
      </Form.Group>
    </Form>

   
   
    </div>
  );
}

export default Home;
