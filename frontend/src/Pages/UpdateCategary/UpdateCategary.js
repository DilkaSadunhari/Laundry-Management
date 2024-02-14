import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form,Alert } from 'react-bootstrap';
import { useFormik } from 'formik'
import { Dropdown, FormControl } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import logo from '../../images/logo.png'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdateCat.css'




function UpdateCategory() {
  //----------------------------------------------------------------------------------------------------
  const validate = (values) => {
    const errors = {};

    // Add your validation logic here
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

   //----------------------------------dropdown menu----------------------------
   const [categories, setCategories] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState({});
   const [filterText, setFilterText] = useState('');
   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    useEffect(() => {
     // Fetch categories from your backend when the component mounts
     fetchCategories();
   }, []);
 
   const fetchCategories = async () => {
     try {
       const response = await fetch('http://localhost:8000/category/getAllNames'); // Update with your backend API endpoint
       const data = await response.json();
       console.log('Fetched categories:', data);
       setCategories(data);
     } catch (error) {
       console.error('Error fetching categories:', error);
     }
   };


 //-----------------------------------------------------------------
   const handleCategorySelect = async (categoryId) => {
     try {
       const response = await fetch(`http://localhost:8000/category/get/${categoryId}`);
       
       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }
   
       const data = await response.json();
       console.log('Category Data:', data);
       setSelectedCategoryId(categoryId);
       setSelectedCategory(data);
       //setPrice(data.price);
       //setCategory(data.name);
       // Update Formik form values with the selected category data
    formik.setValues({
      name: data.name,
      price: data.price,
      type: getTypeValue(data.type),
    });
    console.log('Selected Category ID:', categoryId);
    console.log('Selected Category:', selectedCategory);
    console.log('Formik Values:', formik.values);

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
 //-------------------------------------------------------------------------------------------------------------
 const getTypeValue = (selectedType) => {
  let selectedValue;
  if (selectedType === 0) {
    selectedValue = 'kilo';
  } else if (selectedType === 1) {
    selectedValue = 'pieces';
  } else {
    selectedValue = selectedType;
  }
  return selectedValue;
};



//-------------------------------------------------------------

const handleSubmit = async () => {
  try {
    // Ensure a category is selected
    if (!selectedCategory ) {
      console.error('No category selected');
      return;
    }

    const updatedData = {
      
      name: formik.values.name,
      type: formik.values.type=== "kilo" ? 0 : formik.values.type === "piece" ? 1 : formik.values.type,
      price_per_unit: parseFloat(formik.values.price) || 0,
      id: selectedCategoryId,
    };

    const response = await axios.put(`http://localhost:8000/category/update/${selectedCategoryId}`, updatedData);
    console.log ('updated data: ', updatedData);
    console.log(response.data);
    console.log('Selected Category ID:', selectedCategoryId);
    console.log('Formik Values:', formik.values);

    // Handle any additional logic after successful update
    if (response.status === 200) {
      toast.success('Category updated successfully');
      formik.resetForm();
      
    } else {
      toast.error('Failed');
    }

  } catch (error) {
    console.error('Error updating category:', error);
    toast.error('Error updating category');
  }
};

  //-------------------------------------------------------------------------------------------------------------
       return (

      <div style={{marginTop:'20px'}}>
         {/*/----------------------------------Header----------------------------------------------------------------------------------------/*/}
       <div className="row align-items-center  mb-3" style={{marginLeft:'400px'}}>
       <div className="col-md-auto mb-3 mb-md-0 ">
         <img src={logo} alt="Company Logo" style={{ width: '100px' }} />
       </div>
       <div className="col-md ">
         <h2>Dirty 2 Beauty Laundry</h2>
       </div>
     </div>

     <div style={{ textAlign: 'center', padding: '10px' }}>
           
            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} id="updateCategory" style={{ border: '2px solid #ccc', padding: '50px', borderRadius: '15px',  maxWidth: '800px', margin: 'auto'  }}>
                <h3 style={{ textAlign: 'center' , marginTop: '0px', marginBottom: '60px'}}>Update Category</h3>
                <Form.Group as={Row} style={{ marginBottom: '60px' }} controlId="formHorizontalName">
                    
                    <Col sm={7}>
                       {/* -------------------------------------categoryFilterDropdown-------------------------------------- */}
                        <div style={{alignItems:'center',marginInlineStart:'260px'}}>
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
                              </div>
                        {/* --------------------------------------------------------------------------------------------------------- */}
                    </Col>
                </Form.Group>
                {/* {selectedCategory && (
        <div>
          <h2>Selected Category:</h2>
          <p>ID: {selectedCategory.id}</p>
          <p>Name: {selectedCategory.name}</p>
          <p>Price: {selectedCategory.price}</p>
          <p>type: {selectedCategory.type}</p>
        </div>
      )} */}

                <Row style={{ marginBottom: '20px' }}>
        <Form.Group as={Col} controlId="ucatName">
          <Form.Group as={Row} style={{ marginBottom: '30px' }} controlId="formHorizontalucat">
            <Form.Label column sm={3}>
              Name
            </Form.Label>
            <Col sm={9}>
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
            </Col>
          </Form.Group>
        </Form.Group>

        <Form.Group as={Col} controlId="ucatPrice">
  <Form.Group as={Row} style={{ marginBottom: '30px' }} controlId="formHorizontalucat">
    <Form.Label column sm={3}>
      Price
    </Form.Label>
    <Col sm={9}>
      <Form.Control
        type="number"  // Use type="number" for decimal input
        step="0.01"    // Set the step attribute to allow decimal values
        name="price"
        value={formik.values.price || ''}  // Ensure that an empty string is provided if the value is not defined
        onChange={(e) => {
          formik.handleChange(e);
          // Ensure the value is a number and not a string
          formik.setFieldValue('price', parseFloat(e.target.value) || undefined);
        }}
        onBlur={formik.handleBlur}
        style={{ borderRadius: '15px', backgroundColor: '#d3d3d3' }}
      />
      {formik.touched.price && formik.errors.price && (
        <Alert variant="danger">{formik.errors.price}</Alert>
      )}
    </Col>
  </Form.Group>
</Form.Group>


        <Form.Group as={Col} controlId="ucatType">
          <Form.Group as={Row} style={{ marginBottom: '30px' }} controlId="formHorizontalucat">
            <Form.Label column sm={3}>
              Type
            </Form.Label>
            <Col sm={9}>
              <Form.Select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ borderRadius: '0.375rem', backgroundColor: '#d3d3d3' }}
              >
                <option>kilo / piece</option>
                <option>kilo</option>
                <option>piece</option>
              </Form.Select>
              {formik.touched.type && formik.errors.type && (
                <Alert variant="danger">{formik.errors.type}</Alert>
              )}
            </Col>
          </Form.Group>
        </Form.Group>
      </Row>

                <Row style={{ marginBottom: '0px' }}>
                    <Col style={{ textAlign: 'center' }}>

                        <button 
                        type="submit" 
                        style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', marginLeft: '20px', cursor: 'pointer' }}>
                          Update
                        </button>

                       
                    </Col>
                </Row> 
            </Form>
            <ToastContainer />
            <div className="position-absolute bottom-0 start-0 mb-3 ms-3">
                  <Link to="/" className="btn btn-secondary" style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '', marginLeft: '20px', cursor: 'pointer' }}>Back</Link>
                </div>
        </div>

      </div>
      
      
        
    );
}

export default UpdateCategory;
