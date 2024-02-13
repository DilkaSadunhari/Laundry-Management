import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

//import { Dropdown, FormControl } from 'react-bootstrap';
//import { ToastContainer, toast } from 'react-toastify';
//import FilterDropdown from '../Components/FilterDropdown';



import {  Form, Row, Col, Dropdown, FormControl, Button, Alert } from 'react-bootstrap';

import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Invoice = () => {
 

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const totalPriceRef = useRef(null);
  const advancedPaymentRef = useRef(null);
  const [advancedPayment, setAdvancedPayment] = useState('0');
  const [balance, setBalance] = useState('0');
  
  //------------------------------Customer Details---------------
  const [customerDataHome, setCustomerDataHome] = useState([]);
  const [selectedCustomerHome, setSelectedCustomerHome] = useState(null);
  const [customerDetailsHome, setCustomerDetailsHome] = useState(null);
  const [filterTextHome, setFilterTextHome] = useState('');
  const [filteredOptionsHome, setFilteredOptionsHome] = useState([]);
  const [updateSuccessHome, setUpdateSuccessHome] = useState(false);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState(null);

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
          setSelectedCustomerDetails(response.data)
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
           // toast.success('Customer updated successfully!');
          })
          .catch(error => {
            console.error('Error updating customer:', error);
            //toast.error('Failed to update customer. Please try again.');
          });
      } else {
        console.error('Phone number cannot be null');
        //toast.error('Phone number cannot be null');
      }
    }
  };
