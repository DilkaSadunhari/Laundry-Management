
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom'; 
import { Table, Button, Form, Dropdown ,FormControl} from 'react-bootstrap';
import companyLogo from '../images/logo.png'; 
//import FilterDropdown from '../Components/FilterDropdown';


const ViewBills = () => {

  //-----------------------Invoice numbers dropdown---------------------------------------------
  const [invoiceNumbers, setInvoiceNumbers] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API call using Axios
        const response = await axios.get('http://localhost:8000/bill/getAllInvoiceNumbers');
        const data = response.data;

        if (data.error) {
          console.error(data.error);
        } else {
          // Update the state with the fetched data
          setInvoiceNumbers(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredInvoiceNumbers = invoiceNumbers.filter(item => String(item.id).includes(filter));

  //--------------------------Mobile numbers dropdown------------------------------------------
  const [mobileNumbers, setMobileNumbers] = useState([]);
  const [selectedMobile, setSelectedMobile] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/bill/getAllMobileNumbers')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setMobileNumbers(data);
        setFilteredOptions(data);
      })
      .catch(error => {
        console.error('Error fetching mobile numbers:', error);
        setError(error.message);
      });
  }, []);

  const handleMobileSelection = (selectedMobile) => {
    setSelectedMobile(selectedMobile);

    const selectedMobileObject = mobileNumbers.find(item => item.mobile === selectedMobile);
    if (selectedMobileObject) {
      setSelectedCustomerId(selectedMobileObject.id);
      filterData(invoiceId, selectedMobileObject.id);
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

 //----------------------------------------------------------------------------------------------------



//   const [data, setData] = useState([
//     { id: 1, invoiceId: 1, customerId: 101, customerName: 'John Doe', total: 100 },
//     { id: 2, invoiceId: 2, customerId: 102, customerName: 'Jane Smith', total: 200 },
//     { id: 3, invoiceId: 3, customerId: 107, customerName: 'Hana', total: 800 },
//     // Add more data as needed
//   ]);

// const ViewBills = () => {
  const [data, setData] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [invoiceId, setInvoiceId] = useState('');
  const [customerId, setCustomerId] = useState('');
  //const [mobileNumbers, setMobileNumbers] = useState([]);
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
  },[selectedRows]);

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, id]);
      console.log(selectedRows);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleDelete = () => {
   
    axios.post('http://localhost:8000/bill/delete', {
      billIDs: selectedRows
    },{withCredentials: true}).then(response => {
      console.log(response.data);
      alert(response.data);
      window.location.reload(true);
    }).catch(error => {
      console.log(error);
    })
    setSelectedRows([]);
  };



  const filterData = (invoice_id, customer_id) => {
    axios.post('http://localhost:8000/bill/getAllByInvoiceAndMobile', {
      invoice_id,
      customer_id
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

  //must replace--------------------------

  //const options = ['0716589457', '077894521789', '076985423'];

  return (

    <div className="container-fluid" style={{ maxWidth: '800px', marginTop:'20px'}}> 

  {/* //----------------------------------Header----------------------------------------------------------------------------------------// */}
      <div className="row align-items-center mb-5">
        <div className="col-md-auto mb-3 mb-md-0">
          <img src={companyLogo} alt="Company Logo" style={{ width: '100px' }} />
        </div>
        <div className="col-md">
          <h2>Dirty 2 Beauty Laundry</h2>
        </div>
      </div>


    {/**--------------------------------- Invoice Drop down---------------------------------------------------------------------------------- */}
    <div className="mb-3" style={{ marginBottom: '200px' }}>
      <div className='row gx-2'>
        <div className="col-md-6">
          <div className='row gx-2'>
            <div className="col-md-6">
              <p>Select Invoice ID :</p>
            </div>
            <div className="col-md-6">

            
      {/* <Form.Group controlId="formInvoice"> */}
        
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {selectedInvoice || 'Select Invoice'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Form.Control
              type="text"
              placeholder="Filter by Invoice Number"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            {filteredInvoiceNumbers.map(item => (
              <Dropdown.Item
                key={item.id}
                onClick={() => {
                  setSelectedInvoice(item.id);
                  filterData(item.id, selectedCustomerId);
                }}
              >
                {item.id}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      {/* </Form.Group> */}

      {/* {selectedInvoice && (
        <div>
          <p>Selected Invoice ID: {selectedInvoice}</p>
        </div>
      )} */}

            </div>
          </div> 
        </div>
        <div className="col-md-6">
          <div className='row gx-2'>
            <div className="col-md-6">
               <p>Select Phone Number :</p>
            </div>
            <div className="col-md-6">

            <div>
        {error && <p>Error: {error}</p>}
        <Dropdown >
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
              <Dropdown.Item key={index} onClick={() => handleOptionSelect(number)}>
                {number.mobile}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {/* {selectedCustomerId && (
        <div style={{ marginTop: '10px' }}>
          <p>Selected Customer ID: {selectedCustomerId}</p>
        </div>
      )} */}

             </div>
          </div> 
        </div>
  </div>
</div>
    {/**-----------------------------View Bills---------------------------------------------------------------------------------------- */}
      
      <div style={{ marginTop:'50px'}} >

        <h5 className=" mb-4">View Bills</h5>
        <div className="col-sm justify-content-end d-flex " style={{ bottom: '20px', right: '20px' }}>
     
           <Button onClick={handleDelete} style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginBottom: '10px', cursor: 'pointer' }} block>
              Delete
           </Button>
        </div>
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
                        onChange={e => handleCheckboxChange(e, item.invoice_id)}
                        checked={selectedRows.includes(item.invoice_id)}
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