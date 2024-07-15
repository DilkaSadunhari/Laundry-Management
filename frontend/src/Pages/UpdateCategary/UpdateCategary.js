import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Alert, Dropdown, FormControl } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../images/logo.png';
import './UpdateCat.css';

function UpdateCategory() {
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.price) {
      errors.price = 'Price is required';
    }

    if (!values.type || values.type === 'Choose...') {
      errors.type = 'Type is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      type: 'Choose...',
    },
    validate,
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [filterText, setFilterText] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/category/getAllNames');
      const data = await response.json();
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
      setSelectedCategoryId(categoryId);
      setSelectedCategory(data);

      formik.setValues({
        name: data.name,
        price: data.price,
        type: getTypeValue(data.type),
      });

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

  const getTypeValue = (selectedType) => {
    return selectedType === 0 ? 'kilo' : 'piece';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedCategory) {
        console.error('No category selected');
        return;
      }

      const updatedData = {
        name: formik.values.name,
        type: formik.values.type === 'kilo' ? 0 : 1,
        price_per_unit: parseFloat(formik.values.price) || 0,
        id: selectedCategoryId,
      };

      const response = await axios.put(`http://localhost:8000/category/update/${selectedCategoryId}`, updatedData);
      console.log('Updated data:', updatedData);

      if (response.status === 200) {
        toast.success('Category updated successfully');
        formik.resetForm();
      } else {
        toast.error('Failed to update category');
      }

    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Error updating category');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div className="row align-items-center mb-3" style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>
        <div className="col-md-auto mb-3 mb-md-0">
          <img src={logo} alt="Company Logo" style={{ width: '100px' }} />
        </div>
        <div className="col-md">
          <h2 style={{ fontStyle: 'italic', fontWeight: 800 }}>Dirty 2 Beauty Laundry</h2>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '10px' }}>
        <Form onSubmit={handleSubmit} id="updateCategory" style={{ border: '2px solid #ccc', padding: '50px', borderRadius: '15px', maxWidth: '800px', margin: 'auto' }}>
          <h3 style={{ textAlign: 'center', marginTop: '0px', marginBottom: '60px', fontStyle: 'italic' }}>Update Category</h3>
          <Form.Group as={Row} style={{ marginBottom: '60px' }} controlId="formHorizontalName">
            <Col sm={12} md={8} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <Dropdown onSelect={handleCategorySelect}>
                <Dropdown.Toggle className="custom-dropdown-btn" variant="success" id="dropdown-basic">
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
            </Col>
          </Form.Group>

          <Row style={{ marginBottom: '20px' }}>
            <Form.Group as={Col} sm={12} md={4} controlId="ucatName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
              />
              {formik.touched.name && formik.errors.name && (
                <Alert variant="danger">{formik.errors.name}</Alert>
              )}
            </Form.Group>

            <Form.Group as={Col} sm={12} md={4} controlId="ucatPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={formik.values.price}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue('price', parseFloat(e.target.value) || '');
                }}
                onBlur={formik.handleBlur}
                style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
              />
              {formik.touched.price && formik.errors.price && (
                <Alert variant="danger">{formik.errors.price}</Alert>
              )}
            </Form.Group>

            <Form.Group as={Col} sm={12} md={4} controlId="ucatType">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ borderRadius: '0.375rem', backgroundColor: '#d3d3d3' }}
              >
                <option value="Choose...">Choose...</option>
                <option value="kilo">kilo</option>
                <option value="piece">piece</option>
              </Form.Select>
              {formik.touched.type && formik.errors.type && (
                <Alert variant="danger">{formik.errors.type}</Alert>
              )}
            </Form.Group>
          </Row>

          <Row style={{ marginBottom: '0px' }}>
            <Col style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  background: 'black',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '25px',
                  marginTop: '10px',
                  cursor: 'pointer',
                }}
              >
                Update
              </button>
            </Col>
          </Row>
        </Form>
        <ToastContainer />
        <div className="position-absolute bottom-0 start-0 mb-3 ms-3">
          <Link
            to="/"
            className="btn btn-secondary"
            style={{
              background: 'black',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '25px',
              marginTop: '',
              cursor: 'pointer',
            }}
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UpdateCategory;
