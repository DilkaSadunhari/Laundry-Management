import React, { useState } from 'react';
 
import { Table, Button } from 'react-bootstrap';
import companyLogo from '../images/logo.png'; 
import FilterDropdown from '../Components/FilterDropdown';





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

//-------------------------------------------Logout handle---------------------------------------
  const handleLogout = () => {
    console.log('Attempting to remove cookie...');
    document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ';
    console.log('Cookie removed');
    window.location.href = '/login';
  };
//-------------------------------------------------------------------------------------------------------
  //must replace--------------------------
  const options = ['0716589457', '077894521789', '076985423'];
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
              <FilterDropdown options={options} />
            </div>
          </div> 
        </div>
        <div className="col-md-6">
          <div className='row gx-2'>
            <div className="col-md-6">
               <p>Select Phone Number :</p>
            </div>
            <div className="col-md-6">
              <FilterDropdown options={options} />
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

                      <a href="./InvoicePage">View</a>

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
