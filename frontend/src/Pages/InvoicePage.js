import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

//------------------------------------------------------------------connect to back end --------------------------------------------------------//
const InvoicePage = () => {
  const [mainDetails, setMainDetails] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { invoice_id } = useParams();

  useEffect(() => {
    console.log('useEffect is running');
    //-----------------------------------------fetching customer details------------------------------------------------------------------------------
    const fetchMainDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/bill/getOrderMainDetails/'+invoice_id);
        setMainDetails(response.data[0]);

        console.log(response.data);
      } catch (error) {
        console.error('Error fetching main details:', error);
      }
    };
//--------------------------------------------fetching table data-------------------------------------------------------------------------------
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/bill/getOrderItemDetails/'+invoice_id);
        setItemDetails(response.data);
       
      } catch (error) {
        console.error('Error fetching item details:', error);
       
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchMainDetails(), fetchItemDetails()]);
      setLoading(false);
    };

     fetchData();
  }, [invoice_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!mainDetails || !itemDetails) {
    return <div>Error fetching invoice details</div>;
  }


  //----------------------------------------------------------------------------------------------------------------------------------------
  return (
    console.log('useEffect cleanup'),
    <div className="container">
      <h1 className="text-center pt-4">Invoice: {mainDetails.invoice_id}</h1>
      <div className="row" style={{ marginTop: '20px' }}>
        <div className="col-md-6">
          <p><strong>Received Date:</strong> {mainDetails.received_date}</p>
          <p><strong>Received Time:</strong> {mainDetails.received_time}</p>
        </div>
        <div className="col-md-6 text-end">
          <p><strong>Delivery Date:</strong> {mainDetails.delivery_date}</p>
          <p><strong>Delivery Time:</strong> {mainDetails.delivery_time}</p>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p><strong>Name:</strong> {mainDetails.Customer_name}</p>
        <p><strong>Phone Number:</strong> {mainDetails.Customer_mobile}</p>
        <p><strong>Address:</strong> {mainDetails.address}</p>
      </div>
      <div style={{ marginTop: '50px' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Price per Unit</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {itemDetails.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>Rs{item.price_per_unit}</td>
                <td>{item.qty}</td>
                <td>Rs{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '50px' }}>
        <p><strong>Total:</strong> Rs{mainDetails.total}</p>
        <p><strong>Advance:</strong> Rs{mainDetails.advance}</p>
        <p><strong>Available Balance:</strong> Rs{mainDetails.available_balance}</p>
      </div>
      <button className="btn btn-primary settle-button d-flex justify-content-end" style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', cursor: 'pointer' }}>Settle</button>
    </div>
  );
};

export default InvoicePage;
