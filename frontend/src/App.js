import React from 'react';
//import BootstrapSelectpicker from './Components/BootstrapSelectpicker'; // Adjust the path based on your project structure
import {
  createBrowserRouter,
  RouterProvider,
  Outlet

} from "react-router-dom";

import './App.css';
import AddCustomer from './Pages/AddCustomer/AddCustomer';
import AddCategory from './Pages/AddCategory/AddCategory';
import UpdateCategary from './Pages/UpdateCategary/UpdateCategary';


import ViewBills from './Pages/viewBills';
import Sidebar from "./Components/SideBar/SideBar";
import Invoice from './Pages/Invoice'
import Login from './Pages/LogIn';
import InvoicePage from './Pages/InvoicePage';

import Home from './Pages/home';
import Invoicedrop from './Pages/invoicedrop';
 import Test from './Pages/test';

import RequireToken from './Auth';


 const boxStyle = {
  width: '50%',
  display: 'inline-block',      
  boxSizing: 'border-box',
  border: '1px solid #000',
  padding: '20px'
};
const App = () => {
  const Layout = ({ children }) => {
    return (
      
     <div className="container-fluid">
     <div className="row">
       <div style={{ width:"30%",alignContent:'center' }}>
             <Sidebar /> 
       </div>
          <div style={{ width: "70%" }}>
             <Outlet />
    </div>
     </div>
   </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",

      element: <Layout />,
      children: [
        // {
        //   path: "/",
        //   element: <Home />
        // },
        {
          path: "/",
          element: <Invoice />
        },
        
      ]},
      {
        path: "/addcustomer",
        element: <AddCustomer />
      },
      {
        path: "/addcategory",
        element: <AddCategory />
      },
      {
        path: "/updatecategary",
        element: <UpdateCategary />
      },
      {
        path: "/viewBills",
        element: <RequireToken><ViewBills /></RequireToken>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/invoicepage",
        element: <RequireToken><InvoicePage /></RequireToken>
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/invoicedrop",
        element: <Invoicedrop />
      },
      {
        path: "/test",
        element: <Test />
      },
             
  ]);

  return (
    <RouterProvider router={router} />
  );
};



export default App;
