import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Invoice = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const totalPriceRef = useRef(null);
  const advancedPaymentRef = useRef(null);
  const [advancedPayment, setAdvancedPayment] = useState('0');
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
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
    if (!deliveryDate || !deliveryTime||!balance) {
      setErrorMessage('Please enter delivery date and time before printing.');
      return;
    }
    window.location.reload();
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
    const isPriceValid = !isNaN(parseFloat(price)) && isFinite(price);
    const isQuantityValid = !isNaN(parseFloat(quantity)) && isFinite(quantity);

    if (!isPriceValid || !isQuantityValid) {
      const errorMessage = 'Invalid input. Please check your input.';
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
    const advancedPaymentFloat = parseFloat(advancedPayment);
    if (isNaN(advancedPaymentFloat)) {
      setBalance('Please enter amount of advance.');
      return;
    }

    const calculatedBalance = totalAmount - advancedPaymentFloat;
    setBalance(calculatedBalance.toFixed(2));
  };

  return (
    <div className="container mt-5">
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      <h1 className="text-center">Invoice Generator</h1>

{/* date and time---------------------------------------------------------------------------------------------------------- */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ marginBottom: '20px' }}>
          <h6>Current Date and Time:</h6>
          <p>{currentDateTime.toLocaleString()}</p>
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
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Price per unit"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onKeyPress={handleKeyPress}
        />

{/*----------------------------------------Total Price------------------------------------------------------------------- */}
        <div>Total Price: {calculateTotalItemPrice()}</div>

{/*-------------------------------------ADD BUTTON------------------------------------------------------------------------ */}
        <button className="btn btn-primary mt-2" onClick={addItem}>Add</button>
      </div>


{/*---------------------------------------Table---------------------------------------------------------------------------------------------------- */}
      <table className="table">
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
      <div className="text-end">
        <p>Total Amount: {totalAmount}</p>
      </div>

{/*-----------------------------------------------calculate Balance------------------------------------------------------------------------------ */}
      <div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="totalPrice">Total Price:</label>
          <input
            type="number"
            id="totalPrice"
            ref={totalPriceRef}
            value={totalAmount}
            readOnly
            style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="advancedPayment">Advanced Payment:</label>
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
        <button onClick={calculateBalance} style={{ padding: '8px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Calculate Balance</button>
        <div style={{ marginTop: '10px' }}>
          {balance && <p>Balance: {balance}</p>}
        </div>
      </div>
  
  {/*-------------print Bill------------------------------------------------------------------------------------------------------------------ */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handlePrint ||calculateBalance} style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', marginLeft: '20px', cursor: 'pointer' }}>
        Print
      </button>
    </div>
  );
};

export default Invoice;