//---------------------------End of customer Details---------
   

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString());
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  const handleDateChange = (e) => {
    setDeliveryDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setDeliveryTime(e.target.value);
  };

  const handlePrint =  async() => {

    let errorMessage = '';
  
    if (!deliveryDate || !deliveryTime) {
      errorMessage += 'Please enter delivery date and time. ';
    }
  
    if (!balance || balance === '0') {
      errorMessage += 'Please calculate invoice balance. ';
    }
  
    if (errorMessage !== '') {
      setErrorMessage(errorMessage);
      return;
    }
    
   // window.location.reload();
    // Prepare data for the request
    const [month, day, year] = currentDate.split('/');
    const requestData = {
      customer_id: 1, // Replace with the actual customer ID
     received_date: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
      received_time: currentTime, // Format received time
      delivery_date:deliveryDate,
      delivery_time:deliveryTime,
      total: totalAmount,
      advance: advancedPayment,
      available_balance: balance,
      items: items.map(item => ({
        category_id: 1, // Replace with the actual category ID
        price_per_unit: item.price,
        qty: item.quantity,
        total: item.totalPrice
      }))
    };

    try {
      // Send POST request to the backend API
      const response = await axios.post('http://localhost:8000/bill/add', requestData);
      console.log(response.data); // Log response from the server
      toast.success('Bill Print successfully');
      setErrorMessage(''); // Clear error message if successful
    } catch (error) {
      console.error('Error adding bill:', error);
      setErrorMessage('Error adding bill. Please try again.'); // Display error message if request fails
      toast.error('Error adding bill. Please try again.');
    }
  };

  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (e.target === totalPriceRef.current) {
        advancedPaymentRef.current.focus();
      } else if (e.target === advancedPaymentRef.current) {
        calculateBalance();
      }
    }
  };

  const calculateTotalItemPrice = () => {
    if (!price || !quantity) {
      return 0;
    }
    const totalItemPrice = parseFloat(price) * parseFloat(quantity);
    return totalItemPrice.toFixed(2);
  };

  const addItem = () => {

    let errorMessage = '';
  
    // Validation: Category cannot be empty
    if (!category.trim()) {
      errorMessage += 'Please select  category. ';
    }
  
     //Validation: Price per unit must be a positive floating-point value
    if (!/^\d*\.?\d+$/.test(price) || parseFloat(price) <= 0) {
      errorMessage += 'Invalid price per unit. ';
    }
  
    // Validation: Quantity must be a positive floating-point value
    if (!/^\d*\.?\d+$/.test(quantity) || parseFloat(quantity) <= 0) {
      errorMessage += 'You must add valid quantity. ';
    }
  
    if (errorMessage !== '') {
      setErrorMessage(errorMessage);
      return;
    }
    const totalPrice = parseFloat(price) * parseFloat(quantity);
    const newItem = {
      category,
      type,
      price: parseFloat(price),
      quantity: parseFloat(quantity),
      totalPrice,
    };

    setErrorMessage('');
    setItems([...items, newItem]);
    setCategory('');
    setType('');
    setPrice('');
    setQuantity('');
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  useEffect(() => {
    const totalAmount = items.reduce((total, item) => total + item.totalPrice, 0);
    setTotalAmount(totalAmount);
  }, [items]);

  const handleAdvancedPaymentChange = (e) => {
    setAdvancedPayment(e.target.value);
  };

  const calculateBalance = () => {

    // Check if totalAmount is greater than 0
    if (totalAmount <= 0) {
      setBalance(<p style={{ color: 'red' }}>Invalid Total amount.</p>);
      return;
    }
  
    const advancedPaymentFloat = parseFloat(advancedPayment);
    if (isNaN(advancedPaymentFloat) || advancedPaymentFloat < 0) {
      setBalance(<p style={{ color: 'red' }}>Please enter a valid advanced payment.</p>);
      return;
    }
  
    const calculatedBalance = totalAmount - advancedPaymentFloat;
    setBalance(calculatedBalance.toFixed(2));
  };
  


  //---------------------------------- Category dropdown menu---------------------------------------------------
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [filterText, setFilterText] = useState('');

     useEffect(() => {
    // Fetch categories from your backend when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/category/getAllNames'); // Update with your backend API endpoint
      const data = await response.json();
      console.log('Fetched categories:', data);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategorySelect = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8000/category/get/${categoryId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Category Data:', data);
      setSelectedCategory(data);
      setPrice(data.price);
      setCategory(data.name);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };
  

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(filterText.toLowerCase())
  );


//-------------------------------------------------------------------------------------------------------------
 
return (
  
    <div className="container mt-4">


      

      
{/* ----------------Customer Details-------------- */}
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

      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      {/*<h1 className="text-center" style={{marginTop:"100px"}}>Invoice Generator</h1>*/}

{/* ----------------End of Customer Details-------------- */}

{/* date and time---------------------------------------------------------------------------------------------------------- */}
<div style={{ display: 'flex', justifyContent: 'space-between',marginTop:'50px' }}>
      <div style={{ marginBottom: '20px',marginInlineStart:'0px' }}>
        <h6 style={{marginBottom:'15px'}}>Current Date: {currentDate}</h6>
        <h6 style={{marginBottom:'5px'}}>Current Time: {currentTime}</h6>
      </div>
      <div style={{position:'absolute' ,right:'30px'}}>
          
          <div className='row'>
            <div className='col'>
            <h6>Delivery Date:</h6>
            </div>
            <div className='col'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="date"
              value={deliveryDate}
              onChange={handleDateChange}
              style={{ marginBottom:'10px', width: '100%' }}
            />
            </div>
          </div>
          </div>

          <div className='row'>
            <div className='col'>
             <h6>Delivery Time:</h6>
            </div>
            <div className='col'>
            <input
              type="time"
              value={deliveryTime}
              onChange={handleTimeChange}
              style={{ width: '100%' }}
            />

            </div>
          </div>
          
           
      
      
    </div>
      </div>

      {/* {selectedCustomerDetails && (
  <div>
    <h3>Selected Customer Details:</h3>
    <p>ID: {selectedCustomerHome.id}</p>
    <p>Name: {selectedCustomerDetails.name}</p>
    <p>Phone Number: {selectedCustomerDetails.mobile}</p>
    <p>Address: {selectedCustomerDetails.address}</p>
  </div>
)} */}
{/*----------------------------------------------------------------------category must be replace----------------------------------------------- */}
<div style={{ display: 'flex' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <p>Select Category :</p>
        </div>
        {/* -------------------------------------categoryFilterDropdown-------------------------------------- */}
        <div style={{ flex: 1 }}>
        <Dropdown onSelect={handleCategorySelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <FormControl
            type="text"
            placeholder="Search category"
            className="mb-2"
            onChange={handleFilterChange}
          />
          {filteredCategories.map((category) => (
            <Dropdown.Item key={category.id} eventKey={category.id}>
              {category.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

        </div>
      </div>
      <div style={{ flex: 1 }}>
      
      </div>
    </div>
<div>
  
{/**-------------------------------------------------------------Cat,Type,price,quantity---------------------------------------- */}
<div className="mb-3" >
  <div className='row'>
    <div className='col'>
    <div className='row'>
    <div className="col">
      
        <div className="col " style={{marginBottom:'10px'}}>
          <label style={{ fontWeight: 'bold'}}>Category :</label>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            // placeholder="Category"
            value={selectedCategory.name }
            onChange={(e) => setCategory(e.target.value)}
            // onKeyPress={handleKeyPress}
          />
        </div>
      
    </div>
  </div>
    </div>
    <div className='col'>
    <div className='row'>
    <div className="col">
      
        <div className="col" style={{marginBottom:'10px'}}>
          <label style={{ fontWeight: 'bold'}}>Type :</label>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            //placeholder="type"
            value={selectedCategory.type }
            onChange={(e) => setType(e.target.value)}
            // onKeyPress={handleKeyPress}
          />
        </div>
      
    </div>
  </div>
</div>
<div className='col'>
<div className='row'>
    <div className="col">
      
        <div className="col"style={{marginBottom:'10px'}}>
          <label style={{ fontWeight: 'bold'}}>Price per Unit :</label>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            //placeholder="Price per unit"
            value={selectedCategory.price }
            onChange={(e) => setPrice(e.target.value)}
            // onKeyPress={handleKeyPress}
          />
        </div>
      
    </div>
  </div>
</div>

<div className='col'>
<div className='row'>
    <div className="col">
      
        <div className="col"style={{marginBottom:'10px'}}>
          <label style={{ fontWeight: 'bold'}}>Quantity :</label>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Quantity"
            value={ quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      
    </div>
  </div>
  
</div>
</div>
</div>
</div>


       
{/*----------------------------------------Total Price------------------------------------------------------------------- */}
        
        <div style={{fontWeight: 'bold'}}>Total Price:Rs  {calculateTotalItemPrice()}</div>
{/*-------------------------------------ADD BUTTON------------------------------------------------------------------------ */}
        <button className="btn btn-primary mt-2" onClick={addItem}style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '50px', marginBottom:'50px', cursor: 'pointer' }}>Add</button>


{/*---------------------------------------Table---------------------------------------------------------------------------------------------------- */}
      <table className="table ">
        
      
        <thead>
          <tr style={{ backgroundColor: 'rgb(135, 206, 250)', padding: '20px', borderRadius: '10px' }}>
            <th>Category</th>
            <th>Price per unit</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.totalPrice}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

{/*---------------------------------------Total Amount--------------------------------------------------------------------------------------------- */}

      <div className="text-end">
      <p className="fw-bold fs-5">Total Amount: Rs {totalAmount}</p>
      </div>

{/*-----------------------------------------------calculate Balance------------------------------------------------------------------------------ */}
    <div style={{ backgroundColor: 'rgb(13, 20, 128)', padding: '10px', borderRadius: '10px' }}>
      <div className='row'style={{paddingInline:'10px'}}>
        <div className='col'> 
        <div className='row'>
          <div className='col '>
          <div style={{ marginBottom: '20px' }}>
          <label htmlFor="totalPrice" style={{color: 'white'}}>Total Price   :</label>
          </div>
          </div>
          <div className='col'>
          <input
            type="number"
            id="totalPrice"
            ref={totalPriceRef}
            value={totalAmount}
            readOnly
            style={{ backgroundColor:'rgb(13, 20, 128)',color: 'white' }}
          />
          </div>
          </div>
        <div className='row'>
            <div className='col'>
            <div style={{ marginBottom: '20px' }}>
            <label htmlFor="advancedPayment"style={{color: 'white'}} >Advanced Payment:</label>
            </div>
            </div>
            <div className='col'>
            <input
            type="number"
            id="advancedPayment"
            ref={advancedPaymentRef}
            value={advancedPayment}
            onChange={handleAdvancedPaymentChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter advanced payment"
            style={{ backgroundColor:'rgb(13, 20, 128)',color: 'white' }}
          />
        </div>
          </div>
        </div>
        <div className='col' style={{marginTop:'40px',display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={calculateBalance} style={{ background: 'rgb(135, 206, 235)', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', cursor: 'pointer' }}>Balance</button>
        </div> 

        <div >
          {balance && <p className="fw-bold fs-5" style={{color: 'white'}}>Balance: Rs {balance}</p>}
        </div>  
      </div>
      </div>
  
  {/*-------------print Bill------------------------------------------------------------------------------------------------------------------ */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button onClick={(handlePrint||calculateBalance)} style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '20px', marginBottom: '20px', cursor: 'pointer' }}>
        Print
      </button>
      <ToastContainer/>
      </div>
      

  );
};

export default Invoice;
