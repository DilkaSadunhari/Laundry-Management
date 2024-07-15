import { useState, useEffect } from "react";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "../../Pages/AddCategory/AddCategory";
import "../../Pages/AddCustomer/AddCustomer";
import "../../Pages/UpdateCategary/UpdateCategary";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { BiSolidAddToQueue } from "react-icons/bi";
import { MdAssignmentAdd } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { FaBars } from "react-icons/fa"; // Icon for toggling sidebar

function Sidebar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            zIndex: '1000'
          }}
        >
          <FaBars />
        </button>
      )}
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: sidebarVisible || !isMobile ? '0' : '-250px',
          width: '250px',
          height: '100%',
          marginRight: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)',
          backgroundColor: 'white',
          overflowY: 'auto',
          paddingTop: '20px',
          transition: 'left 0.3s ease-in-out'
        }}
      >
        <div className="text-center" style={{ marginTop: "50px" }}>
          <h4 style={{ fontStyle: 'italic', fontWeight: 800, marginTop: '20px' }}>
            DIRTY 2 BEAUTY
          </h4>
          <h4 style={{ fontStyle: 'italic', fontWeight: 800, marginTop: '5px' }}>
            LAUNDRY
          </h4>
        </div>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "150px", margin: '0 auto', display: 'block' }}
        />
        <hr className="text-white d-none d-sm-block" />
        <ul className="nav nav-pills flex-column" id="parentMenu" style={{ marginTop: "30px" }}>
          <div className="nav-item my-3">
            <div style={{ marginInlineStart: "20px" }}>
              <h5 className="ms-2 text-dark" style={{ fontStyle: 'italic', fontWeight: 800 }}>Customer</h5>
            </div>
            <div className="nav-item" style={{ margin: '20px', marginBottom: '0px' }}>
              <Link to="/addcustomer" className="nav-link text-dark fs-7" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', paddingLeft: '20px' }}>
                <span style={{ marginRight: '20px', fontSize: '24px' }}><BiSolidAddToQueue /></span>
                <span>Add Customer</span>
              </Link>
            </div>
          </div>
          <div className="nav-item my-5">
            <div style={{ marginInlineStart: "20px" }}>
              <h5 className="ms-2" style={{ fontStyle: 'italic', fontWeight: 800 }}>Category</h5>
            </div>
            <div className="nav-item" style={{ margin: '20px', marginBottom: '0px', marginTop: '30px' }}>
              <Link to="/addcategory" className="nav-link text-dark fs-7" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', paddingLeft: '20px' }}>
                <span style={{ marginRight: '20px', fontSize: '24px' }}><MdAssignmentAdd /></span>
                <span>Add Category</span>
              </Link>
            </div>
            <div className="nav-item" style={{ margin: '20px', marginBottom: '0px', marginTop: '20px' }}>
              <Link to="/UpdateCategary" className="nav-link text-dark fs-7" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', paddingLeft: '20px' }} aria-current="page">
                <span style={{ marginRight: '20px', fontSize: '24px' }}><GrDocumentUpdate /></span>
                <span>Update Category</span>
              </Link>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
