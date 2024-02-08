import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import companyLogo from '../images/logo.png'; 

const ViewBills = () => {
  const [data, setData] = useState([
    { id: 1, invoiceId: 1, customerId: 101, customerName: 'John Doe', total: 100 },
    { id: 2, invoiceId: 2, customerId: 102, customerName: 'Jane Smith', total: 200 },
    { id: 3, invoiceId: 3, customerId: 107, customerName: 'Hana', total: 800 },
    // Add more data as needed
  ]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleDelete = () => {
    const newData = data.filter(item => !selectedRows.includes(item.id));
    setData(newData);
    setSelectedRows([]);
  };

  return (

    <div className="container-fluid" style={{ maxWidth: '800px', marginTop:'30px'}}> 

  {/*/----------------------------------Header----------------------------------------------------------------------------------------/*/}
      <div className="row align-items-center mb-3">
        <div className="col-sm-auto">
          <img src={companyLogo} alt="Company Logo" style={{ width: '100px' }} />
        </div>
        <div className="col-sm">
          <h2>Dirty 2 Beaty Laundry</h2>
        </div>
      </div>

    {/**-----------------------------View Bills---------------------------------------------------------------------------------------- */}
      
      <div style={{ marginTop:'30px'}} >
        <h5 className=" mb-4">View Bills</h5>
        <div className="table-responsive">
            <Table striped bordered hover style={{ maxWidth: '100%' }}> 
            <thead>
                <tr>
                    <th></th>
                    <th>Invoice ID</th>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Total</th>
                    <th>View Bills</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                <tr key={item.id}>
                    <td>
                        <input
                         type="checkbox"
                         onChange={e => handleCheckboxChange(e, item.id)}
                         checked={selectedRows.includes(item.id)}
                        />
                    </td>
                    <td>{item.invoiceId}</td>
                    <td>{item.customerId}</td>
                    <td>{item.customerName}</td>
                    <td>{item.total}</td>
                    <td>
                      <a href="#">View</a>
                    </td>
                </tr>
                 ))}
            </tbody>
            </Table>
        </div>
        </div>
      
      {/**------------------------------------------------Button Row--------------------------------------------------------------------------- */}
      <div className="row">
        <div className="col-sm d-flex justify-content-end" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 2 }}>
            <Button onClick={handleDelete} style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', cursor: 'pointer' }} block>
              Delete
            </Button>
        </div>
        <div className="col-sm d-flex justify-content-start align-items-end" style={{ position: 'fixed', bottom: '20px', left: '20px' }}>
            <Button style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', cursor: 'pointer' }} block>
              Logout
            </Button>
        </div>
      </div>

    </div>
      
    
  );
};

export default ViewBills;
