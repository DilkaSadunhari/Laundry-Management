import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "./sidemenubar.css";
import "../../Pages/AddCategory/AddCategory";
import "../../Pages/AddCustomer/AddCustomer";
import "../../Pages/UpdateCategary/UpdateCategary";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

function Sidebar() {
  return (
    <div
      className=""
      style={{ marginTop:'10px', width: "15%", marginLeft:"",position:'fixed', marginRight: '10px', 
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)', height: '700px'
       }}
    >
      
        <div>
          <div style={{ marginInlineStart: "" }}>
            <h4 className="text-center" style={{ marginTop: "20px" }}>
              DIRTY 2 BEAUTY{" "}
            </h4>
            <h4 className="text-center" style={{ marginInlineStart: "" }}>
              LAUNDRY{" "}
            </h4>
          </div>
          <img
            src={logo}
            alt="Logo"
            className=" ms-auto me-auto d-block"
            style={{ width: "150px" }}
          />
        </div>

        <hr className="text-white d-none d-sm-block"></hr>

        <ul
          className="nav nav-pills flex-column"
          id="parentMenu"
          style={{ marginTop: "30px", marginInlineStart: "20px" }}
        >
          <li className="nav-item my-3">
            <Link
              to="#customerSubMenu"
              className="nav-link text-dark "
              data-bs-toggle="collapse"
              aria-current="page"
            >
              <h5 className="ms-2">Customer</h5>
              {/*<i className='bi bi-caret-down'></i>*/}
            </Link>
            <ul
              className="nav collapse ms-1 flex-column"
              id="customerSubMenu"
              data-bs-parent="#parentMenu"
            >
              <li className="nav-item">
                <Link
                  to="/addcustomer"
                  className="nav-link text-dark px-4 fs-7"
                  aria-current="page"
                >
                  <i className="bi bi-file-plus"></i>Add Customer
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
            <Link
              to="#categorySubMenu"
              className="nav-link text-dark  "
              data-bs-toggle="collapse"
              aria-current="page"
            >
              <h5 className="ms-2">Category</h5>
              {/*<i className='bi bi-caret-down'></i>*/}
            </Link>
            <ul
              className="nav collapse ms-1 flex-column"
              id="categorySubMenu"
              data-bs-parent="#parentMenu"
            >
              <li className="nav-item">
                <Link
                  to="/addcategory"
                  className="nav-link text-dark px-4 fs-7"
                  aria-current="page"
                >
                  <i className="bi bi-file-plus"></i>Add Category
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/updatecategary"
                  className="nav-link text-dark px-4 fs-7"
                  aria-current="page"
                >
                  <i class="bi bi-pencil-square"></i>Update Category
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  
  );
}

export default Sidebar;
