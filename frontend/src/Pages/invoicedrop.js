import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Dropdown } from 'react-bootstrap';

const YourComponent = () => {
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


  return (
    <div>
      <Form.Group controlId="formInvoice">
        <Form.Label>Select Invoice Number:</Form.Label>
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
                onClick={() => setSelectedInvoice(item.id)}
              >
                {item.id}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
    </div>
  );
};

export default YourComponent;
