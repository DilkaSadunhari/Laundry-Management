import React from 'react';
import { Link } from 'react-router-dom'; 
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png'


const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});


const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      // Handle login logic (e.g., API call, authentication)
      console.log('Login submitted with:', values);
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="mt-5">
      <div className="container mt-5 pb-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="p-5" style={{ backgroundColor: 'lightblue', borderRadius: '15px' }}>
              <h3 className="mb-2 text-center">DIRTY 2 BEAUTY LAUNDRY</h3>

              <div className="text-center mb-2">
                 <img src={logo} alt="Company Logo" style={{ maxWidth: '50%', height: 'auto', textAlign: 'center' }} />
              </div>

                

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder='Username'
                    className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                    style={{ borderRadius: '15px', textAlign: 'center' }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  <div className="invalid-feedback">{formik.errors.username}</div>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Password'
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    style={{ borderRadius: '15px', textAlign: 'center' }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <div className="invalid-feedback">{formik.errors.password}</div>
                </div>
                <div className="mb-3 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary text-dark"
                    style={{ borderRadius: '15px', textAlign: 'center', width: '100px' }}
                  >
                    Login
                  </button>
                </div>
                <div className="position-absolute bottom-0 start-0 mb-3 ms-3">

                  <Link to="/" className="btn btn-secondary" style={{ background: 'black', color: 'white', border: 'none', padding: '10px', paddingInline: '30px', borderRadius: '25px', marginTop: '10px', marginLeft: '20px', cursor: 'pointer' }}>Back</Link>

                 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
