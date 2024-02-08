import React from 'react';
//import BootstrapSelectpicker from './Components/BootstrapSelectpicker'; // Adjust the path based on your project structure
import {
  createBrowserRouter,
  RouterProvider,
  
 
} from "react-router-dom";

import './App.css';
import AddCustomer from './Pages/AddCustomer/AddCustomer';
import AddCategory from './Pages/AddCategory/AddCategory';
import UpdateCategary from './Pages/UpdateCategary/UpdateCategary';

import ViewBills from './Pages/viewBills';
import Sidebar from "./Components/SideBar/SideBar";
import Invoice from './Pages/Invoice'
import Login from './Pages/LogIn';

import Home from './Pages/home';

// import Notification from './pages/common/Notification';
// import Sidebar from "./Components/Sidebar";


/*const Layout = () => {
   return (
     <div className="main">
       <div className="menu">
         <Sidebar />
       </div>
       <div className="container">
         <Outlet />
       </div>
     </div>
   );
 };*/

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sidebar />
    },
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
      element: <ViewBills />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/invoice",
      element: <Invoice />
    },
      {
      path: "/home",
      element: <Home />
    },
    

    
     /*{
      path: "/",
       element: <Layout />,
       children: [
         {
           path: "AddCustomer",
           element: <AddCustomer />
         },
         {
           path: "AddCategary",
           element: <AddCategory />
         },
         {
           path: "UpdateCategary",
           element: <UpdateCategary />
         },
       ]
     },
     */
    
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
