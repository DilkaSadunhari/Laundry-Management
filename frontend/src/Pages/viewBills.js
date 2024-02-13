import React, { useState,useEffect } from 'react';
 
import { Table, Button } from 'react-bootstrap';
import companyLogo from '../images/logo.png'; 
import FilterDropdown from '../Components/FilterDropdown';
import axios from "axios";





const ViewBills = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [invoiceId, setInvoiceId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [mobileNumbers, setMobileNumbers] = useState([]);
  const[invoiceIds,setInvoiceIds] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost:8000/bill/getAllBills', {
      withCredentials: true,
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://localhost:8000/bill/getAllMobileNumbers', {
      withCredentials: true,
    })
      .then(response => {
        setMobileNumbers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://localhost:8000/bill/getAllInvoiceNumbers', {
      withCredentials: true,
    })
      .then(response => {
        setInvoiceIds(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  })

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

  const filterData = () => {
    axios.post('http://localhost:8000/bill/getAllByInvoiceAndMobile', {
      invoice_id:invoiceId,
      customer_id:customerId
    }, {
      withCredentials: true,
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

//-------------------------------------------Logout handle---------------------------------------
  const handleLogout = () => {
    console.log('Attempting to remove cookie...');
    document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ';
    console.log('Cookie removed');
    window.location.href = '/login';
  };
//-------------------------------------------------------------------------------------------------------
  //must replace--------------------------
  
  return (

    <div className="container-fluid" style={{ maxWidth: '800px', marginTop:'20px'}}> 

  {/*/----------------------------------Header----------------------------------------------------------------------------------------/*/}
      <div className="row align-items-center mb-5">
        <div className="col-md-auto mb-3 mb-md-0">
          <img src={companyLogo} alt="Company Logo" style={{ width: '100px' }} />
        </div>
        <div className="col-md">
          <h2>Dirty 2 Beauty Laundry</h2>
        </div>
      </div>


    {/**---------------------------------Drop down---------------------------------------------------------------------------------- */}
    <div className="mb-3" style={{ marginBottom: '200px' }}>
      <div className='row gx-2'>
        <div className="col-md-6">
          <div className='row gx-2'>
            <div className="col-md-6">
              <p>Select Invoice ID :</p>
            </div>
            <div className="col-md-6">
              <FilterDropdown options={invoiceIds} />
            </div>
          </div> 
        </div>
        <div className="col-md-6">
          <div className='row gx-2'>
            <div className="col-md-6">
               <p>Select Phone Number :</p>
            </div>
            <div className="col-md-6">
              <FilterDropdown options={mobileNumbers} />
             </div>
          </div> 
        </div>
  </div>
</div>
    {/**-----------------------------View Bills---------------------------------------------------------------------------------------- */}
      
      <div style={{ marginTop:'50px'}} >

        <h5 className=" mb-4">View Bills</h5>
        <div className="table-responsive">
            <Table striped bordered hover style={{ maxWidth: '100%' }}> 
            <thead>
                <tr>
                    <th></th>
                <th>Invoice ID</th>
                <th>Delivery Date</th>
                <th>Delivery Time</th>
                    <th>Customer Name</th>
                <th>Total</th>
                <th>Advance</th>
                <th>Balance</th>
                    <th>View Bills</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                  <tr key={item.invoice_id}>
                    <td>
                        <input
                         type="checkbox"
                         onChange={e => handleCheckboxChange(e, item.id)}
                         checked={selectedRows.includes(item.id)}
                        />
                    </td>
                    <td>{item.invoice_id}</td>
                    <td>{item.delivery_date}</td>
                    <td>{item.delivery_time}</td>
                    <td>{item.Customer_name}</td>
                    <td>{item.total}</td>
                    <td>{item.advance}</td>
                    <td>{item.available_balance}</td>
                    <td>

                      <a href={`./InvoicePage/${item.invoice_id}`}>View</a>

                    </td>
                </tr>
                 ))}
            </tbody>
            </Table>
        </div>
        </div>
      
      {/**------------------------------------------------Button Row--------------------------------------------------------------------------- */}

      <div className="row gx-2">
        <div className="col-sm justify-content-end d-flex " style={{ bottom: '20px', right: '20px' }}>
     
            <Button onClick={handleDelete} style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', cursor: 'pointer' }} block>
              Delete
            </Button>
        </div>

        <div className="col-sm  " style={{ position: 'fixed', bottom: '20px', left: '20px' }}>
            <Button onClick={handleLogout} style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', cursor: 'pointer' }} block>
              Logout
            </Button>

        

        </div>
      </div>

    </div>
      
    
  );
};

export default ViewBills;
