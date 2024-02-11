import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterDropdown from '../Components/FilterDropdown';
//import Home from './home';


const Invoice = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [customerID, setcutomerID] = useState('');
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

  const handlePrint = () => {

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
  };

  const OnPrint = async () => {
    // Prepare data to send to backend
    const data = {
      customer_id: customerID,
      received_date: currentDate,
      received_time: currentTime,
      delivery_date: deliveryDate,
      delivery_time: deliveryTime,
      total: totalAmount,
      advance: advancedPayment,
      available_balance: balance,
      items: items.map(item => ({
        category_id: item.category_id,
        price_per_unit: item.price,
        qty: item.quantity,
        total: item.totalPrice
      }))
    };

    try {
      // Send POST request to backend
      const response = await fetch('http://localhost:8000/bill/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Check if request was successful
      if (!response.ok) {
        throw new Error('Failed to add bill');
      }

      // Extract data from response
      const responseData = await response.json();

      // Handle success response
      console.log('Bill added successfully with ID:', responseData.invoice_id);
    } catch (error) {
      // Handle error
      console.error('Error adding bill:', error.message);
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
      errorMessage += 'Please enter  category Name. ';
    }
  
    // Validation: Price per unit must be a positive floating-point value
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
      price: parseFloat(price),
      quantity: parseFloat(quantity),
      totalPrice,
    };

    setErrorMessage('');
    setItems([...items, newItem]);
    setCategory('');
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
  
  //must replace--------------------------
  const options = ['0716589457', '077894521789', '076985423']; 
  return (

    
    <div className="container mt-4" >

      {/*<div>
        <Home/>
  </div>*/}
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      <h1 className="text-center" style={{marginTop:"100px"}}>Invoice Generator</h1>

{/* date and time---------------------------------------------------------------------------------------------------------- */}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' ,marginBottom:'50px'}}>

        <div style={{ marginBottom: '20px' }}>
        <h6>Current Date: {currentDate}</h6>
        <h6>Current Time: {currentTime}</h6>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h6>Delivery Date and Time:</h6>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="date"
              value={deliveryDate}
              onChange={handleDateChange}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <input
              type="time"
              value={deliveryTime}
              onChange={handleTimeChange}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>


{/*----------------------------------------------------------------------category must be replace----------------------------------------------- */}

<div className="mb-3" style={{ marginBottom: '200px' }}>
  <div className='row gx-2'>
    <div className="col-md-6">
      <p>Select Category :</p>
    </div>
    <div className="col-md-6">
      <FilterDropdown options={options} />
    </div>
  </div>
</div>

<div style={{}}>
<div className="mb-3" style={{ marginBottom: '150px' , marginTop:'80px'}}>
  <div className='row'>
    <div className="col-md-6">
      <div className="row">
        <div className="col-md-6">
          <label>Customer ID :</label>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={customerID}
            onChange={(e) => setcutomerID(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  </div>
</div>
<div className="mb-3" style={{ marginBottom: '150px' , marginTop:'80px'}}>
  <div className='row'>
    <div className="col-md-6">
      <div className="row">
        <div className="col-md-6">
          <label>Category :</label>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  </div>
</div>

<div className="mb-3" style={{ marginBottom: '150px' }}>
  <div className='row'>
    <div className="col-md-6">
      <div className="row">
        <div className="col-md-6">
          <label>Price per Unit :</label>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Price per unit"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  </div>
</div>

<div className="mb-3" style={{ marginBottom: '50px' }}>
  <div className='row'>
    <div className="col-md-6">
      <div className="row">
        <div className="col-md-6">
          <label>Quantity :</label>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  </div>
</div>

</div>


       
{/*----------------------------------------Total Price------------------------------------------------------------------- */}
        
        <div style={{marginTop:'50px',marginBottom:'50px'}}>Total Price: Rs {calculateTotalItemPrice()}</div>
{/*-------------------------------------ADD BUTTON------------------------------------------------------------------------ */}
        <button className="btn btn-primary mt-2" onClick={addItem}style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '50px', marginBottom:'50px', cursor: 'pointer' }}>Add</button>


{/*---------------------------------------Table---------------------------------------------------------------------------------------------------- */}
      <table className="table" style={{marginTop:'50px',marginBottom:'50px'}}>

        <thead>
          <tr>
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

      <div className="text-end"style={{marginTop:'50px',marginBottom:'50px'}}>
      <p>Total Amount: Rs {totalAmount}</p>
      </div>

{/*-----------------------------------------------calculate Balance------------------------------------------------------------------------------ */}
      <div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="totalPrice">Total Price   :</label>

          <input
            type="number"
            id="totalPrice"
            ref={totalPriceRef}
            value={totalAmount}
            readOnly
            style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="advancedPayment" style={{paddingRight:'15px'}}>Advanced Payment:</label>

          <input
            type="number"
            id="advancedPayment"
            ref={advancedPaymentRef}
            value={advancedPayment}
            onChange={handleAdvancedPaymentChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter advanced payment"
            style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }}
          />
        </div>
        <button onClick={calculateBalance} style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', cursor: 'pointer' }}>Calculate Balance</button>
        <div style={{ marginTop: '30px' }}>
          {balance && <p>Balance: Rs {balance}</p>}
        </div>
      </div>
  
  {/*-------------print Bill------------------------------------------------------------------------------------------------------------------ */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button onClick={(handlePrint ||calculateBalance)&&OnPrint} style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '20px', marginBottom: '20px', cursor: 'pointer' }}>
        Print
      </button>
      </div>

  );
};

export default Invoice;
