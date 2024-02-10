import React from 'react';


const sampleInvoiceDetails = {
  invoiceId:'6505',
  receivedDate: '2024-02-09',
  receivedTime: '10:00 AM',
  deliveryDate: '2024-02-10',
  deliveryTime: '11:00 AM',
  name: 'John Doe',
  phoneNumber: '123-456-7890',
  address: '123 Main Street, City, Country',
  items: [
    { id: 1, category: 'Item 1', pricePerUnit: 10, quantity: 2, totalPrice: 20 },
    { id: 2, category: 'Item 2', pricePerUnit: 15, quantity: 1, totalPrice: 15 },
    { id: 3, category: 'Item 3', pricePerUnit: 20, quantity: 3, totalPrice: 60 },
  ],
  total: 95,
  advance: 50,
  availableBalance: 45,
};

const InvoicePage = ({ invoiceId }) => {
  const invoiceDetails = sampleInvoiceDetails;

  return (
    <div className="container">
      <h1 className="text-center pt-4">Invoice: {invoiceDetails.invoiceId}</h1>
      <div className="row  " style={{marginTop:'20px'}}>
        <div className="col-md-6 ">
          <p><strong>Received Date:</strong> {invoiceDetails.receivedDate}</p>
          <p><strong>Received Time:</strong> {invoiceDetails.receivedTime}</p>
        </div>
        <div className="col-md-6 text-end">
          <p><strong>Delivery Date:</strong> {invoiceDetails.deliveryDate}</p>
          <p><strong>Delivery Time:</strong> {invoiceDetails.deliveryTime}</p>
        </div>
      </div>
      <div style={{marginTop:'20px'}}>
        <p><strong>Name:</strong> {invoiceDetails.name}</p>
        <p><strong>Phone Number:</strong> {invoiceDetails.phoneNumber}</p>
        <p><strong>Address:</strong> {invoiceDetails.address}</p>
      </div>
      <table className="table" style={{marginTop:'30px'}}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Price per Unit</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {invoiceDetails.items.map(item => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>Rs{item.pricePerUnit}</td>
              <td>{item.quantity}</td>
              <td>Rs{item.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:'50px'}}>
        <p><strong>Total:</strong> Rs{invoiceDetails.total}</p>
        <p><strong>Advance:</strong> Rs{invoiceDetails.advance}</p>
        <p><strong>Available Balance:</strong> Rs{invoiceDetails.availableBalance}</p>
      </div>
      <button className="btn btn-primary settle-button d-flex justify-content-end" style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', cursor: 'pointer' }}>Settle</button>
    </div>
  );
};

export default InvoicePage;




/*import React, { useState, useEffect } from 'react';

const InvoicePage = ({ invoiceId }) => {
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  useEffect(() => {
    // Fetch invoice details from the database using invoiceId
    // Assume fetchInvoiceDetails is a function that fetches data from the database
    const fetchInvoiceDetails = async () => {
      try {
        const response = await fetch(`api/invoices/${invoiceId}`);
        const data = await response.json();
        setInvoiceDetails(data);
      } catch (error) {
        console.error('Error fetching invoice details:', error);
      }
    };

    fetchInvoiceDetails();
  }, [invoiceId]);

  if (!invoiceDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="two-column-layout">
        <div>
          <p>Received Date: {invoiceDetails.receivedDate}</p>
          <p>Received Time: {invoiceDetails.receivedTime}</p>
        </div>
        <div>
          <p>Delivery Date: {invoiceDetails.deliveryDate}</p>
          <p>Delivery Time: {invoiceDetails.deliveryTime}</p>
        </div>
      </div>
      <div>
        <p>Name: {invoiceDetails.name}</p>
        <p>Phone Number: {invoiceDetails.phoneNumber}</p>
        <p>Address: {invoiceDetails.address}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Price per Unit</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {invoiceDetails.items.map(item => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>{item.pricePerUnit}</td>
              <td>{item.quantity}</td>
              <td>{item.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Total: {invoiceDetails.total}</p>
        <p>Advance: {invoiceDetails.advance}</p>
        <p>Available Balance: {invoiceDetails.availableBalance}</p>
      </div>
      <button className="settle-button">Settle</button>
    </div>
  );
};

export default InvoicePage;*/
