import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "./sidemenubar.css";
import "../../Pages/AddCategory/AddCategory";
import "../../Pages/AddCustomer/AddCustomer";
import "../../Pages/UpdateCategary/UpdateCategary";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { BiSolidAddToQueue } from "react-icons/bi";

function Sidebar() {
  return (
    <div
      className=""
      style={{ marginTop:'10px', width: "15%", marginLeft:"",position:'fixed', marginRight: '10px', 
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)', height: '900px'
       }}
    >
      
        <div>
          <div style={{ marginTop: "10px" }}>
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
          style={{ marginTop: "30px"}}
        >
          <li className="nav-item my-3">
            <div style={{marginInlineStart:"20px"}}>
              <h5 className="ms-2 text-dark">Customer</h5>
            </div>
              <ul className="nav-item">
                <Link
                  to="/addcustomer"
                  className="nav-link text-dark fs-7"
                >
                  <BiSolidAddToQueue />
                  <i className=""></i>Add Customer
                </Link>
              </ul>
          </li>

          <li className="nav-item my-5">
            <div style={{marginInlineStart:"20px"}}>
              <h5 className="ms-2">Category</h5>
            </div>
            <ul className=" ms-1 flex-column">
                <Link
                  to="/addcategory"
                  className="nav-link text-dark fs-7">
                  <i className=""></i>Add Category
                </Link>
                </ul>
              <ul className="nav-item ms-1 flex-column">
                <Link
                  to="/updatecategary"
                  className="nav-link text-dark  fs-7"
                  aria-current="page">
                  <i class=""></i>Update Category
                </Link>
              </ul>
          </li>
        </ul>
      </div>
  
  );
}

export default Sidebar;
