import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import './sidemenubar.css';
import '../../Pages/AddCategory/AddCategory';
import '../../Pages/AddCustomer/AddCustomer';
import '../../Pages/UpdateCategary/UpdateCategary';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

function Sidebar() {
  return (
    <div className='container-fluid shadow-xl' style={{ marginTop: '20px' }}>
      <div className='row'>
        <div className='col-4 col-sm-2 bg-white d-flex flex-column justify-content-between min-vh-100 border-end'>

          <div className='mt-2'>

            <div>
              <div style={{ marginInlineStart: '' }}>
                <h4 className='text-center'  style={{ marginInlineStart: '' }}>DIRTY 2 BEAUTY </h4>
                <h4 className='text-center' style={{ marginInlineStart: '' }}>LAUNDRY </h4>
              </div>
              <img src={logo} alt='Logo' className='ms-2' style={{ width: '200px', }} />
            </div>

            <hr className='text-white d-none d-sm-block'></hr>

            <ul className="nav nav-pills flex-column"
              id='parentMenu'
              style={{ marginTop: '10px', marginInlineStart: '30px' }}>

              <li className="nav-item my-3">
                <Link to="#customerSubMenu" className="nav-link text-dark fs-6" data-bs-toggle="collapse" aria-current='page'>
                  <span className='ms-2'>Customer</span>
                  {/*<i className='bi bi-caret-down'></i>*/}
                </Link>
                <ul className="nav collapse ms-1 flex-column" id='customerSubMenu' data-bs-parent="#parentMenu">
                  <li className="nav-item">
                    <Link to="/addcustomer" className="nav-link text-dark px-4 fs-7" aria-current="page">
                      <i className='bi bi-file-plus'></i>Add Customer

              {/*<li className="nav-item mt-5">
                <Link to="#billsSubMenu" 
                      className="nav-link text-dark fs-5" 
                      data-bs-toggle="collapse" 
                      aria-current='page'
                      >
                  
                  <span className='ms-2'>Bills</span>
                  <i className='bi bi-caret-down px-5'></i>
                </Link>
                <ul className="nav collapse ms-1 flex-column li " id='billsSubMenu' data-bs-parent="#parentMenu">
                <li className="nav-item">
                   <Link to="" className="nav-link text-dark px-4 "   aria-current="page">
                     <i className="bi bi-printer"></i> Print Bill
                   </Link>
                </li>

                </ul>
               </li>*/}
                    </Link>
                  </li>
                </ul>
              </li>


              <li className="nav-item mb-5">
                <Link to="#categorySubMenu" className="nav-link text-dark  fs-6" data-bs-toggle="collapse" aria-current='page'>
                  <span className='ms-2'>Category</span>
                  {/*<i className='bi bi-caret-down'></i>*/}
                </Link>
                <ul className="nav collapse ms-1 flex-column" id='categorySubMenu' data-bs-parent="#parentMenu">
                  <li className="nav-item">
                    <Link to="/addcategory" className="nav-link text-dark px-4 fs-7" aria-current="page">
                      <i className='bi bi-file-plus'></i>Add Category

                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/updatecategary" className="nav-link text-dark px-4 fs-7" aria-current="page">
                      <i class="bi bi-pencil-square"></i>Update Category

                    </Link>
                  </li>
                </ul>
              </li>

            </ul>

          </div>

        </div>
        <div className='col-4'>
          
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
