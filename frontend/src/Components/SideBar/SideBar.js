import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "./sidemenubar.css";
import "../../Pages/AddCategory/AddCategory";
import "../../Pages/AddCustomer/AddCustomer";
import "../../Pages/UpdateCategary/UpdateCategary";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { BiSolidAddToQueue } from "react-icons/bi";
import { MdAssignmentAdd } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

function Sidebar() {
  return (
    <div
      className=""
      style={{  width: "17%", marginLeft:"",position:'fixed', marginRight: '10px', 
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)', height: '900px'
       }}
    >
      
        <div>
          <div style={{ marginTop: "50px" }}>
            <h4 className="text-center" style={{ fontStyle: 'italic', fontWeight: 800 , marginTop: '20px'}}>
              DIRTY 2 BEAUTY{" "}
            </h4>
            <h4 className="text-center" style={{ marginInlineStart: "" , fontStyle: 'italic', fontWeight: 800 , marginTop: '5px'}}>
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
          <div className="nav-item my-3">
            <div style={{marginInlineStart:"20px"}}>
              <h5 className="ms-2 text-dark" style={{ fontStyle: 'italic', fontWeight: 800 }}>Customer</h5>
            </div>
              <div className="nav-item" style={{margin: '20px', marginBottom: '0px'}}>
                <Link
                  to="/addcustomer"
                  className="nav-link text-dark fs-7"
                >
                  <span style={{ marginRight: '20px' }}><BiSolidAddToQueue style={{ fontSize: '24px' }}/></span>
                  <span style={{ fontWeight: 'bold' }}>Add Customer</span>
                </Link>
              </div>
          </div>

          <div className="nav-item my-5" >
            <div style={{marginInlineStart:"20px"}}>
              <h5 className="ms-2" style={{ fontStyle: 'italic', fontWeight: 800 }}>Category</h5>
            </div>
            <div className=" nav-item" style={{ margin: '20px', marginBottom: '0px',marginTop: '30px' }}>
                <Link
                  to="/addcategory"
                  className="nav-link text-dark fs-7">
                    
                  <span style={{ marginRight: '20px' }}><MdAssignmentAdd style={{ fontSize: '24px' }}/></span>
                  <span style={{ fontWeight: 'bold' }}>Add Category</span>
                  
                </Link>
                </div>
              <div className="nav-item" style={{margin: '20px', marginBottom: '0px',marginTop: '20px' }}>
                <Link
                  to="/updatecategary"
                  className="nav-link text-dark  fs-7"
                  aria-current="page">
                  <span style={{ marginRight: '20px' }}><GrDocumentUpdate style={{ fontSize: '24px' }}/></span>
                  <span style={{ fontWeight: 'bold' }}>Update Category</span>
                </Link>
              </div>
          </div>
        </ul>
      </div>
  
  );
}

export default Sidebar;
